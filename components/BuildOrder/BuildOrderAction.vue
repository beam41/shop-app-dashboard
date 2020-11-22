<template>
  <v-form v-if="!isFinal" ref="form" class="pt-8" @submit.prevent="submit">
    <template v-if="currState === OrderState.CREATED">
      <v-text-field
        v-model="ableField.fullPrice"
        :rules="rules"
        label="ราคาที่ประเมินได้"
        required
        :disabled="saving"
        outlined
        dense
      />
      <v-text-field
        v-model="ableField.depositPrice"
        :rules="rules"
        label="ราคามัดจำ"
        required
        :disabled="saving"
        outlined
        dense
      />
    </template>
    <template v-if="currState === OrderState.ADDED_PROOF_OF_PAYMENT_DEPOSIT">
      <v-menu
        v-model="dateMenu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="expectedCompleteDateFormatted"
            label="เลือกวันที่คาดว่าจะแล้วเสร็จ"
            :rules="rules"
            readonly
            v-bind="attrs"
            outlined
            dense
            v-on="on"
          />
        </template>
        <v-date-picker
          v-model="approveProofField.expectedCompleteDate"
          @input="dateMenu = false"
        />
      </v-menu>
    </template>
    <template v-if="currState === OrderState.APPROVED_PROOF_OF_PAYMENT_FULL">
      <v-text-field
        v-model="sentField.trackingNumber"
        :rules="rules"
        label="เลขติดตามพัสดุ"
        required
        :disabled="saving"
        outlined
        dense
      />
    </template>

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
      <v-btn
        v-else-if="
          currState === OrderState.BUILT_COMPLETE ||
          currState === OrderState.IS_ABLE_TO_BUILT ||
          currState === OrderState.SENT
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
</template>

<script>
import OrderState from '@/constants/order-state'
import dayjs from 'dayjs'

const btnTxt = {
  CREATED: 'สามารถทำได้',
  ADDED_PROOF_OF_PAYMENT_DEPOSIT: 'ยีนยันสลิปธนาคารถูกต้อง',
  APPROVED_PROOF_OF_PAYMENT_DEPOSIT: 'ทำเครื่องเงินเรียบร้อยแล้ว',
  ADDED_PROOF_OF_PAYMENT_FULL: 'ยีนยันสลิปธนาคารถูกต้อง',
  APPROVED_PROOF_OF_PAYMENT_FULL: 'จัดส่ง',
}

const nextState = {
  CREATED: OrderState.IS_ABLE_TO_BUILT,
  ADDED_PROOF_OF_PAYMENT_DEPOSIT: OrderState.APPROVED_PROOF_OF_PAYMENT_DEPOSIT,
  APPROVED_PROOF_OF_PAYMENT_DEPOSIT: OrderState.BUILT_COMPLETE,
  ADDED_PROOF_OF_PAYMENT_FULL: OrderState.APPROVED_PROOF_OF_PAYMENT_FULL,
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
    ableField: {
      fullPrice: '',
      depositPrice: '',
    },
    approveProofField: {
      expectedCompleteDate: '',
    },
    sentField: {
      trackingNumber: '',
    },
    dateMenu: false,
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
    fieldMap() {
      return {
        CREATED: this.ableField,
        ADDED_PROOF_OF_PAYMENT_DEPOSIT: this.approveProofField,
        APPROVED_PROOF_OF_PAYMENT_DEPOSIT: null,
        ADDED_PROOF_OF_PAYMENT_FULL: null,
        APPROVED_PROOF_OF_PAYMENT_FULL: this.sentField,
      }
    },
    expectedCompleteDateFormatted() {
      return this.approveProofField.expectedCompleteDate
        ? dayjs(this.approveProofField.expectedCompleteDate).format(
            'DD MMMM BBBB'
          )
        : ''
    },
    OrderState: () => OrderState,
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$emit('submit', {
          state: nextState[this.currState],
          data: this.fieldMap[this.currState],
        })
      }
    },
  },
}
</script>

<style></style>
