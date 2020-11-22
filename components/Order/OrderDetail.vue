<template>
  <div>
    <v-card>
      <v-card-title>ข้อมูลคำสั่งซื้อ</v-card-title>
      <v-divider />
      <v-card-subtitle>รายการสินค้า</v-card-subtitle>
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr v-for="item in order.products" :key="item.id">
              <td class="text-left">{{ item.name }}</td>
              <td v-if="item.newPrice" class="text-left">
                <span class="red--text text-decoration-line-through">{{
                  item.price
                }}</span>
                {{ item.newPrice }} บาท
              </td>
              <td v-else class="text-left">{{ item.price }} บาท</td>
              <td class="text-left">× {{ item.amount }}</td>
              <td class="text-right">
                {{ nullish(item.newPrice, item.price) * item.amount }}
                บาท
              </td>
            </tr>
            <tr>
              <td colspan="3" class="text-left">
                วิธีการจัดส่ง: {{ order.distributionMethod.name }}
              </td>
              <td class="text-right">
                {{ order.distributionMethod.price }}
                บาท
              </td>
            </tr>
            <tr>
              <td colspan="3" class="text-left">รวม</td>
              <td class="text-right">{{ summation }} บาท</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <v-divider />
      <v-card-subtitle>ข้อมูลที่อยู่</v-card-subtitle>
      <v-card-text class="text--primary">
        {{ order.fullName }}
          <br />
        {{ order.address }}
        <br />
        {{ subDistTxt }} {{ order.subDistrict }} {{ distTxt }}
        {{ order.district }}
        <br />
        จังหวัด {{ order.province }}
        <br />
        {{ order.postalCode }}
        <br />
        เบอร์ติดต่อ: {{ order.phoneNumber }}
      </v-card-text>

      <v-divider />
      <v-card-subtitle>ข้อมูลวิธีการจัดส่ง</v-card-subtitle>
      <v-card-text class="text--primary">
        วิธีการชำระเงิน: {{ purchaseMethod }}
        <br />
        จัดส่งทาง: {{ order.distributionMethod.name }}
        <br />
        ราคาค่าจัดส่ง: {{ order.distributionMethod.price }}
      </v-card-text>

      <template v-if="order.proofOfPaymentFullImage">
        <v-divider />
        <v-card-subtitle>หลักฐานการชำระเงิน</v-card-subtitle>
        <a
          class="d-block pa-4 pt-0"
          :href="order.proofOfPaymentFullImage"
          target="_blank"
        >
          <v-img height="500px" contain :src="order.proofOfPaymentFullImage" />
        </a>
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
      <template v-if="isCancelled">
        <v-divider />
        <v-card-subtitle>ถูกยกเลิกแล้ว</v-card-subtitle>
        <v-card-text class="text--primary">
          ยกเลิกโดยแอดมิน: {{ order.cancelledByAdmin ? 'ใช่' : 'ไม่' }}
          <br />
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

const purchaseMethodTxt = {
  BANK: 'ชำระผ่านทางธนาคาร',
  ON_DELIVERY: 'ชำระเงินปลายทาง',
}
export default {
  props: {
    loading: Boolean,
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
    summation() {
      return (
        this.order.products.reduce(
          (prev, curr) => prev + (curr.newPrice ?? curr.price) * curr.amount,
          0
        ) + this.order.distributionMethod.price
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
    purchaseMethod() {
      return purchaseMethodTxt[this.order.purchaseMethod]
    },
  },
  methods: {
    nullish,
  },
}
</script>

<style lang="scss" scoped></style>
