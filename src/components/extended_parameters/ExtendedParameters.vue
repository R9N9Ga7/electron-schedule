<template>
  <div class="extended-parameters border border-info">
    <div class="bg-primary p-3 text-light fs-5 text-center">
      <span>Параметры</span>
    </div>
    <div class="h-100">
      <ul class="overflow-auto">
        <li>
          <button>
            <i class="fas fa-plus-circle text-muted"></i>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExtendedParameters',
};
</script>

<style lang="scss" scoped>
.extended-parameters {
  width: 45%;
  height: 70vh;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    height: 50px;
    transition: background-color .2s;
    &:hover {
      background-color: rgba(33, 33, 33, .05);
    }
    button {
      display: block;
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      background-color: inherit;
      i {
        font-size: 2rem;
      }
    }
  }
}
</style>
