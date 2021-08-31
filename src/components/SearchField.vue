<template>
  <div class="search-field">
    <input
      type="text"
      class="search-field__input"
      :class="{ 'search-field__input--has-error': error }"
      v-model="field"
      :name="name"
      :placeholder="placeholder"
      :disabled="isDisabled"
      @keyup="searchRequest"
    />

    <button
      type="button"
      class="search-field__button"
      @click.prevent="searchRequest"
    >
      <SvgIcon name="search" />
    </button>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import SvgIcon from '@/components/SvgIcon.vue';

const MIN_SEARCH_LENGTH = 2;

const isValidSearchText = (text) => {
  return text.length >= MIN_SEARCH_LENGTH;
};

export default {
  name: 'SearchField',
  components: {
    SvgIcon,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    minSearchLength: {
      type: Number,
      default: MIN_SEARCH_LENGTH,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    field: '',
  }),
  watch: {
    value(val) {
      this.field = val;
    },
  },
  methods: {
    searchRequest: debounce(function () {
      if (!isValidSearchText(this.field)) {
        return;
      }

      this.$emit('onChange', this.field);
    }, 1000),
  },
};
</script>

<style lang="scss" scoped>
.search-field {
  position: relative;

  &__input {
    font: {
      family: $fontBase;
      size: 1rem;
    }
    background-color: $white;
    color: $base;
    border-radius: 4px;
    border: 1px solid transparent;
    width: 100%;
    height: 48px;
    box-shadow: 0 3px 1px -2px rgb($black, 0.2), 0 2px 2px 0 rgb($black, 0.14),
      0 1px 5px 0 rgb($black, 0.12);
    padding: 0 50px 0 15px;
    transition: box-shadow 0.3s ease-in, border-color 0.3s ease-in;

    &:focus {
      outline: none;
      box-shadow: 0 3px 1px -2px rgb($primary, 0.2),
        0 2px 2px 0 rgb($primary, 0.14), 0 1px 5px 0 rgb($primary, 0.12);
    }

    &--has-error,
    &--has-error:focus {
      border-color: $error;
      box-shadow: 0 3px 1px -2px rgb($error, 0.2), 0 2px 2px 0 rgb($error, 0.14),
        0 1px 5px 0 rgb($error, 0.12);
    }
  }

  &__button {
    background: none;
    color: $base;
    border: none;
    outline: none;
    position: absolute;
    top: 0;
    right: 0;
    width: 48px;
    height: 48px;
    margin: 0;
    padding: 0;
    cursor: pointer;

    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 18px;
      height: 18px;
      transform: translate(-50%, -50%);
    }

    &:hover {
      color: $primary;
    }
  }
}
</style>
