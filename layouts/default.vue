<template>
  <v-app light>
    <v-navigation-drawer
      :width="300"
      dark
      expand-on-hover
      mini-variant
      permanent
      app
      class="no-scroll"
    >
      <v-list dark>
        <template v-for="(item, i) in items">
          <template v-if="!item.submenu">
            <v-list-item :key="i" :to="item.to" router exact>
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="item.title" />
              </v-list-item-content>
            </v-list-item>
          </template>
          <template v-else>
            <v-list-group :key="i" active-class="white--text">
              <template v-slot:activator>
                <v-list-item-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title" />
                </v-list-item-content>
              </template>
              <v-list-item
                v-for="(sub, i2) in item.submenu"
                :key="i2"
                :to="sub.to"
                active-class="white--text"
                router
                exact
              >
                <v-list-item-action>
                  <v-icon>{{ item.submenuIcon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title v-text="sub.title" />
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </template>
        </template>
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
import OrderStateName from '@/constants/order-state-name'
import BuildOrderStateName from '@/constants/build-order-state-name'
import OrderState from '@/constants/order-state'
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
          icon: 'mdi-credit-card',
          title: 'จัดการช่องทางการชำระเงิน',
          to: '/payment',
        },
        {
          icon: 'mdi-truck',
          title: 'จัดการวิธีการจัดส่ง',
          to: '/distribution',
        },
        {
          icon: 'mdi-cart',
          submenuIcon: 'mdi-cart-outline',
          title: 'ดูรายการการสั่งซื้อ',
          to: '/order',
          submenu: [
            {
              title: OrderStateName.CREATED,
              to: `/order/state/${OrderState.CREATED}`,
            },
            {
              title: OrderStateName.ADDED_PROOF_OF_PAYMENT_FULL,
              to: `/order/state/${OrderState.ADDED_PROOF_OF_PAYMENT_FULL}`,
            },
            {
              title: OrderStateName.APPROVED_PROOF_OF_PAYMENT_FULL,
              to: `/order/state/${OrderState.APPROVED_PROOF_OF_PAYMENT_FULL}`,
            },
            {
              title: OrderStateName.SENT,
              to: `/order/state/${OrderState.SENT}`,
            },
            {
              title: OrderStateName.RECEIVED,
              to: `/order/state/${OrderState.RECEIVED}`,
            },
            {
              title: OrderStateName.CANCELLED,
              to: `/order/state/${OrderState.CANCELLED}`,
            },
          ],
        },
        {
          icon: 'mdi-hammer-screwdriver',
          submenuIcon: 'mdi-hammer',
          title: 'ดูรายการการสั่งทำ',
          to: '/build-order',
          submenu: [
            {
              title: BuildOrderStateName.CREATED,
              to: `/build-order/state/${OrderState.CREATED}`,
            },
            {
              title: BuildOrderStateName.IS_ABLE_TO_BUILT,
              to: `/build-order/state/${OrderState.IS_ABLE_TO_BUILT}`,
            },
            {
              title: BuildOrderStateName.ADDED_PROOF_OF_PAYMENT_DEPOSIT,
              to: `/build-order/state/${OrderState.ADDED_PROOF_OF_PAYMENT_DEPOSIT}`,
            },
            {
              title: BuildOrderStateName.APPROVED_PROOF_OF_PAYMENT_DEPOSIT,
              to: `/build-order/state/${OrderState.APPROVED_PROOF_OF_PAYMENT_DEPOSIT}`,
            },
            {
              title: BuildOrderStateName.BUILT_COMPLETE,
              to: `/build-order/state/${OrderState.BUILT_COMPLETE}`,
            },
            {
              title: BuildOrderStateName.ADDED_PROOF_OF_PAYMENT_FULL,
              to: `/build-order/state/${OrderState.ADDED_PROOF_OF_PAYMENT_FULL}`,
            },
            {
              title: BuildOrderStateName.APPROVED_PROOF_OF_PAYMENT_FULL,
              to: `/build-order/state/${OrderState.APPROVED_PROOF_OF_PAYMENT_FULL}`,
            },
            {
              title: BuildOrderStateName.SENT,
              to: `/build-order/state/${OrderState.SENT}`,
            },
            {
              title: BuildOrderStateName.RECEIVED,
              to: `/build-order/state/${OrderState.RECEIVED}`,
            },
            {
              title: BuildOrderStateName.CANCELLED,
              to: `/build-order/state/${OrderState.CANCELLED}`,
            },
            {
              title: BuildOrderStateName.IS_UNABLE_TO_BUILT,
              to: `/build-order/state/${OrderState.IS_UNABLE_TO_BUILT}`,
            },
          ],
        },
        {
          icon: 'mdi-account',
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

<style lang="scss" scoped>
.no-scroll {
  ::v-deep .v-navigation-drawer__content {
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
