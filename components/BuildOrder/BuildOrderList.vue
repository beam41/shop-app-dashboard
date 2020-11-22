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
      <template #[`item.createdByUser`]="{ item }">
        {{ item.createdByUser.username }} ({{ item.createdByUser.fullName }})
      </template>
      <template #[`item.createdDate`]="{ item }">
        {{ dayjs(item.createdDate).format('D MMM BB H:mm') }}
      </template>
      <template #[`item.updatedDate`]="{ item }">
        {{ dayjs(item.updatedDate).format('D MMM BB H:mm') }}
      </template>
      <template #[`item.expectedCompleteDate`]="{ item }">
        {{
          item.expectedCompleteDate
            ? dayjs(item.expectedCompleteDate).format('D MMM BB')
            : '-'
        }}
      </template>
      <template #[`item.orderDescription`]="{ item }">
        <div :style="{ maxWidth: `${headWidth}vw` }" class="eliip">
          {{ item.orderDescription }}
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import dayjs from 'dayjs'

export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    loading: Boolean,
  },
  computed: {
    head() {
      return [
        { text: 'ID', value: 'id' },
        { text: 'สร้างโดย', value: 'createdByUser' },
        { text: 'ชื่อ', value: 'fullName' },
        { text: 'คำอธิบายแบบย่อ', value: 'orderDescription' },
        { text: 'วันที่คาดว่าจะแล้วเสร็จ', value: 'expectedCompleteDate' },
        { text: 'วันที่สร้าง', value: 'createdDate' },
        { text: 'วันที่อัพเดทล่าสุด', value: 'updatedDate' },
      ]
    },
    headWidth() {
      return (1 / this.head.length) * 100
    },
    headers() {
      return this.head.map((v) => ({ ...v, width: `${this.headWidth}%` }))
    },
    purchaseMethodTxt: () => ({
      BANK: 'ธนาคาร',
      ON_DELIVERY: 'ปลายทาง',
    }),
  },
  methods: {
    rowClick(item) {
      this.$router.push(`/build-order/${item.id}`)
    },
    dayjs,
  },
}
</script>

<style lang="scss" scoped>
.eliip {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
