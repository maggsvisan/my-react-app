import { decorate, observable, action } from 'mobx';

const Days = [
  { name: "Monday", key: 0 },
  { name: "Tuesday", key: 1 },
  { name: "Wednesday", key: 2 },
  { name: "Thursday", key: 3 },
  { name: "Friday", key: 4 },
  { name: "Saturday", key: 5 },
  { name: "Sunday", key: 6 }
]

class _ScheduleStore {
  days = [];

  constructor() {
    this.days = Days.map(({name, key}) => ({
      key, 
      name,
      schedules: [{
        video: 'video1',
        start: 0,
        end: 0
      }],
    }))
  }

  addScheduleForDay(index) {
    const days = [...this.days[index].schedules];

    this.days[index].schedules = [...days, {
      video: 'video1',
      start: 0,
      end: 0
    }];
  }

  removeScheduleForDay(index) {
    const days = [...this.days[index].schedules];
    
    days.splice(-1, 1);

    this.days[index].schedules = days;
  }

  updateSchedule(dayIndex, scheduleIndex, newSchedule) {
    const day = this.days[dayIndex];
    const schedules = [...day.schedules];
    // Update old schedule 
    schedules[scheduleIndex] = newSchedule;

    this.days[dayIndex].schedules = schedules;
  }

  sendToDb() {
    console.log(this.days)
  }
}

const ScheduleStore = decorate(_ScheduleStore, {
  days: observable,
  addScheduleForDay: action("Add schedule"),
  removeScheduleForDay: action("Remove schedule"),
  updateSchedule: action("Schedule update"),
  sendToDb: action("Send schedules to Database")
});

export default new ScheduleStore();