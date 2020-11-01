<template>
  <v-card width="100%" class="mt-3">
    <v-data-table
      calculate-widths
      :headers="headers"
      :items="items"
      :loading="loading"
      :items-per-page="15"
      height="calc(100vh - 143px)"
      @click:row="rowClick"
    >
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    loading: Boolean,
  },
  computed: {
    headers() {
      const head = [
        { text: 'ID', value: 'id' },
        { text: 'ชื่อผู้ใช้งาน', value: 'username' },
        { text: 'ชื่อนามสกุล', value: 'fullName' },
        { text: 'เบอร์โทรศัพท์', value: 'phoneNumber' },
        { text: 'รายการสั่งซื้อที่ยังไม่สำเร็จ', value: 'activeOrders' },
      ]
      return head.map((v) => ({ ...v, width: `${(1 / head.length) * 100}%` }))
    },
  },
  methods: {
    rowClick(item) {
      this.$router.push(`/user/${item.id}`)
    },
  },
}
</script>
