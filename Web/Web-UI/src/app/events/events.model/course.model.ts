/**
 * Created by Krzysztof Adamczak on 22.05.2017.
 */
export interface Course {
  id: number,
  courseId: number,
  course: {
    id: number,
    courseName: string,
    ects: number
  },
  courseTypeId: number,
  courseType?: {
    id: number,
    type: number,
    hoursNumber: number
  }
}
