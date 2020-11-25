<template>
  <div class="dis-form">
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
    <!-- add edit dialog -->
    <v-dialog v-model="saveDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">บันทึกข้อมูล?</v-card-title>

        <v-card-text> ต้องการบันทึกข้อมูลวิธีการจัดส่งหรือไม่ </v-card-text>

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
  </div>
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
    saveDialog: false,
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.saveDialog = true
      }
    },
    save() {
      this.$emit('submit')
      this.saveDialog = false
    },
  },
}
</script>

<style lang="scss" scoped>
.form {
  width: 100%;
}

.dis-form {
  width: 100%;
  max-width: 500px;
}
</style>
