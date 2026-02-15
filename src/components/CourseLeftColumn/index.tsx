import { Rating } from "../Rating";

export const CourseLeftColumn = () => {
  return (
    <div>
      <div className="collapse-arrow collapse">
        <input type="checkbox" />
        <div className="collapse-title border-border mb-2 border-b">
          Đánh giá
        </div>
        <div className="collapse-content px-2">
          <Rating rating={5} />
          <Rating rating={4} />
          <Rating rating={3} />
          <Rating rating={2} />
          <Rating rating={1} />
        </div>
      </div>

      <div className="collapse-arrow collapse">
        <input type="checkbox" />
        <div className="collapse-title border-border mb-2 border-b">
          Số chương
        </div>
        <div className="collapse-content px-2">
          <div className="flex flex-col gap-4">
            <label className="label">
              <input type="checkbox" defaultChecked className="checkbox" />
              1-10
            </label>
            <label className="label">
              <input type="checkbox" className="checkbox" />
              10-15
            </label>
            <label className="label">
              <input type="checkbox" className="checkbox" />
              15-20
            </label>
            <label className="label">
              <input type="checkbox" className="checkbox" />
              20-25
            </label>
          </div>
        </div>
      </div>

      <div className="collapse-arrow collapse">
        <input type="checkbox" />
        <div className="collapse-title border-border mb-2 border-b">Giá</div>
        <div className="collapse-content px-2"></div>
      </div>

      <div className="collapse-arrow collapse">
        <input type="checkbox" />
        <div className="collapse-title border-border mb-2 border-b">
          Danh mục
        </div>
        <div className="collapse-content px-2"></div>
      </div>
    </div>
  );
};
