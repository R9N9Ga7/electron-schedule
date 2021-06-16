<template>
  <div>
    <div class="my-5 mx-auto" style="max-width: 700px;">
      <table v-if="supplementedSchedule.length" class="w-100 border-bottom border-dark">
        <thead>
          <tr>
            <td
              class="border border-dark"
              style="border-right: none!important;"
            >День недели</td>
            <td>
              <tr>
                <td class="border border-dark border-bottom-none">Время</td>
                <td class="border border-dark border-bottom-none">
                  <span
                    v-for="(groupItem, index) in group"
                    :key="`group-item-key${index}`"
                  > {{ groupItem.NAME }}</span>
                </td>
                <td class="border border-dark border-bottom-none"></td>
              </tr>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(day, index) in supplementedSchedule"
            :key="`day-key-${index}`"
          >
            <td
              class="border border-dark"
              style="border-right: none!important;"
            >{{ day.weekDay.value }}</td>
            <td>
              <tr
                v-for="(lesson, index) in day.Schedule"
                :key="`lesson-key-${index}`"
                @click="onEdit(lesson)"
                @contextmenu.prevent="onOpenContextMenu($event, lesson)"
              >
                <template v-if="lesson.timeTable.weekColor.value === 'Всегда'">
                  <td class="border border-dark border-bottom-none bg-warning">{{ lesson.timeTable.classTime.value }}</td>
                  <td class="border border-dark border-bottom-none bg-warning">
                    <p>{{ lesson.discipline.value }}</p>
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
      <table v-else class="w-100 border-bottom border-dark">
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
      :lesson="lesson"
      :color="color"
      :day="day"
      :time="time"
      :groups_id="group"
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
      type: Array,
      required: true,
    },
    group: {
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
      lesson: {},
      color: {},
      day: {},
      time: {},
      days: [],
      supplementedSchedule: [],
    };
  },
  methods: {
    async getSupplementedSchedule() {
      await this.scheduleGetDays(this.group[0].ID);
      const copySchedule = JSON.parse(JSON.stringify(this.schedule));
      let index = 0;
      for (const item of this.days) {
        const findedIndex = copySchedule.findIndex((el) => el.weekDay.value === item.NAME);
        if (findedIndex === -1) {
          copySchedule.splice(index, 0, {
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
    onEdit(lesson) {
      console.log('lesson: ', lesson);
      this.$router.push({
        query:{
          edit: true,
          lesson: JSON.stringify(lesson),
          groups_id: JSON.stringify(this.group),
        },
      });
    },
    onAdd(day) {
      console.log(day);
      this.$router.push({
        query:{
          add: true,
          day: JSON.stringify(day),
          groups_id: JSON.stringify(this.group),
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
      this.lesson = lesson;
      this.showContextMenu = true;
    },
  },
  async mounted() {
    await this.getSupplementedSchedule();
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
