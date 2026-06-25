export type LessonSummary = {
    id: number;
    description: string;
    duration: string;
    seqNo: number;
    courseId: number;
}

export type LessonsResponse = {
    payload: LessonSummary[];
}
