import { CourseCardItem } from "../CourseCardItem";

export const CourseRightColumn = () => {
  return (
    <div className="">
      <div className="mb-6 grid grid-cols-3 gap-5">
        <CourseCardItem />
        <CourseCardItem />
        <CourseCardItem />
        <CourseCardItem />
        <CourseCardItem />
        <CourseCardItem />
        <CourseCardItem />
        <CourseCardItem />
        <CourseCardItem />
      </div>
      <div className="flex justify-center">
        <div className="join">
          <button className="join-item btn">1</button>
          <button className="join-item btn btn-active">2</button>
          <button className="join-item btn">3</button>
          <button className="join-item btn">4</button>
        </div>
      </div>
    </div>
  );
};
