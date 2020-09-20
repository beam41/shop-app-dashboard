<template>
  <v-row v-if="loading">
    <v-col v-for="i in 4" :key="i" cols="3">
      <v-skeleton-loader class="mx-auto" max-width="300" type="card" />
    </v-col>
  </v-row>
  <v-row v-else>
    <v-col v-for="img in images" :key="img.id" cols="3">
      <v-card class="mx-auto" max-width="300">
        <v-img aspect-ratio="1" :src="img.imageUrl" />
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

<style></style>
