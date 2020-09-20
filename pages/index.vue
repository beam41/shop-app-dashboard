<template>
  <v-container class="login">
    <v-row class="login-row" align="center" justify="center">
      <v-card :loading="loading" class="mx-auto my-12" width="400">
        <v-card-title>Login</v-card-title>

        <v-form v-model="valid" class="mx-4">
          <input type="hidden" value="SUPER_ADMIN" name="username" />
          <v-text-field
            v-model="password"
            type="password"
            :rules="[
              (v) => v.length >= 6 || 'รหัสผ่านต้องยาวอย่างน้อย 6 ตัวอักษร',
            ]"
            label="Password"
            autocomplete="current-password"
            required
            outlined
            dense
            :disabled="loading"
          />
        </v-form>
        <v-card-actions>
          <v-btn
            text
            color="primary"
            class="mr-4"
            :loading="loading"
            :disabled="!valid"
            @click="login"
          >
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
    <v-dialog v-model="error" max-width="290">
      <v-card>
        <v-card-title class="headline">เกิดปัญหาขึ้น</v-card-title>

        <v-card-text>
          {{ errorText }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" text @click="error = false">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { login } from '@/api/user'
export default {
  layout: 'login',
  data: () => ({
    password: '',
    error: false,
    errorText: '',
    loading: false,
    valid: false,
  }),
  methods: {
    login() {
      this.loading = true
      login('SUPER_ADMIN', this.password)
        .then((res) => {
          this.loading = false
          this.$store.commit('user/login', res.data)
          this.$router.push('/product')
        })
        .catch((err) => {
          this.loading = false
          if (err.response.status === 403) {
            this.errMessage = 'ชื่อผู้ใช้งานหรือรหัสผ่านผิด'
            this.error = true
          } else {
            this.error = true
            this.errMessage = `เกิดปัญหาขึ้น (รหัสปัญหา ${err.response.status}) โปรดลองใหม่อีกครั้ง`
          }
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;

  .login-row {
    height: 100%;
  }
}
</style>
