<template>
  <div class="trow">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TableRow',
};
</script>

<style lang="scss" scoped>
.trow {
  display: grid;
  grid-template-columns: 1fr 15fr 1fr;
  width: 500px;
}
</style>
