<template>
  <div>
    <v-form v-if="!isFinal" ref="form" class="pt-8" @submit.prevent="submit">
      <v-text-field
        v-if="isBeforeSent"
        v-model="field.trackingNumber"
        :rules="rules"
        label="เลขติดตามพัสดุ"
        required
        :disabled="saving"
        outlined
        dense
      />

      <div class="d-flex">
        <v-btn large color="error" outlined @click="$emit('cancel')">
          ยกเลิกคำสั่งซื้อ
        </v-btn>

        <v-spacer />
        <v-btn
          v-if="btnTxt"
          large
          color="primary"
          :loading="saving"
          type="submit"
        >
          {{ btnTxt }}
        </v-btn>
        <v-btn
          v-else-if="
            currState === OrderState.CREATED || currState === OrderState.SENT
          "
          large
          color="primary"
          :loading="saving"
          type="submit"
          disabled
        >
          รอการตอบกลับจากผู้ซื้อ
        </v-btn>
      </div>
    </v-form>
    <v-dialog v-model="saveDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">ยืนยันสถานะ?</v-card-title>

        <v-card-text>
          สถานะของคำสั่งซื้อจะถูกเปลี่ยนแปลง ต้องการบันทึกข้อมูลหรือไม่
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text :disabled="saving" @click="saveDialog = false">
            ยกเลิก
          </v-btn>
          <v-btn color="primary" text :loading="saving" @click="save">
            {{ btnTxt }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import OrderState from '@/constants/order-state'
import PurchaseMethod from '@/constants/purchase-method'

const btnTxt = {
  ADDED_PROOF_OF_PAYMENT_FULL: 'ยีนยันสลิปธนาคารถูกต้อง',
  APPROVED_PROOF_OF_PAYMENT_FULL: 'จัดส่ง',
}

export default {
  props: {
    saving: Boolean,
    order: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    field: {
      trackingNumber: '',
    },
    rules: [(v) => !!v || 'โปรดกรอกข้อมูลให้ครบถ้วน'],
    saveDialog: false,
  }),
  computed: {
    currState() {
      return this.order?.orderStates[this.order?.orderStates.length - 1].state
    },
    isFinal() {
      return this.order?.orderStates.some(
        (e) =>
          e.state === OrderState.CANCELLED || e.state === OrderState.RECEIVED
      )
    },
    btnTxt() {
      if (this.order?.purchaseMethod === PurchaseMethod.ON_DELIVERY) {
        return this.currState === OrderState.CREATED ? 'จัดส่ง' : null
      }
      return btnTxt[this.currState]
    },
    isBeforeSent() {
      if (this.order?.purchaseMethod === PurchaseMethod.ON_DELIVERY) {
        return this.currState === OrderState.CREATED
      }
      return this.currState === OrderState.APPROVED_PROOF_OF_PAYMENT_FULL
    },
    OrderState: () => OrderState,
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.saveDialog = true
      }
    },
    save() {
      this.$emit('submit', {
        state: this.isBeforeSent
          ? OrderState.SENT
          : OrderState.APPROVED_PROOF_OF_PAYMENT_FULL,
        data: { ...this.field },
      })
    },
  },
}
</script>

<style></style>
