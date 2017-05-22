import {Course} from "./course.model";
import {Lecturer} from "./lecturer.model";
export interface EventObject {
  id: number,
  name: string,
  date: string,
  eventStatus: number,
  cycleIntervalWeekNumber: number,
  isCyclical: boolean,
  isRestricted: boolean,
  courseUnitId: number,
  courseUnit?: Course,
  lecturerId: number,
  lecturer?: Lecturer,
  roomId: number,
  room?: {
    id: number,
    name: string,
    building: string
  },
  timeSlotId: number,
  timeSlot: {
    id: number,
    dayOfWeek: string,
    beginTime: string,
    endTime: string
  }
}
