export interface UpdatedCourseModel {
    id: number,
    courseId: number,
    course: {
        id: number
    },
    courseTypeId: number,
    courseType?: {
        id: number
    }
}