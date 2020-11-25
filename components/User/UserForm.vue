<template>
  <v-form
    ref="form"
    class="form d-flex flex-column justify-space-between"
    @submit.prevent="submit"
  >
    <div>
      <v-text-field
        v-model="initialValueId"
        label="ID"
        :loading="loading"
        :disabled="saving"
        outlined
        dense
        readonly
      />
      <v-text-field
        v-model="field.username"
        :rules="rulesUsn"
        label="ชื่อผู้ใช้งาน"
        :loading="loading || usnChecking"
        :disabled="saving"
        outlined
        dense
        :readonly="initialValueId === 1"
      />
      <v-text-field
        v-model="field.newPassword"
        :rules="rulesPwd"
        label="รหัสผ่านใหม่"
        :loading="loading"
        :disabled="saving"
        autocomplete="new-password"
        outlined
        dense
      />
      <v-subheader> ข้อมูลที่อยู่ </v-subheader>
      <v-text-field
        v-model="field.fullName"
        :rules="rules"
        label="ชื่อ-นามสกุล"
        :required="initialValueId !== 1"
        autocomplete="name"
        :loading="loading"
        :disabled="saving"
        outlined
        dense
      />
      <v-text-field
        v-model="field.address"
        :rules="rules"
        label="ที่อยู่"
        :required="initialValueId !== 1"
        autocomplete="street-address"
        :loading="loading"
        :disabled="saving"
        outlined
        dense
      />
      <v-select
        v-model="field.province"
        :items="provinceList"
        :rules="rules"
        label="จังหวัด"
        :required="initialValueId !== 1"
        :loading="loading"
        :disabled="saving"
        outlined
        dense
      />
      <v-select
        v-model="field.district"
        :items="districtList"
        :rules="rules"
        label="เขต/อำเภอ"
        :required="initialValueId !== 1"
        :loading="loading"
        :disabled="saving"
        outlined
        dense
      />
      <v-select
        v-model="field.subDistrict"
        :items="subDistrictList"
        :rules="rules"
        label="แขวง/ตำบล"
        :required="initialValueId !== 1"
        :loading="loading"
        :disabled="saving"
        outlined
        dense
      />
      <v-text-field
        v-model="field.postalCode"
        :rules="rules"
        label="รหัสไปรษณีย์"
        :required="initialValueId !== 1"
        :loading="loading"
        :disabled="saving"
        outlined
        dense
        autocomplete="postal-code"
      />
      <v-text-field
        v-model="field.phoneNumber"
        :rules="rules"
        label="เบอร์โทรศัพท์"
        :required="initialValueId !== 1"
        type="tel"
        autocomplete="tel"
        :loading="loading"
        :disabled="saving"
        outlined
        dense
      />
    </div>
    <div class="d-flex pt-16">
      <v-btn
        large
        color="error"
        outlined
        :disabled="initialValueId === 1"
        @click="deleteDialog = true"
      >
        ลบผู้ใช้
      </v-btn>

      <v-spacer />
      <v-btn large color="primary" :loading="saving" type="submit">
        บันทึก
      </v-btn>
    </div>
    <!-- delete dialog -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">ต้องการลบผู้ใช้?</v-card-title>

        <v-card-text>
          ต้องการลบผู้ใช้งานนี้หรือไม่ ผู้ใช้งานที่ถูกลบจะไม่สามารถกู้คืนได้
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text :disabled="saving" @click="deleteDialog = false">
            ยกเลิก
          </v-btn>
          <v-btn color="error" text :loading="saving" @click="$emit('delete')">
            ลบผู้ใช้
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- edit dialog -->
    <v-dialog v-model="saveDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">บันทึกข้อมูล?</v-card-title>

        <v-card-text> ต้องการบันทึกข้อมูลผู้ใช้งานนี้หรือไม่ </v-card-text>

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
import {
  getProvinceList,
  getDistrictList,
  getSubDistrictList,
  getZipcode,
} from '@/utils/address'
import { checkUserExist } from '@/api/user'

export default {
  props: {
    loading: Boolean,
    saving: Boolean,
    initialValue: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    field: {
      username: '',
      newPassword: '',
      fullName: '',
      address: '',
      province: '',
      district: '',
      subDistrict: '',
      postalCode: '',
      phoneNumber: '',
    },
    deleteDialog: false,
    provinceList: [],
    districtList: [],
    subDistrictList: [],
    usnExist: false,
    usnChecking: false,
    init: true,
    saveDialog: false,
  }),
  computed: {
    initialValueId() {
      return this.initialValue?.id
    },
    rules() {
      if (this.initialValueId !== 1)
        return [(v) => !!v || 'โปรดกรอกข้อมูลให้ครบถ้วน']
      return []
    },
    rulesUsn() {
      if (this.usnExist) {
        return ['มีชื่อผู้ใช้งานนี้แล้ว']
      }
      return [(v) => v.length >= 6 || 'โปรดกรอกข้อมูลให้ครบถ้วน']
    },
    rulesPwd() {
      return [
        (v) => v.length >= 6 || v.length < 1 || 'โปรดกรอกข้อมูลให้ครบถ้วน',
      ]
    },
  },
  watch: {
    initialValue(val) {
      this.field = {
        ...this.field,
        username: val.username,
        phoneNumber: val.phoneNumber,
        fullName: val.fullName,
        address: val.address,
        province: val.province,
        district: val.district,
        subDistrict: val.subDistrict,
        postalCode: val.postalCode,
      }
    },
    'field.province'(to) {
      this.districtList = getDistrictList(to)
    },
    'field.district'(to) {
      this.subDistrictList = getSubDistrictList(this.field.province, to)
    },
    'field.subDistrict'(to) {
      this.field.postalCode = getZipcode(
        this.field.province,
        this.field.district,
        to
      )
      if (this.init) {
        this.field.postalCode = this.initialValue.postalCode
        this.init = false
      }
    },
    'field.username'(to) {
      this.checkExist(to)
    },
  },
  mounted() {
    this.provinceList = getProvinceList()
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
        newPassword:
          this.field.newPassword.length > 0
            ? this.field.newPassword
            : undefined,
      })
    },
    checkExist(usn) {
      this.usnExist = false
      if (usn !== this.initialValue.username) {
        if (usn.length >= 6) {
          this.usnChecking = true
          checkUserExist(usn)
            .then((res) => {
              this.usnExist = res.data.result
              this.usnChecking = false
            })
            .catch((err) => {
              this.usnChecking = false
              if (err) {
                // eslint-disable-next-line no-console
                console.error(err)
              }
            })
        }
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
