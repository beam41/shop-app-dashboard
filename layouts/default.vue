<template>
  <v-app light>
    <v-navigation-drawer
      :width="300"
      dark
      expand-on-hover
      mini-variant
      permanent
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template #append>
        <v-list>
          <v-list-item link @click="logout">
            <v-list-item-action>
              <v-icon>mdi-logout-variant</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="'Logout'" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: 'mdi-diamond-stone',
          title: 'จัดการข้อมูลสินค้า',
          to: '/product',
        },
        {
          icon: 'mdi-apps',
          title: 'จัดการประเภทสินค้า',
          to: '/product-type',
        },
        {
          icon: 'mdi-currency-usd-off',
          title: 'จัดการรายการโปรโมชั่น',
          to: '/promotion',
        },
        {
          icon: 'mdi-credit-card-outline',
          title: 'จัดการช่องทางการชำระเงิน',
          to: '/payment',
        },
        {
          icon: 'mdi-cart-outline',
          title: 'ดูรายการการสั่งซื้อ',
          to: '/order',
        },
        {
          icon: 'mdi-hammer-wrench',
          title: 'ดูรายการการสั่งทำ',
          to: '/build-order',
        },
        {
          icon: 'mdi-account-outline',
          title: 'จัดการลูกค้าสมาชิก',
          to: '/user',
        },
      ],
    }
  },
  methods: {
    logout() {
      this.$store.commit('user/logout')
      this.$router.push('/')
    },
  },
}
</script>
