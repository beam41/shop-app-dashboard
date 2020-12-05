<template>
  <v-container class="container-height d-flex flex-column">
    <v-row
      no-gutters
      class="d-flex justify-space-between align-center flex-grow-0"
    >
      <h1>จัดการคำสั่งซื้อ</h1>
    </v-row>
    <v-row
      no-gutters
      :class="['d-flex justify-center pt-16', data ? null : 'align-center']"
    >
      <OrderForm
        v-if="data"
        :saving="saving"
        :order="data"
        @cancel="cancelOrder"
        @submit="submit"
      />
      <v-progress-circular v-else indeterminate color="primary" />
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
import {
  getOrderById,
  cancelOrder,
  approveProofOrder,
  sentOrder,
} from '@/api/order'
import OrderState from '@/constants/order-state'

const submitFunctionMap = {
  SENT: sentOrder,
  APPROVED_PROOF_OF_PAYMENT_FULL: approveProofOrder,
}

export default {
  data: () => ({
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
      getOrderById(this.currId)
        .then((res) => {
          this.data = res.data
        })
        .catch((err) => {
          if (err) this.error = true
        })
    },
    cancelOrder(data) {
      this.saving = true
      cancelOrder(this.currId, data)
        .then((res) => {
          this.$router.push(`/order/state/${OrderState.CANCELLED}`)
          this.saving = false
        })
        .catch((err) => {
          if (err) this.error = true
          this.saving = false
        })
    },
    submit(event) {
      this.saving = true
      submitFunctionMap[event.state](this.currId, event.data)
        .then((res) => {
          this.$router.push(`/order/state/${event.state}`)
          this.saving = false
        })
        .catch((err) => {
          if (err) this.error = true
          this.saving = false
        })
    },
  },
  head: (vm) => ({
    title: `จัดการคำสั่งซื้อ ${vm.currId}`,
  }),
}
</script>

<style></style>
