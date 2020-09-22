<template>
  <v-form ref="form" class="form d-flex flex-column justify-space-between">
    <div>
      <v-text-field
        v-if="editMode"
        v-model="initialValueId"
        label="ID"
        :loading="loading"
        outlined
        dense
        readonly
      />
      <v-text-field
        v-model="field.name"
        :rules="rules"
        label="ชื่อสินค้า"
        required
        :loading="loading"
        :disabled="saving"
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
        :loading="loading"
        :disabled="saving"
        dense
      />
      <v-select
        v-model="field.typeId"
        :rules="rules"
        label="ประเภท"
        required
        outlined
        dense
        :disabled="saving"
        :items="types"
        :loading="typeLoading || loading"
      />
      <v-textarea
        v-model="field.description"
        :rules="rules"
        label="คำอธิบาย"
        required
        outlined
        :disabled="saving"
        :loading="loading"
        dense
      />
      <v-file-input
        v-model="images"
        :prepend-icon="null"
        prepend-inner-icon="mdi-image"
        :rules="[(v) => v.length + notDeleteImgCount > 0 || 'โปรดเพิ่มรูปภาพ']"
        outlined
        dense
        small-chips
        multiple
        show-size
        counter
        accept="image/jpeg, image/png"
        :disabled="saving"
        :loading="loading"
        :label="editMode ? 'เพิ่มรูปประกอบใหม่' : 'รูปประกอบ'"
      />
      <OldImageSelector
        v-if="editMode"
        :loading="loading"
        :saving="saving"
        :images="oldImages"
      />
      <v-switch
        v-model="field.isVisible"
        inset
        label="แสดงในหน้าร้านค้า"
        :disabled="saving"
        :loading="loading"
      />
    </div>
    <div class="d-flex">
      <v-btn
        v-if="editMode"
        large
        color="error"
        outlined
        :disabled="saving"
        @click="deleteDialog = true"
      >
        เก็บถาวร
      </v-btn>
      <v-spacer />
      <v-btn large color="primary" :loading="saving" @click="submit">
        บันทึก
      </v-btn>
    </div>
    <!-- delete dialog -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">ต้องการเก็บถาวร?</v-card-title>

        <v-card-text>
          ต้องการเก็บถาวรสินค้านี้หรือไม่
          สินค้าที่ถูกเก็บถาวรจะไม่ถูกแสดงในตารางสินค้าและในหน้าร้านค้าอีก
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text
            :disabled="saving"
            @click="deleteDialog = false"
          >
            ยกเลิก
          </v-btn>
          <v-btn
            color="secondary"
            text
            :loading="saving"
            @click="$emit('archive')"
          >
            เก็บถาวร
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script>
import { getTypes } from '@/api/type'
export default {
  props: {
    loading: Boolean,
    saving: Boolean,
    editMode: Boolean,
    initialValue: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    field: {
      name: '',
      price: '',
      typeId: null,
      description: '',
      isVisible: false,
    },
    oldImages: [],
    images: [],
    rules: [(v) => !!v || 'โปรดกรอกข้อมูลให้ครบถ้วน'],
    types: [],
    typeLoading: false,
    deleteDialog: false,
  }),
  computed: {
    notDeleteImgCount() {
      return this.oldImages.filter((v) => !v.markForDelete).length
    },
    initialValueId() {
      return this.initialValue?.id
    },
  },
  watch: {
    initialValue(val) {
      this.field = {
        name: val.name,
        price: val.price,
        typeId: val.typeId,
        description: val.description,
        isVisible: val.isVisible,
      }
      this.oldImages = val.images.map((v) => ({
        ...v,
        markForDelete: false,
      }))
    },
  },
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
        this.oldImages
          .filter((v) => v.markForDelete)
          .forEach((v) => {
            formPayload.append('markForDeleteId', v.id)
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
