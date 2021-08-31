<template>
  <div class="tabs">
    <ul class="tabs__navigation">
      <li
        class="tabs__navigation-item"
        v-for="(tab, index) in tabs"
        :key="index"
      >
        <a
          @click.prevent="changeTab(tab)"
          href="#"
          class="tabs__navigation-link"
          :class="{ 'tabs__navigation-link--active': tab.isActive }"
        >
          {{ tab.name }}
        </a>
      </li>
    </ul>

    <slot name="headerTabs"></slot>

    <div class="tabs__layout">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  data: () => ({
    tabs: [],
  }),
  created() {
    this.tabs = this.$children;
  },
  methods: {
    changeTab(tab) {
      this.tabs.forEach((item) => item.isActive = item.name === tab.name);
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  &__navigation {
    display: flex;
    justify-content: center;
    list-style: none;
    margin: 0 0 40px;
    padding: 0;

    &-link {
      display: inline-block;
      position: relative;
      padding: 15px 30px;
      text-transform: uppercase;
      text-align: center;
      font-size: 16px;
      text-decoration: none;
      color: $base;
      transition: background-color 0.3s linear, color 0.3s linear;

      @media #{$mobileBreakpoint} {
        font-size: 14px;
      }

      &::after {
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        border-bottom: 3px solid transparent;
        transition: border-bottom-color 0.3s linear;
      }

      &:hover {
        color: $primary;
      }

      &--active {
        pointer-events: none;
        background-color: rgba($black, 0.05);

        &::after {
          border-bottom-color: $primary;
        }
      }
    }
  }

  &__layout {
    width: 100%;
  }
}
</style>
