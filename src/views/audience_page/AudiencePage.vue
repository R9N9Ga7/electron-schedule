<template>
  <div>
    <DataTemplate
      title="356"
      placeholder="Список аудиторий"
      :items="['356', '357']"
    >
      <template v-slot:right>
        <div class="d-flex">
          <div>
            <span>Название</span>
            <input
              placeholder="ФАИ"
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
          <div>
            <span>Местоположение</span>
            <input
              placeholder="2 корпус"
              type="text"
              class="form-control"
            >
          </div>
        </div>
        <div class="d-flex my-3">
          <div>
            <span>Оборудование и ПО</span>
            <v-select
              placeholder="Компьютеры"
              :options="['Visual Studio', 'Node Js', '...']"
              :clearable="false"
            />
          </div>
          <div class="ms-4">
            <span>Тип аудитории</span>
            <v-select
              placeholder="Лекционная"
              :options="['Лекционная', 'Лабораторная', 'Практическая', '...']"
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
  name: 'AudiencePage',
  components: {
    DataTemplate,
  },
};
</script>
