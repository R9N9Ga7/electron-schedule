<template>
  <div
    class="d-flex align-items-center justify-content-center"
    style="height: 60vh;"
  >
    <div class="mt-5 btn-group-vertical">
      <div class="btn-group">
        <router-link
          :to="{ name: 'faculty' }"
          type="button"
          class="btn btn-outline-primary"
        >Факультеты</router-link>
        <router-link
          :to="{ name: 'department' }"
          type="button"
          class="btn btn-outline-primary"
        >Кафедры</router-link>
        <router-link
          :to="{ name: 'auditory' }"
          type="button"
          class="btn btn-outline-primary"
        >Аудитории</router-link>
      </div>
      <div class="btn-group">
        <router-link
          :to="{ name: 'discipline' }"
          type="button"
          class="btn btn-outline-primary"
        >Дисциплины</router-link>
        <router-link
          :to="{ name: 'teacher' }"
          type="button"
          class="btn btn-outline-primary"
        >Преподаватели</router-link>
        <router-link
          :to="{ name: 'group' }"
          type="button"
          class="btn btn-outline-primary"
        >Группы</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataPage',
};
</script>

<style lang="scss" scoped>
.btn {
  width: 250px;
  font-size: 28px;
}
</style>
