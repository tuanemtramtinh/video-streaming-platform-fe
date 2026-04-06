import { CourseCardItem } from "@/components/CourseCardItem";
import { CourseLeftColumn } from "@/components/CourseLeftColumn";
import { Search } from "lucide-react";

export default function MyCoursesPage() {
  return (
    <div className="container mx-auto">
      <div className="py-10">
        <div className="mb-6">
          <h2 className="mb-1 text-2xl font-bold">Khoá học của tôi</h2>
          <div>
            Chào mừng bạn trở lại, hãy tiếp tục hành trình học tập của mình
          </div>
        </div>

        <div className="flex gap-10">
          <div className="flex-1">
            <CourseLeftColumn />
          </div>

          <div className="flex-4">
            <label className="input mb-6 w-full">
              <Search />
              <input type="search" className="grow" placeholder="Search" />
              <kbd className="kbd kbd-sm">⌘</kbd>
              <kbd className="kbd kbd-sm">K</kbd>
            </label>

            <div className="grid grid-cols-3 gap-5">
              <CourseCardItem isBought={true} />
              <CourseCardItem isBought={true} />
              <CourseCardItem isBought={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
