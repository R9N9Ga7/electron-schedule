<template>
  <div class="d-flex justify-content-between align-items-center px-5">
    <ToolBreadcrumb/>
    <ToolBtnFilter @click.native="$emit('showSearch')"/>
  </div>
</template>

<script>
import ToolBreadcrumb from './components/ToolBreadcrumb.vue';
import ToolBtnFilter from './components/ToolBtnFilter.vue';

export default {
  name: 'ScheduleTools',
  components: {
    ToolBreadcrumb,
    ToolBtnFilter,
  },
};
</script>
