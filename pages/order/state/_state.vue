<template>
  <v-container>
    <v-row no-gutters class="d-flex justify-space-between align-center">
      <h1>ดูรายการการสั่งซื้อ: {{ stateName }}</h1>
    </v-row>
    <v-row no-gutters><OrderList :loading="loading" :items="items" /></v-row>
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
import { getOrderListByState } from '@/api/order'
import OrderStateName from '@/constants/order-state-name'
import OrderState from '@/constants/order-state'

export default {
  data: () => ({
    items: [],
    loading: false,
    error: false,
  }),
  computed: {
    currState() {
      return this.$route.params.state
    },
    stateName() {
      return OrderStateName[this.currState]
    },
  },
  mounted() {
    if (this.stateName === null) {
      this.$router.push(`/order/${OrderState.CREATED}`)
    }

    this.loading = true
    getOrderListByState(this.currState)
      .then((res) => {
        this.items = res.data
        this.loading = false
      })
      .catch((err) => {
        if (err) this.error = true
        this.loading = false
      })
  },
}
</script>
