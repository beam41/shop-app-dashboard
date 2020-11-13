<template>
  <v-container class="container-height d-flex flex-column">
    <v-row
      no-gutters
      class="d-flex justify-space-between align-center flex-grow-0"
    >
      <h1>แก้ไขโปรโมชัน</h1>
    </v-row>
    <v-row no-gutters class="d-flex justify-center align-center pt-16">
      <PromotionForm
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
import {
  getPromotionById,
  editPromotion,
  archivePromotion,
} from '@/api/promotion'
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
    this.getPromotion()
  },
  methods: {
    getPromotion() {
      this.loading = true
      getPromotionById(this.currId)
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
      editPromotion(this.currId, data)
        .then((res) => {
          this.$router.push('/promotion')
          this.saving = false
        })
        .catch((err) => {
          if (err) this.error = true
          this.saving = false
        })
    },
    archive() {
      this.saving = true
      archivePromotion(this.currId)
        .then((res) => {
          this.$router.push('/promotion')
          this.saving = false
        })
        .catch((err) => {
          if (err) this.error = true
          this.saving = false
        })
    },
  },
}
</script>

<style></style>
