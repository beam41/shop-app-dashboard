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
        disabled
      />
      <v-text-field
        v-model="field.name"
        :rules="rules"
        label="ชื่อโปรโมชัน"
        required
        :loading="loading"
        :disabled="saving"
        outlined
        dense
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
      <PromotionProductList :items="field.promotionItems" :loading="loading" />
      <v-switch
        v-model="field.isBroadcasted"
        inset
        label="เผยแพร่โปรโมชัน"
        :disabled="saving"
        :loading="loading"
      />
    </div>
    <div class="d-flex pt-16">
      <v-btn
        v-if="editMode"
        :disabled="initialValueProductLength > 0 || saving"
        large
        color="error"
        outlined
        @click="deleteDialog = true"
      >
        {{
          (initialValueProductLength > 0 ? 'ลบรายการสินค้าให้หมดก่อน' : '') +
          'เก็บถาวร'
        }}
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
          ต้องการเก็บถาวรประเภทสินค้านี้หรือไม่
          ประเภทสินค้าที่ถูกเก็บถาวรจะไม่ถูกแสดงในรายการประเภทสินค้าและในหน้าร้านค้าอีก
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
      description: '',
      isBroadcasted: true,
      promotionItems: [],
    },
    rules: [(v) => !!v || 'โปรดกรอกข้อมูลให้ครบถ้วน'],
    deleteDialog: false,
    products: [],
  }),
  computed: {
    initialValueId() {
      return this.initialValue?.id
    },
  },
  watch: {
    initialValue(val) {
      this.field = {
        name: val.name,
      }
    },
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$emit('submit', {
          ...this.field,
          promotionItems: this.field.promotionItems.map((e) => ({
            productId: e.id,
            newPrice: e.newPrice,
          })),
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.form {
  width: 100%;
  max-width: 700px;
}
</style>
