<template>
  <div class="popup-with-criteria bg-white vw-100 vh-100 position-fixed top-0 start-0 py-4 px-5">
    <div class="d-flex justify-content-between align-items-center">
      <h2>Параметры поиска</h2>
      <button
        @click="$emit('showSearch')"
        class="btn btn-primary fs-5"
      >
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="mt-4 search-parameters__body">
      <v-select
        v-model="generalSelectValue"
        :options="['Преподаватель', 'Группа', 'Аудитория']"
        :clearable="false"
      />
      <template v-if="generalSelectValue === 'Преподаватель'">
        <v-select
          placeholder="Факультет"
          :options="['ФАИ', 'ФТФ', '...']"
          :clearable="false"
        />
        <v-select
          placeholder="Кафедра"
          :options="['ФАИ', 'ФТФ', '...']"
          :clearable="false"
        />
        <v-select
          placeholder="ФИО"
          :options="['ФАИ', 'ФТФ', '...']"
          :clearable="false"
          multiple
        />
      </template>
      <template v-else-if="generalSelectValue === 'Группа'">
        <v-select
          placeholder="Факультет"
          :options="['ФАИ', 'ФТФ', '...']"
          :clearable="false"
        />
        <v-select
          placeholder="Кафедра"
          :options="['ФАИ', 'ФТФ', '...']"
          :clearable="false"
        />
        <v-select
          placeholder="Группа"
          :options="['ФАИ', 'ФТФ', '...']"
          :clearable="false"
          multiple
        />
      </template>
      <template v-else-if="generalSelectValue === 'Аудитория'">
        <v-select
          placeholder="Факультет"
          :options="['ФАИ', 'ФТФ', '...']"
          :clearable="false"
        />
        <v-select
          placeholder="Кафедра"
          :options="['ФАИ', 'ФТФ', '...']"
          :clearable="false"
        />
        <v-select
          placeholder="Тип аудитории"
          :options="['ФАИ', 'ФТФ', '...']"
          :clearable="false"
        />
        <v-select
          placeholder="Оборудование и ПО"
          :options="['ФАИ', 'ФТФ', '...']"
          :clearable="false"
          multiple
        />
      </template>
    </div>
    <div class="search-parameters__footer d-flex align-items-end">
      <button class="btn btn-primary" type="button">Поиск</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupWithCriteria',
  data() {
    return {
      generalSelectValue: 'Преподаватель',
    };
  },
};
</script>

<style lang="scss" scoped>
.popup-with-criteria {
  z-index: 2;
}

.search-parameters__body {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 40px;
}
.search-parameters__footer {
  position: absolute;
  bottom: 80px;
}
</style>
