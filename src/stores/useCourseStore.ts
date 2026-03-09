import type { ICourse } from "@/types/course.type";
import { create } from "zustand";

type CourseState = {
  courses: ICourse[];
  currentCourse: ICourse | null;

  setCurrentCourse: (course: ICourse) => void;
};

export const useCourseStore = create<CourseState>((set, get) => ({
  courses: [],
  currentCourse: null,
  setCurrentCourse: (course) => set({ currentCourse: course }),
}));
