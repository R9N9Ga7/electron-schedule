<template>
  <header
    class="d-flex justify-content-center align-items-center"
    style="height: 100px;"
  >
    <h1 class="fw-normal">{{ $route.meta.header || '' }}</h1>
  </header>
</template>

<script>
export default {
  name: 'MainHeader',
};
</script>
