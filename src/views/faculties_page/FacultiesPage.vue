<template>
  <div>
    <DataTemplate
      title="ФАИ"
      placeholder="Список факультетов"
      :items="['ФАИ', 'ФТФ']"
    >
      <template v-slot:right>
        <span>Название</span>
        <input
          placeholder="ФАИ"
          type="text"
          class="form-control"
        >
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
  name: 'FacultiesPage',
  components: {
    DataTemplate,
  },
};
</script>
