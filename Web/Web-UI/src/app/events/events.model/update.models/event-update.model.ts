import {UpdatedCourseModel} from './course-update.model';
import {UpdatedLecturerModel} from './lecturer-update.model';

export interface UpdatedEventModel {
  id: number,
  name: string,
  date: string,
  eventStatus: number,
  cycleIntervalWeekNumber: number,
  isCyclical: boolean,
  isRestricted: boolean,
  courseUnitId: number,
  courseUnit?: UpdatedCourseModel,
  lecturerId: number,
  lecturer?: UpdatedLecturerModel,
  roomId: number,
  room?: {
    id: number,
  },
  timeSlotId: number,
  timeSlot: {
    id: number,
    dayOfWeek: string,
    beginTime: string,
    endTime: string
  }
}