<template>
  <v-form
    ref="form"
    class="form d-flex flex-column justify-space-between"
    @submit.prevent="submit"
  >
    <div>
      <v-row v-for="(d, index) in value" :key="index">
        <v-col cols="3">
          <v-text-field
            v-model="d.bank"
            :rules="rules"
            label="ชื่อธนาคาร"
            required
            :disabled="saving"
            outlined
            dense
          />
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="d.accountNumber"
            :rules="rules"
            label="เลขที่บัญชี"
            required
            :disabled="saving"
            outlined
            dense
          />
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="d.accountName"
            :rules="rules"
            label="ชื่อบัญชี"
            required
            :disabled="saving"
            outlined
            dense
          />
        </v-col>
        <v-col cols="1" class="d-flex justify-center">
          <v-btn
            icon
            color="danger"
            :loading="saving"
            @click="$emit('delete', index)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-btn block color="accent" outlined @click="$emit('add')">
        <v-icon>mdi-plus</v-icon> เพิ่มแถว
      </v-btn>
    </div>
    <div class="d-flex pt-16">
      <v-spacer />
      <v-btn large color="primary" :loading="saving" type="submit">
        บันทึก
      </v-btn>
    </div>
  </v-form>
</template>

<script>
export default {
  props: {
    saving: Boolean,
    value: {
      type: Array,
      default: null,
    },
  },
  data: () => ({
    rules: [(v) => !!v || 'โปรดกรอกข้อมูลให้ครบถ้วน'],
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$emit('submit')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.form {
  width: 100%;
  max-width: 1000px;
}
</style>
