<template>
  <v-container class="container-height d-flex flex-column">
    <v-row
      no-gutters
      class="d-flex justify-space-between align-center flex-grow-0"
    >
      <h1>จัดการคำสั่งทำ</h1>
    </v-row>
    <v-row
      no-gutters
      :class="['d-flex justify-center pt-16', data ? null : 'align-center']"
    >
      <BuildOrderForm
        v-if="data"
        :saving="saving"
        :order="data"
        @cancel="cancelBuildOrder"
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
  getBuildOrderById,
  cancelBuildOrder,
  ableToBuild,
  approveProofDeposit,
  builtComplete,
  approveProofFull,
  sent,
} from '@/api/build-order'
import OrderState from '@/constants/order-state'

const submitFunctionMap = {
  IS_ABLE_TO_BUILT: ableToBuild,
  APPROVED_PROOF_OF_PAYMENT_DEPOSIT: approveProofDeposit,
  BUILT_COMPLETE: builtComplete,
  APPROVED_PROOF_OF_PAYMENT_FULL: approveProofFull,
  SENT: sent,
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
    this.getBuildOrder()
  },
  methods: {
    getBuildOrder() {
      this.loading = true
      getBuildOrderById(this.currId)
        .then((res) => {
          this.data = res.data
        })
        .catch((err) => {
          if (err) this.error = true
        })
    },
    cancelBuildOrder(e) {
      this.saving = true
      cancelBuildOrder(this.currId, e.data)
        .then((res) => {
          this.$router.push(
            `/build-order/state/${
              e.isUnable ? OrderState.IS_UNABLE_TO_BUILT : OrderState.CANCELLED
            }`
          )
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
          this.$router.push(`/build-order/state/${event.state}`)
          this.saving = false
        })
        .catch((err) => {
          if (err) this.error = true
          this.saving = false
        })
    },
  },
  head: (vm) => ({
    title: `จัดการคำสั่งทำที่ ${vm.currId}`,
  }),
}
</script>

<style></style>
