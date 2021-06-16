<template>
  <div class="tcell text-center border border-dark">
    <slot></slot>
    <div v-if="$slots.white">
      <slot name="white"></slot>
    </div>
    <div
      v-if="$slots.green"
      style="background-color: var(--bs-teal);"
      class="w-100 h-100 d-flex align-items-center justify-content-center"
      :class="{ 'border-top border-dark': $slots.white }"
    >
      <slot name="green"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableCell',
};
</script>

<style lang="scss" scoped>
.tcell {
  display: grid;
  align-items: center;
  justify-items: center;
  min-height: 60px;
  background-color: #fff;
  max-width: 100%!important;
  &:first-child {
    width: 90px!important;
  }
  &:last-child {
    width: 90px!important;
  }
}
</style>
