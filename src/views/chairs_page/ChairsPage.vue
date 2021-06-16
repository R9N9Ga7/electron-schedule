<template>
  <div>
    <DataTemplate
      title="АСУ"
      placeholder="Список кафедр"
      :items="['АСУ', 'ФТФ']"
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
          <div class="mx-4">
            <span>Факультет</span>
            <v-select
              placeholder="ФАИ"
              :options="['ФАИ', 'ФТФ', '...']"
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
  name: 'ChairsPage',
  components: {
    DataTemplate,
  },
};
</script>
