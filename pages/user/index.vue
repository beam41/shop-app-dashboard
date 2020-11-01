<template>
  <v-container>
    <v-row no-gutters class="d-flex align-center">
      <h1>จัดการผู้ใช้งาน</h1>
    </v-row>
    <v-row no-gutters>
      <UserList :loading="loading" :items="items" />
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
import { getUserList } from '@/api/user'
export default {
  data: () => ({
    items: [],
    loading: false,
    error: false,
  }),
  mounted() {
    this.loading = true
    getUserList()
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
