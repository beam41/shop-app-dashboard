<template>
  <div>
    <v-card>
      <v-card-title>ข้อมูลคำสั่งทำ {{ order.id }}</v-card-title>
      <v-divider />
      <v-card-subtitle>ข้อมูลจากฟอร์มสั่งทำ</v-card-subtitle>
      <v-card-text class="text--primary">
        ชื่อ-นามสกุล: {{ order.fullName }}
        <br />
        เบอร์ติดต่อ: {{ order.phoneNumber }}
        <br />
        คำอธิบาย: <span class="pre-wrap">{{ order.orderDescription }}</span>
        <br />
        <v-row class="img-row flex flex-nowrap">
          <v-col
            v-for="img in order.descriptionImagesUrl"
            :key="img.id"
            cols="3"
          >
            <v-card class="mx-auto" max-width="300">
              <a :href="img.imageUrl" target="_blank">
                <v-img
                  aspect-ratio="1"
                  :src="img.imageUrl"
                  :alt="img.imageUrl"
                />
              </a>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <template v-if="order.fullPrice">
        <v-divider />
        <v-card-subtitle>ราคาที่ประเมิน</v-card-subtitle>
        <v-card-text class="text--primary">
          ราคาที่ประเมินได้: {{ order.fullPrice }} บาท
          <br />
          ราคามัดจำ: {{ order.depositPrice }} บาท
        </v-card-text>
      </template>
      <template v-if="order.proofOfPaymentDepositImage">
        <v-divider />
        <v-card-subtitle>หลักฐานการชำระเงิน (มัดจำ)</v-card-subtitle>
        <v-card-text class="text--primary">
          ราคามัดจำ: {{ order.depositPrice }} บาท
        </v-card-text>
        <a
          class="d-block pa-4 pt-0"
          :href="order.proofOfPaymentDepositImage"
          target="_blank"
        >
          <v-img
            height="500px"
            contain
            :src="order.proofOfPaymentDepositImage"
          />
        </a>
      </template>
      <template v-if="order.expectedCompleteDate && !isBuiltComplete">
        <v-divider />
        <v-card-subtitle>รอการผลิต</v-card-subtitle>
        <v-card-text class="text--primary">
          วันที่คาดว่าจะแล้วเสร็จ:
          {{ dayjs(order.expectedCompleteDate).format('D MMMM BBBB') }}
        </v-card-text>
      </template>
      <template v-if="order.proofOfPaymentFullImage">
        <v-divider />
        <v-card-subtitle>ราคารวม</v-card-subtitle>
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr>
                <td class="text-left">ราคาที่ประเมินได้</td>
                <td class="text-right">
                  {{ order.fullPrice }}
                  บาท
                </td>
              </tr>
              <tr>
                <td class="text-left">หักค่ามัดจำ</td>
                <td class="text-right">
                  -{{ order.depositPrice }}
                  บาท
                </td>
              </tr>
              <tr>
                <td class="text-left">
                  วิธีการจัดส่ง: {{ order.distributionMethod.name }}
                </td>
                <td class="text-right">
                  {{ order.distributionMethod.price }}
                  บาท
                </td>
              </tr>
              <tr>
                <td class="text-left">รวม</td>
                <td class="text-right">{{ summation }} บาท</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-divider />
        <v-card-subtitle>หลักฐานการชำระเงิน</v-card-subtitle>
        <a
          class="d-block pa-4 pt-0"
          :href="order.proofOfPaymentFullImage"
          target="_blank"
        >
          <v-img height="500px" contain :src="order.proofOfPaymentFullImage" />
        </a>
        <v-divider />
        <v-card-subtitle>ข้อมูลที่อยู่</v-card-subtitle>
        <v-card-text class="text--primary">
          {{ order.addressFullName }}
          <br />
          <span class="pre-wrap">{{ order.address }}</span>
          <br />
          {{ subDistTxt }} {{ order.subDistrict }} {{ distTxt }}
          {{ order.district }}
          <br />
          จังหวัด {{ order.province }}
          <br />
          {{ order.postalCode }}
          <br />
          เบอร์ติดต่อ: {{ order.addressPhoneNumber }}
        </v-card-text>
        <v-divider />
        <v-card-subtitle>ข้อมูลวิธีการจัดส่ง</v-card-subtitle>
        <v-card-text class="text--primary">
          จัดส่งทาง: {{ order.distributionMethod.name }}
          <br />
          ราคาค่าจัดส่ง: {{ order.distributionMethod.price }}
        </v-card-text>
      </template>
      <template v-if="order.trackingNumber">
        <v-divider />
        <v-card-subtitle>เลขติดตามพัสดุ</v-card-subtitle>
        <v-card-text class="text--primary">
          จัดส่งทาง: {{ order.distributionMethod.name }}
          <br />
          เลขติดตามพัสดุ: {{ order.trackingNumber }}
        </v-card-text>
      </template>
      <template v-if="order.receivedMessage">
        <v-divider />
        <v-card-subtitle>ข้อความจากผู้ซื้อ</v-card-subtitle>
        <v-card-text class="text--primary">
          {{ order.receivedMessage }}
        </v-card-text>
      </template>
      <template v-if="isCancelled || isUnableToBuilt">
        <v-divider />
        <v-card-subtitle>
          {{ isCancelled ? 'ถูกยกเลิกแล้ว' : 'ไม่สามารถทำได้' }}
        </v-card-subtitle>
        <v-card-text class="text--primary">
          <template v-if="isCancelled">
            ยกเลิกโดยแอดมิน: {{ order.cancelledByAdmin ? 'ใช่' : 'ไม่' }}
            <br />
          </template>
          <template v-if="order.cancelledReason">
            เหตุผล: {{ order.cancelledReason }}
          </template>
        </v-card-text>
      </template>
    </v-card>
  </div>
</template>

<script>
import OrderState from '@/constants/order-state'
import { nullish } from '@/utils/nullish'
import dayjs from 'dayjs'

export default {
  props: {
    order: {
      type: Object,
      default: null,
    },
  },
  computed: {
    isCancelled() {
      return this.order.orderStates.some(
        (e) => e.state === OrderState.CANCELLED
      )
    },
    isUnableToBuilt() {
      return this.order.orderStates.some(
        (e) => e.state === OrderState.IS_UNABLE_TO_BUILT
      )
    },
    isBuiltComplete() {
      return this.order.orderStates.some(
        (e) => e.state === OrderState.BUILT_COMPLETE
      )
    },
    summation() {
      return (
        this.order.fullPrice -
        this.order.depositPrice +
        this.order.distributionMethod.price
      )
    },
    isBangkok() {
      return this.order.province === 'กรุงเทพมหานคร'
    },
    subDistTxt() {
      return this.isBangkok ? 'แขวง' : 'ตำบล'
    },
    distTxt() {
      return this.isBangkok ? 'เขต' : 'อำเภอ'
    },
  },
  methods: {
    nullish,
    dayjs,
  },
}
</script>

<style lang="scss" scoped>
.img-row {
  overflow: auto;

  &::-webkit-scrollbar {
    height: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #eeeeee;
  }

  &::-webkit-scrollbar-thumb {
    background: #bdbdbd;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #757575;
  }
}
</style>
