<template>
  <div>
    <DataTemplate
      title="ТОАУ"
      placeholder="Список дисциплин"
      :items="['ТОАУ', 'Базы данных']"
    >
      <template v-slot:right>
        <div class="d-flex">
          <div>
            <span>Название</span>
            <input
              placeholder="ТОАУ"
              type="text"
              class="form-control"
            >
          </div>
          <div class="ms-4">
            <span>Факультет</span>
            <v-select
              placeholder="ФАИ"
              :options="['ФАИ', 'ФТФ', '...']"
              :clearable="false"
            />
          </div>
          <div class="mx-4">
            <span>Кафедра</span>
            <v-select
              placeholder="АСУ"
              :options="['АСУ', 'ФТФ', '...']"
              :clearable="false"
            />
          </div>
          <div class="ms-4">
            <span>Лекции</span>
            <div
              class="d-flex justify-content-center align-items-center"
              style="height: 38px;"
            >
              <input
                class="form-check-input d-block"
                type="checkbox"
              >
            </div>
          </div>
          <div class="ms-4">
            <span>Практики</span>
            <div
              class="d-flex justify-content-center align-items-center"
              style="height: 38px;"
            >
              <input
                class="form-check-input d-block"
                type="checkbox"
              >
            </div>
          </div>
          <div class="ms-4">
            <span>Лабораторные</span>
            <div
              class="d-flex justify-content-center align-items-center"
              style="height: 38px;"
            >
              <input
                class="form-check-input d-block"
                type="checkbox"
              >
            </div>
          </div>
        </div>
        <hr>
        <h1 class="fw-normal">Практики</h1>
        <div class="d-flex">
          <div>
            <span>Требования к аудитории</span>
            <v-select
              placeholder="Компьютеры"
              :options="['Visual Studio', 'Node Js', '...']"
              :clearable="false"
            />
          </div>
          <div class="ms-4">
            <span>Преподаватели</span>
            <v-select
              placeholder="Иванов А.А."
              :options="['Иванов А.А.', 'Петров И.Ф.', 'Сергей', '...']"
              :clearable="false"
            />
          </div>
        </div>
        <hr>
        <h1 class="fw-normal">Лабораторные</h1>
        <div class="d-flex">
          <div>
            <span>Требования к аудитории</span>
            <v-select
              placeholder="Компьютеры"
              :options="['Visual Studio', 'Node Js', '...']"
              :clearable="false"
            />
          </div>
          <div class="ms-4">
            <span>Преподаватели</span>
            <v-select
              placeholder="Иванов А.А."
              :options="['Иванов А.А.', 'Петров И.Ф.', 'Сергей', '...']"
              :clearable="false"
            />
          </div>
        </div>
        <div class="btn-group mt-3">
          <button type="button" class="btn btn-primary">Сохранить</button>
          <button type="button" class="btn btn-danger">Удалить</button>
        </div>
      </template>
    </DataTemplate>
  </div>
</template>

<script>
import DataTemplate from '../../components/data_template/DataTemplate.vue';

export default {
  name: 'DisciplinesPage',
  components: {
    DataTemplate,
  },
};
</script>
