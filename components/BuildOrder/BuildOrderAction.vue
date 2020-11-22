<template>
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
      <v-btn large color="error" outlined @click="$emit('cancel', isCreated)">
        {{ isCreated ? 'ไม่สามารถทำได้' : 'ยกเลิกคำสั่งซื้อ' }}
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
    </div>
  </v-form>
</template>

<script>
import OrderState from '@/constants/order-state'

const btnTxt = {
  CREATED: 'สามารถทำได้',
  ADDED_PROOF_OF_PAYMENT_DEPOSIT: 'ยีนยันสลิปธนาคารถูกต้อง',
  APPROVED_PROOF_OF_PAYMENT_DEPOSIT: 'ทำเครื่องเงินเรียบร้อยแล้ว',
  ADDED_PROOF_OF_PAYMENT_FULL: 'ยีนยันสลิปธนาคารถูกต้อง',
  APPROVED_PROOF_OF_PAYMENT_FULL: 'จัดส่ง',
}

const nextState = {
  CREATED: OrderState.IS_ABLE_TO_BUILT,
  ADDED_PROOF_OF_PAYMENT_DEPOSIT: OrderState.APPROVED_PROOF_OF_PAYMENT_FULL,
  APPROVED_PROOF_OF_PAYMENT_DEPOSIT: OrderState.APPROVED_PROOF_OF_PAYMENT_FULL,
  ADDED_PROOF_OF_PAYMENT_FULL: OrderState.BUILT_COMPLETE,
  APPROVED_PROOF_OF_PAYMENT_FULL: OrderState.SENT,
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
  }),
  computed: {
    currState() {
      return this.order?.orderStates[this.order?.orderStates.length - 1].state
    },
    isCreated() {
      return !this.order?.orderStates.some(
        (e) => e.state !== OrderState.CREATED
      )
    },
    isFinal() {
      return this.order?.orderStates.some(
        (e) =>
          e.state === OrderState.CANCELLED ||
          e.state === OrderState.RECEIVED ||
          e.OrderState === OrderState.IS_UNABLE_TO_BUILT
      )
    },
    btnTxt() {
      return btnTxt[this.currState]
    },
    OrderState: () => OrderState,
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$emit('submit', {
          state: nextState[this.currState],
          data: { ...this.field },
        })
      }
    },
  },
}
</script>

<style></style>
