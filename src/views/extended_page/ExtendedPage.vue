<template>
  <div class="px-5">
    <div class="d-flex justify-content-between">
      <ExtendedParameters/>
      <ExtendedActionsStack/>
    </div>
    <div class="d-flex align-items-center mt-4">
      <button class="btn btn-primary">Выполнить</button>
      <div class="ms-4 form-check form-switch">
        <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked>
        <label class="form-check-label" for="flexSwitchCheckChecked">Безопасный режим</label>
      </div>
    </div>
  </div>
</template>

<script>
import ExtendedParameters from '../../components/extended_parameters/ExtendedParameters.vue';
import ExtendedActionsStack from '../../components/extended_actions_stack/ExtendedActionsStack.vue';

export default {
  name: 'ExtendedPage',
  components: {
    ExtendedParameters,
    ExtendedActionsStack,
  },
};
</script>
