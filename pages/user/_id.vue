<template>
  <v-container class="container-height d-flex flex-column">
    <v-row
      no-gutters
      class="d-flex justify-space-between align-center flex-grow-0"
    >
      <h1>แก้ไขผู้ใช้งาน</h1>
    </v-row>
    <v-row no-gutters class="d-flex justify-center align-center pt-16">
      <UserForm
        :loading="loading"
        :saving="saving"
        :initial-value="data"
        @submit="submit"
        @delete="deleteUser"
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
import { getUserById, editUser, deleteUser } from '@/api/user'
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
    this.getUser()
  },
  methods: {
    getUser() {
      this.loading = true
      getUserById(this.currId)
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
      editUser(this.currId, data)
        .then((res) => {
          this.$router.push('/user')
          this.saving = false
        })
        .catch((err) => {
          if (err) this.error = true
          this.saving = false
        })
    },
    deleteUser() {
      this.saving = true
      deleteUser(this.currId)
        .then((res) => {
          this.$router.push('/user')
          this.saving = false
        })
        .catch((err) => {
          if (err) this.error = true
          this.saving = false
        })
    },
  },
  head: (vm) => ({
    title: `แก้ไขผู้ใช้งานเลขที่ ${vm.currId}`,
  }),
}
</script>

<style></style>
