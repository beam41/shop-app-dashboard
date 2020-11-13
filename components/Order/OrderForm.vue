<template>
  <div class="form d-flex flex-column justify-space-between">
    <div>
      <OrderDetail :order="order" :loading="loading" />
    </div>
    <OrderAction
      :order="order"
      @cancel="cancelDialog = true"
      @submit="(e) => $emit('submit', e)"
    />

    <!-- cancel dialog -->
    <v-dialog v-model="cancelDialog" max-width="400">
      <v-form ref="cancelForm" @submit.prevent="cancel">
        <v-card>
          <v-card-title class="headline">ต้องการยกเลิกคำสั่งซื้อ?</v-card-title>
          <div class="mx-4">
            <v-text-field
              v-model="cancelReason"
              :rules="[(v) => !!v || 'โปรดกรอกเหตุผล']"
              label="เหตุผล"
              required
              outlined
              dense
              :disabled="saving"
            />
          </div>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text :disabled="saving" @click="closeCancel">
              ปิด
            </v-btn>
            <v-btn color="secondary" text :loading="saving" type="submit">
              ยกเลิกคำสั่งซื้อ
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    loading: Boolean,
    saving: Boolean,
    order: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    cancelDialog: false,
    cancelReason: '',
  }),
  methods: {
    closeCancel() {
      this.cancelDialog = false
      this.cancelReason = ''
    },
    cancel() {
      if (this.$refs.cancelForm.validate()) {
        this.$emit('cancel', { reason: this.cancelReason })
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
