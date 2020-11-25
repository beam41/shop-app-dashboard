<template>
  <v-form
    ref="form"
    :class="[
      'form d-flex flex-column justify-space-between',
      editMode ? 'edit' : null,
    ]"
    @submit.prevent="submit"
  >
    <div>
      <v-text-field
        v-if="editMode"
        v-model="initialValueId"
        label="ID"
        :loading="loading"
        :disabled="saving"
        outlined
        dense
        readonly
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
      <PromotionProductList
        :items="field.promotionItems"
        :loading="loading"
        :edit-mode="editMode"
        :has-active-in-other="hasActiveInOther"
        @delete="deleteItems"
      />
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
        large
        color="error"
        outlined
        @click="deleteDialog = true"
      >
        เก็บถาวร
      </v-btn>

      <v-spacer />
      <v-btn large color="primary" :loading="saving" type="submit">
        บันทึก
      </v-btn>
    </div>
    <!-- delete dialog -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">ต้องการเก็บถาวร?</v-card-title>

        <v-card-text>
          ต้องการเก็บถาวรโปรโมชันนี้หรือไม่
          โปรโมชันที่ถูกเก็บถาวรจะไม่ถูกแสดงในรายการโปรโมชันและในหน้าร้านค้าอีก
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text :disabled="saving" @click="deleteDialog = false">
            ยกเลิก
          </v-btn>
          <v-btn color="error" text :loading="saving" @click="$emit('archive')">
            เก็บถาวร
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- add edit dialog -->
    <v-dialog v-model="saveDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">บันทึกข้อมูล?</v-card-title>

        <v-card-text> ต้องการบันทึกข้อมูลโปรโมชันนี้หรือไม่ </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text :disabled="saving" @click="saveDialog = false">
            ยกเลิก
          </v-btn>
          <v-btn color="primary" text :loading="saving" @click="save">
            บันทึก
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
    saveDialog: false,
  }),
  computed: {
    initialValueId() {
      return this.initialValue?.id
    },
    hasActiveInOther() {
      return (
        this.field.isBroadcasted &&
        !this.field.promotionItems.reduce(
          (prev, curr) =>
            prev ? (curr.onSale ? curr.onSaleCurrPromotion : true) : false,
          true
        )
      )
    },
  },
  watch: {
    initialValue(val) {
      this.field = {
        name: val.name,
        description: val.description,
        isBroadcasted: val.isBroadcasted,
        promotionItems: val.promotionItems,
      }
    },
  },
  methods: {
    submit() {
      if (this.$refs.form.validate() && !this.hasActiveInOther) {
        this.saveDialog = true
      }
    },
    save() {
      this.$emit('submit', {
        ...this.field,
        promotionItems: this.field.promotionItems.map((e) => ({
          productId: e.id,
          newPrice: +e.newPrice,
        })),
      })
    },
    deleteItems(id) {
      this.field.promotionItems = this.field.promotionItems.filter(
        (e) => e.id !== id
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.form {
  width: 100%;
  max-width: 700px;

  &.edit {
    max-width: 1000px;
  }
}
</style>
