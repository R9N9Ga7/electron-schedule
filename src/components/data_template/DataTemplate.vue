<template>
  <div class="d-flex" style="height: 85vh;">
    <div class="border-end border-secondary px-3">
      <div>
        <input
          :placeholder="placeholder"
          type="text"
          class="form-control"
        >
      </div>
      <div class="shadow-sm rounded mt-3">
        <ul>
          <li
            v-for="(item, index) in items"
            :key="item"
            class="py-1 px-3 m-1 rounded"
            :class="{ 'bg-light': index === 0 }"
          >{{ item }}</li>
        </ul>
      </div>
    </div>
    <div class="px-5">
      <h1 class="fw-normal">{{ title }}</h1>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataTemplate',
  props: {
    title: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;
}
</style>
