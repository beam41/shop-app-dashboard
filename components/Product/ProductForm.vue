<template>
  <v-form ref="form" class="form d-flex flex-column justify-space-between">
    <div>
      <v-text-field
        v-model="field.name"
        :rules="rules"
        label="ชื่อสินค้า"
        required
        :disabled="loading"
        outlined
        dense
      />
      <v-text-field
        v-model="field.price"
        :rules="[...rules, (v) => !isNaN(v) || 'โปรดกรอกข้อมูลให้ถูกต้อง']"
        label="ราคา"
        type="number"
        required
        outlined
        :disabled="loading"
        dense
      />
      <v-select
        v-model="field.typeId"
        :rules="rules"
        label="ประเภท"
        required
        outlined
        dense
        :disabled="loading"
        :items="types"
        :loading="typeLoading"
      />
      <v-textarea
        v-model="field.description"
        :rules="rules"
        label="คำอธิบาย"
        required
        outlined
        :disabled="loading"
        dense
      />
      <v-file-input
        v-model="images"
        :prepend-icon="null"
        prepend-inner-icon="mdi-image"
        :rules="[(v) => v.length > 0 || 'โปรดเพิ่มรูปภาพ']"
        outlined
        dense
        small-chips
        multiple
        show-size
        counter
        accept="image/jpeg, image/png"
        :disabled="loading"
        label="รูปประกอบ"
      />
      <v-switch
        v-model="field.isVisible"
        inset
        label="แสดงในหน้าร้านค้า"
        :disabled="loading"
      ></v-switch>
    </div>
    <div class="btn-right">
      <v-btn large color="primary" :loading="loading" @click="submit">
        บันทึก
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import { getTypes } from '@/api/type'
export default {
  props: {
    loading: Boolean,
  },
  data: () => ({
    field: {
      name: '',
      price: '',
      typeId: null,
      description: '',
      isVisible: false,
    },
    images: [],
    rules: [(v) => !!v || 'โปรดกรอกข้อมูลให้ครบถ้วน'],
    types: [],
    typeLoading: false,
  }),
  mounted() {
    this.getTypes()
  },
  methods: {
    getTypes() {
      this.typeLoading = true
      getTypes()
        .then((res) => {
          this.typeLoading = false
          this.types = res.data.map((dat) => ({
            value: dat.id,
            text: dat.name,
          }))
        })
        .catch((err) => {
          if (err) this.typeLoading = false
        })
    },
    submit() {
      if (this.$refs.form.validate()) {
        const formPayload = new FormData()
        Object.entries(this.field).forEach(([key, value]) => {
          formPayload.append(key, value)
        })
        this.images.forEach((file) => {
          formPayload.append('images', file)
        })
        this.$emit('submit', formPayload)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.form {
  width: 100%;
  max-width: 800px;
}
</style>
