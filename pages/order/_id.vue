<template>
  <v-container class="container-height d-flex flex-column">
    <v-row
      no-gutters
      class="d-flex justify-space-between align-center flex-grow-0"
    >
      <h1>จัดการคำสั่งซื้อ</h1>
    </v-row>
    <v-row no-gutters class="d-flex justify-center pt-16">
      <OrderForm
        :loading="loading"
        :saving="saving"
        :order="data"
        @cancel="cancelOrder"
      />
    </v-row>
    <v-snackbar v-model="error">
      เกิดปัญหาขึ้น
      <template #action="{ attrs }">
        <v-btn color="secondary" text v-bind="attrs" @click="error = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { getOrderById, cancelOrder } from '@/api/order'
import OrderState from '@/constants/order-state'

export default {
  data: () => ({
    loading: false,
    saving: false,
    error: false,
    data: null,
  }),
  computed: {
    currId() {
      return this.$route.params.id
    },
  },
  mounted() {
    this.getOrder()
  },
  methods: {
    getOrder() {
      this.loading = true
      getOrderById(this.currId)
        .then((res) => {
          this.data = res.data
          this.loading = false
        })
        .catch((err) => {
          if (err) this.error = true
          this.loading = false
        })
    },
    cancelOrder(data) {
      cancelOrder(this.currId, data)
        .then((res) => {
          this.$router.push(`/order/state/${OrderState.CANCELLED}`)
          this.loading = false
        })
        .catch((err) => {
          if (err) this.error = true
          this.loading = false
        })
    },
  },
}
</script>

<style></style>
