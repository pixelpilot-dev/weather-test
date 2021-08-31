<template>
  <div class="tabs__body" v-show="isActive">
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'Tab',
  props: {
    name: {
      type: String,
      required: true
    },
		selected: {
      type: Boolean,
      default: false
    },
  },
  data: () => ({
    isActive: false,
  }),
  mounted(){
		this.isActive = this.selected;
	},
};
</script>
