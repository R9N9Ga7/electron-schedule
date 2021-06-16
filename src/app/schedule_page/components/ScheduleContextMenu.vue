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
import { mapState, mapActions } from 'vuex';
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
    lessonId: {
      type: String,
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
    group_id: {
      type: String,
      required: true,
    },
    lesson: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState({
      type: (state) => state.schedule.type,
    }),
    calcPositionStyle() {
      return `top: ${this.posY}px; left: ${this.posX}px;`;
    },
  },
  methods: {
    ...mapActions({
      receiveSchedules: 'schedule/receiveSchedules',
    }),
    onClickMove() {
      this.$router.push({
        query: {
          move: true,
          lesson_id: this.lessonId,
          color_id: this.color.id,
          color_value: this.color.value,
          day_id: this.day.id,
          day_value: this.day.value,
          time_id: this.time.id,
          time_value: this.time.value,
          group_id: this.group_id,
          groups_id_for_recieve: this.$route.query.groups_id_for_recieve,
        }
      });
    },
    closeContextMenu() {
      // this.$router.push({ query: {} });
      // setTimeout(() => {
        this.$emit('close');
      // }, 100);
    },
    async onClickRemove() {
      await postRemoveLesson(this.lessonId);
      if (this.type === 'Группа') {
        await this.receiveSchedules({
          group: JSON.parse(this.$route.query.groups_id_for_recieve),
          target: 'group',
        });
      }
      if (this.type === 'Преподаватель') {
        await this.receiveSchedules({
          group: JSON.parse(this.$route.query.groups_id_for_recieve),
          target: 'teacher',
        });
      }
      if (this.type === 'Аудитория') {
        await this.receiveSchedules({
          group: JSON.parse(this.$route.query.groups_id_for_recieve),
          target: 'auditory',
        });
      }
      this.$emit('close');
    },
  },
  created() {
    console.log(this.group_id);
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
