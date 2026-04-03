import type { ICourse, ICourseDetail } from "@/types/course.type";
import { create } from "zustand";

type CourseState = {
  courses: ICourse[];
  currentCourse: ICourseDetail | null;

  setCurrentCourse: (course: ICourseDetail) => void;
};

export const useCourseStore = create<CourseState>((set) => ({
  courses: [],
  currentCourse: null,
  setCurrentCourse: (course) => set({ currentCourse: course }),
}));
