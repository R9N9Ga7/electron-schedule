<template>
  <div>
    <div class="my-5 mx-auto" style="max-width: 700px;">
      <div>
        <span
          v-for="(tab, index) in schedules"
          :key="`tabs-key-${index}`"
          class="mx-1"
        >
          <button
            class="btn rounded-pill btn-info"
            @click="$emit('selected', index)"
          >{{ tab.targetName }}</button>
        </span>
      </div>
      <table v-if="schedule.scheduleDays" class="w-100 border-bottom border-dark mt-3">
        <thead>
          <tr>
            <td
              class="border border-dark"
              style="border-right: none!important;"
            >День недели</td>
            <td>
              <tr>
                <td class="border border-dark border-bottom-none">Время</td>
                <td class="border border-dark border-bottom-none">{{ schedule.targetName }}</td>
                <td class="border border-dark border-bottom-none"></td>
              </tr>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(day, index) in supplementedSchedule.scheduleDays"
            :key="`day-key-${index}`"
          >
            <td
              class="border border-dark"
              style="border-right: none!important;"
            >{{ day.weekDay.value }}</td>
            <td>
              <tr
                v-for="(lesson, lessonIndex) in day.Schedule"
                :key="`lesson-key-${lessonIndex}`"
                @click="onEdit(lesson)"
                @contextmenu.prevent="onOpenContextMenu($event, lesson)"
              >
                <template v-if="lesson.timeTable.weekColor.value === 'Всегда'">
                  <td class="border border-dark border-bottom-none bg-warning">{{ lesson.timeTable.classTime.value }}</td>
                  <td class="border border-dark border-bottom-none bg-warning">
                    <p>{{ lesson.discipline.value }}</p>
                    <p>{{ lesson.group.name }}</p>
                    <p>{{ lesson.group.setGroupValue }}</p>
                    <p>{{ lesson.teacher.name }}</p>
                  </td>
                  <td class="border border-dark border-bottom-none bg-warning">
                    <p>{{ lesson.auditory.value }}</p>
                    <p>{{ lesson.timeTable.lessonType.value }}</p>
                  </td>
                </template>
                <template v-if="lesson.timeTable.weekColor.value === 'Белая'">
                  <td class="border border-dark border-bottom-none">{{ lesson.timeTable.classTime.value }}</td>
                  <td class="border border-dark border-bottom-none">
                    <p>{{ lesson.discipline.value }}</p>
                    <p>{{ lesson.group.name }}</p>
                    <p>{{ lesson.group.setGroupValue }}</p>
                    <p>{{ lesson.teacher.name }}</p>
                  </td>
                  <td class="border border-dark border-bottom-none">
                    <p>{{ lesson.auditory.value }}</p>
                    <p>{{ lesson.timeTable.lessonType.value }}</p>
                  </td>
                </template>
                <template v-if="lesson.timeTable.weekColor.value === 'Зеленая'">
                  <td class="border border-dark border-bottom-none bg-teal">{{ lesson.timeTable.classTime.value }}</td>
                  <td class="border border-dark border-bottom-none bg-teal">
                    <p>{{ lesson.discipline.value }}</p>
                    <p>{{ lesson.group.name }}</p>
                    <p>{{ lesson.group.setGroupValue }}</p>
                    <p>{{ lesson.teacher.name }}</p>
                  </td>
                  <td class="border border-dark border-bottom-none bg-teal">
                    <p>{{ lesson.auditory.value }}</p>
                    <p>{{ lesson.timeTable.lessonType.value }}</p>
                  </td>
                </template>
              </tr>
              <tr
                class="border border-dark border-bottom-none"
                @click="onAdd(day)"
              >
                <td></td>
                <td class="py-3 fs-4 text-primary rotate-anim">
                  <i class="fas fa-plus-circle"></i>
                </td>
                <td></td>
              </tr>
            </td>
          </tr>
        </tbody>
      </table>
      <table v-else class="w-100 border-bottom border-dark mt-3">
        <thead v-if="schedule.scheduleDays === null">
          <tr>
            <td
              class="border border-dark"
              style="border-right: none!important;"
            >День недели</td>
            <td>
              <tr>
                <td class="border border-dark border-bottom-none">Время</td>
                <td class="border border-dark border-bottom-none">{{ schedule.targetName }}</td>
                <td class="border border-dark border-bottom-none"></td>
              </tr>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(day, index) in days"
            :key="`day-key-${index}`"
          >
            <td
              class="border border-dark"
              style="border-right: none!important;"
            >{{ day.NAME }}</td>
            <td>
              <tr
                class="border border-dark border-bottom-none"
                @click="onAddEmpty(day, schedule.targetId)"
              >
                <td></td>
                <td class="py-3 fs-4 text-primary rotate-anim">
                  <i class="fas fa-plus-circle"></i>
                </td>
                <td></td>
              </tr>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ScheduleContextMenu
      v-if="showContextMenu"
      :posX="contextMenuPosX"
      :posY="contextMenuPosY"
      :lessonId="lessonId"
      :color="color"
      :day="day"
      :time="time"
      :group_id="group_id"
      :lesson="lesson"
      @close="showContextMenu = false"
    />
  </div>
