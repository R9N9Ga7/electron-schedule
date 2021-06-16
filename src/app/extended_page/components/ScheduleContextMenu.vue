<template>
  <div
    :style="calcPositionStyle"
    class="context-menu bg-white rounded shadow"
  >
    <ul class="m-0 p-0">
      <li @click="onClickMove" class="p-1">
        <i class="fas fa-arrows-alt fs-6"></i>
        <span class="ms-2">Переместить</span>
      </li>
      <li @click="onClickRemove" class="p-1 text-danger">
        <i class="far fa-trash-alt fs-6"></i>
        <span class="ms-2"> Удалить</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import postRemoveLesson from '../services/remove_lesson.service';

export default {
  name: 'ScheduleContextMenu',
  props: {
    posX: {
      type: Number,
      default: -200,
    },
    posY: {
      type: Number,
      default: -200,
    },
    groups_id: {
      type: Array,
      required: true,
    },
    lesson: {
      type: Object,
      required: true,
    },
    color: {
      type: Object,
      required: true,
    },
    day: {
      type: Object,
      required: true,
    },
    time: {
      type: Object,
      required: true,
    },
  },
  computed: {
    calcPositionStyle() {
      return `top: ${this.posY}px; left: ${this.posX}px;`;
    },
  },
  methods: {
    ...mapActions({
      recieveSchedule: 'extended/recieveSchedule',
    }),
    onClickMove() {
      this.$router.push({
        query: {
          move: true,
          lesson: JSON.stringify(this.lesson),
          groups_id: JSON.stringify(this.groups_id),
        }
      });
    },
    closeContextMenu() {
      this.$emit('close')
    },
    onClickRemove() {
      postRemoveLesson(this.lesson.timeTable.OID, this.groups_id.map((el) => el.ID));
      this.recieveSchedule(this.groups_id.map((el) => el.ID));
    },
  },
  created() {
    document.addEventListener('click', this.closeContextMenu);
    document.addEventListener('scroll', this.closeContextMenu);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeContextMenu);
    document.removeEventListener('scroll', this.closeContextMenu);
  },
};
</script>

<style lang="scss" scoped>
.context-menu {
  position: fixed;
  width: 160px;
  ul {
    list-style: none;
    li {
      cursor: pointer;
      &:hover {
        background-color: rgba(33, 33, 33, .1);
      }
    }
  }
}
</style>
