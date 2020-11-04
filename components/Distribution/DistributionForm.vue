<template>
  <v-form
    ref="form"
    class="form d-flex flex-column justify-space-between"
    @submit.prevent="submit"
  >
    <div>
      <v-row v-for="(d, index) in value" :key="index">
        <v-col cols="6">
          <v-text-field
            v-model="d.name"
            :rules="rules"
            label="วิธีจัดส่ง"
            required
            :disabled="saving"
            outlined
            dense
          />
        </v-col>
        <v-col cols="5">
          <v-text-field
            v-model="d.price"
            :rules="rules"
            label="ราคา"
            required
            :disabled="saving"
            outlined
            dense
          />
        </v-col>
        <v-col cols="1" class="d-flex justify-center">
          <v-btn
            icon
            color="error"
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
  max-width: 500px;
}
</style>
