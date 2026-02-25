import { Search } from "lucide-react";
import { Link } from "react-router";

const CardItem = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <div>
      <h3 className="text-color-primary text-lg font-semibold">{title}</h3>
      <div className="text-text-secondary text-sm">{desc}</div>
    </div>
  );
};

const Card = () => {
  return (
    <Link
      to={"/admin/courses/details/1"}
      className="card border-border border shadow-sm"
    >
      <div className="card-body">
        <div className="card-title border-border border-b pb-2">
          <div>
            <div className="badge border-border text-color-primary mb-2 bg-[#F1F5F9] text-xs font-semibold">
              Lập trình
            </div>
            <div>Khoá học DSA</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <CardItem title="$00.00" desc="Giá" />
          <CardItem title="13" desc="Số chương" />
          <CardItem title="254" desc="Đã đăng ký" />
          <CardItem title="25" desc="Chứng chỉ" />
          <CardItem title="25" desc="Đánh giá" />
          <CardItem title="500" desc="Yêu thích" />
        </div>
      </div>
    </Link>
  );
};

export default function AdminCoursePage() {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Khoá học</h2>
        <Link
          to={"/admin/courses/new"}
          className="btn bg-text-fourthdary rounded-lg text-white"
        >
          Thêm khoá học
        </Link>
      </div>
      <label className="input mb-6 w-full rounded-lg">
        <Search />
        <input type="search" className="grow" placeholder="Search" />
      </label>
      <div className="flex flex-1 flex-col gap-6">
        <div className="grid flex-1 grid-cols-3 content-start gap-3">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
        <div className="join justify-center">
          <button className="join-item btn">1</button>
          <button className="join-item btn btn-active">2</button>
          <button className="join-item btn">3</button>
          <button className="join-item btn">4</button>
        </div>
      </div>
    </div>
  );
}
