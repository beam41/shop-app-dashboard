<template>
  <v-row v-if="loading" class="img-row flex flex-nowrap">
    <v-col v-for="i in 4" :key="i" cols="3">
      <v-card>
        <v-skeleton-loader class="mx-auto" max-width="300" type="card" />
      </v-card>
    </v-col>
  </v-row>
  <v-row v-else class="img-row flex flex-nowrap">
    <v-col v-for="img in images" :key="img.id" cols="3">
      <v-card class="mx-auto" max-width="300">
        <v-img
          aspect-ratio="1"
          :src="img.imageUrl"
          :class="saving ? 'img-saving' : null"
          :alt="img.imageUrl"
        />
        <v-card-actions>
          <v-checkbox
            v-model="img.markForDelete"
            color="secondary"
            inset
            label="ลบรูปนี้"
            :disabled="saving"
          />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    loading: Boolean,
    saving: Boolean,
    images: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.img-row {
  overflow: auto;

  &::-webkit-scrollbar {
    height: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #eeeeee;
  }

  &::-webkit-scrollbar-thumb {
    background: #bdbdbd;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #757575;
  }
}
.img-saving {
  filter: grayscale(1);
}
</style>
