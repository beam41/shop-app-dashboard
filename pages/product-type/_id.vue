<template>
  <v-container class="container-height d-flex flex-column">
    <v-row
      no-gutters
      class="d-flex justify-space-between align-center flex-grow-0"
    >
      <h1>แก้ไขประเภทสินค้า</h1>
    </v-row>
    <v-row no-gutters class="d-flex justify-center align-center pt-16">
      <TypeForm
        :loading="loading"
        :saving="saving"
        edit-mode
        :initial-value="data"
        @submit="submit"
        @archive="archive"
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
import { getTypeById, editType, archiveType } from '@/api/type'
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
    this.getProductType()
  },
  methods: {
    getProductType() {
      this.loading = true
      getTypeById(this.currId)
        .then((res) => {
          this.data = res.data
          this.loading = false
        })
        .catch((err) => {
          if (err) this.error = true
          this.loading = false
        })
    },
    submit(data) {
      this.saving = true
      editType(this.currId, data)
        .then((res) => {
          this.$router.push('/product-type')
          this.saving = false
        })
        .catch((err) => {
          if (err) this.error = true
          this.saving = false
        })
    },
    archive() {
      this.saving = true
      archiveType(this.currId)
        .then((res) => {
          this.$router.push('/product-type')
          this.saving = false
        })
        .catch((err) => {
          if (err) this.error = true
          this.saving = false
        })
    },
  },
  head: (vm) => ({
    title: `แก้ไขประเภทสินค้าเลขที่ ${vm.currId}`,
  }),
}
</script>

<style></style>
