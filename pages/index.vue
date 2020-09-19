<template>
  <v-container class="login">
    <v-row class="login-row" align="center" justify="center">
      <v-card :loading="loading" class="mx-auto my-12" width="400">
        <v-card-title>Login</v-card-title>

        <v-form ref="form" v-model="valid" class="mx-4" :lazy-validation="lazy">
          <v-text-field
            v-model="password"
            :rules="[(v) => v.length > 6 || 'รหัสผ่านต้องยาวอย่างน้อย 6 ตัวอักษร']"
            label="Password"
            required
            outlined
            dense
          ></v-text-field>
        </v-form>
        <v-card-actions>
          <v-btn text color="primary" class="mr-4" @click="login">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'login',
  data: () => ({
    password: '',
  }),
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
