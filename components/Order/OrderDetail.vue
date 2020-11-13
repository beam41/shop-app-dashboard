<template>
  <div>
    <v-card>
      <v-card-title>ข้อมูลคำสั่งซื้อ</v-card-title>

      <v-card-subtitle>รายการสินค้า</v-card-subtitle>
      <v-card-subtitle>ข้อมูลที่อยู่</v-card-subtitle>

      <template v-if="order.proofOfPaymentFullImage">
        <v-card-subtitle>หลักฐานการชำระเงิน</v-card-subtitle>
      </template>
      <template v-if="order.trackingNumber">
        <v-card-subtitle>เลขติดตามพัสดุ</v-card-subtitle>
      </template>
      <template v-if="order.receivedMessage">
        <v-card-subtitle>ข้อความจากผู้ซื้อ</v-card-subtitle>
      </template>
      <template v-if="isCancelled">
        <v-card-subtitle>ถูกยกเลิกแล้ว</v-card-subtitle>
      </template>
    </v-card>
  </div>
</template>

<script>
import OrderState from '@/constants/order-state'
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
      return this.order?.orderStates.some(
        (e) => e.state === OrderState.CANCELLED
      )
    },
  },
}
</script>

<style lang="scss" scoped></style>