</template>

<script>
import ScheduleContextMenu from './ScheduleContextMenu.vue';
import { getDays } from '../services/schedule.service';

export default {
  name: 'ScheduleTable',
  props: {
    schedule: {
      type: Object,
      required: true,
    },
    schedules: {
      type: Array,
      required: true,
    },
  },
  components: {
    ScheduleContextMenu,
  },
  data() {
    return {
      showContextMenu: false,
      contextMenuPosX: -200,
      contextMenuPosY: -200,
      lessonId: '',
      color: {},
      day: {},
      time: {},
      days: [],
      group_id: '',
      supplementedSchedule: {},
      lesson: {},
    };
  },
  watch: {
    async schedule() {
      await this.scheduleGetDays(this.schedule.targetId);
      console.log('this.schedule: ', this.schedule);
      const copySchedule = JSON.parse(JSON.stringify(this.schedule));
      let index = 0;
      for (const item of this.days) {
        const findedIndex = copySchedule.scheduleDays.findIndex((el) => el.weekDay.value === item.NAME);
        if (findedIndex === -1) {
          copySchedule.scheduleDays.splice(index, 0, {
            weekDay: {
              id: this.days[index].ID,
              value: this.days[index].NAME,
            },
            Schedule: [],
          });
        }
        index += 1;
      }
      console.log('copySchedule: ', copySchedule);
      this.supplementedSchedule = copySchedule;
    },
  },
  methods: {
    onEdit(lesson) {
      console.log('lesson: ', lesson);
      this.$router.push({
        query:{
          edit: true,
          lesson_id: lesson.timeTable.OID,
          discipline_id: lesson.discipline.id,
          discipline_value: lesson.discipline.value,
          teacher_id: lesson.teacher.id,
          teacher_value: lesson.teacher.name,
          auditory_value: lesson.auditory.value,
          lesson_type_id: lesson.timeTable.lessonType.id,
          lesson_type_value: lesson.timeTable.lessonType.value,
          stream_value: lesson.group.setGroupValue,
          group_id: lesson.group.id,
          group_value: lesson.group.name,
          groups_id_for_recieve: JSON.stringify(this.schedules.map((el) => el.targetId)),
        },
      });
    },
    onAdd(day) {
      console.log(day);
      this.$router.push({
        query:{
          add: true,
          group_id: this.schedule.targetId,
          week_day_id: day.weekDay.id,
          week_day_value: day.weekDay.value,
          groups_id_for_recieve: JSON.stringify(this.schedules.map((el) => el.targetId)),
        },
      });
    },
    onAddEmpty(day, group_id) {
      console.log(day, group_id);
      this.$router.push({
        query:{
          add: true,
          group_id,
          week_day_id: day.ID,
          week_day_value: day.NAME,
          groups_id_for_recieve: JSON.stringify(this.schedules.map((el) => el.targetId)),
        },
      });
    },
    async scheduleGetDays(group_id) {
      const days = await getDays(group_id);
      this.days = days.message;
    },
    onOpenContextMenu(event, lesson) {
      console.log(lesson);
      this.contextMenuPosX = event.clientX;
      this.contextMenuPosY = event.clientY;
      this.lessonId = lesson.timeTable.OID;
      this.color = lesson.timeTable.weekColor;
      this.day = lesson.timeTable.weekDay;
      this.time = lesson.timeTable.classTime;
      this.group_id = lesson.group.id;
      this.lesson = lesson;
      this.showContextMenu = true;
      this.$router.push({ query: { groups_id_for_recieve: JSON.stringify(this.schedules.map((el) => el.targetId)), } });
    },
  },
  async created() {
    console.log('===========>', this.schedule);
    await this.scheduleGetDays(this.schedule.targetId);
      console.log('this.schedule: ', this.schedule);
      const copySchedule = JSON.parse(JSON.stringify(this.schedule));
      let index = 0;
      for (const item of this.days) {
        const findedIndex = copySchedule.scheduleDays.findIndex((el) => el.weekDay.value === item.NAME);
        if (findedIndex === -1) {
          copySchedule.scheduleDays.splice(index, 0, {
            weekDay: {
              id: this.days[index].ID,
              value: this.days[index].NAME,
            },
            Schedule: [],
          });
        }
        index += 1;
      }
      console.log('copySchedule: ', copySchedule);
      this.supplementedSchedule = copySchedule;
  },
};
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  border-spacing: 0;
}


td {
  padding: 0;
  text-align: center;
  p {
    margin: 5px 0;
  }
}

thead {
  tr {
    td {
      height: 60px;
    }
  }
}

tbody {
  tr {
    td {
      tr {
        cursor: pointer;
      }
    }
  }
}

tr {
  td {
    &:nth-child(1) {
      width: 60px;
    }
    &:nth-child(2) {
      width: 520px;
    }
    &:nth-child(3) {
      width: 55px;
    }
  }
}

.border-bottom-none {
  border-bottom: none!important;
}

.bg-teal {
  background-color: var(--bs-teal);
}

.rotate-anim {
  i {
    transition: transform .3s;
  }
  &:hover {
    i {
      transform: rotate(90deg);
    }
  }
}
</style>
