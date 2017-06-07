import {Course} from "./course.model";
import {Lecturer} from "./lecturer.model";
import {TimeSlot} from "./time-slot.model";
import {Room} from "./room.model";

export interface EventObject {
  id: number,
  name: string,
  date: string,
  eventStatus: number,
  cycleIntervalWeekNumber: number,
  isCyclical: boolean,
  isRestricted: boolean,
  courseUnitId?: number,
  courseUnit?: Course,
  lecturerId: number,
  lecturer?: Lecturer,
  roomId: number,
  room?: Room,
  timeSlotId: number,
  timeSlot: TimeSlot
}
