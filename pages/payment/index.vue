<template>
  <v-container class="container-height d-flex flex-column">
    <v-row
      no-gutters
      class="d-flex justify-space-between align-center flex-grow-0"
    >
      <h1>จัดการช่องทางการชำระเงิน</h1>
    </v-row>
    <v-row no-gutters class="d-flex justify-center align-center pt-16">
      <PaymentForm
        v-if="!loading"
        :saving="saving"
        :value="data"
        @submit="submit"
        @add="addMethod"
        @delete="deleteMethod"
      />
      <v-progress-circular v-else indeterminate color="primary" />
    </v-row>
    <v-snackbar v-model="success" light>
      บันทึกสำเร็จ
      <template #action="{ attrs }">
        <v-btn color="accent" text v-bind="attrs" @click="success = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
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
import { getPaymentMethod, editPaymentMethod } from '@/api/payment'
export default {
  data: () => ({
    loading: false,
    saving: false,
    error: false,
    success: false,
    data: null,
  }),
  mounted() {
    this.getPaymentMethod()
  },
  methods: {
    getPaymentMethod() {
      this.loading = true
      getPaymentMethod()
        .then((res) => {
          this.data = res.data
          this.loading = false
        })
        .catch((err) => {
          if (err) this.error = true
          this.loading = false
        })
    },
    submit() {
      this.saving = true
      const data = this.data.map((d) => ({ ...d, id: undefined }))
      editPaymentMethod(data)
        .then((res) => {
          this.success = true
          this.saving = false
        })
        .catch((err) => {
          if (err) this.error = true
          this.saving = false
        })
    },
    addMethod() {
      this.data.push({
        bank: '',
        accountNumber: '',
        accountName: '',
      })
    },
    deleteMethod(i) {
      this.data = this.data.filter((_, index) => index !== i)
    },
  },
  head: () => ({
    title: 'จัดการช่องทางการชำระเงิน',
  }),
}
</script>

<style></style>
