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
    <div className="card border-border border shadow-sm">
      <div className="card-body">
        <div className="card-title border-border border-b pb-2">
          Khoá học DSA
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
    </div>
  );
};

export default function AdminCoursePage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Khoá học</h2>
        <Link
          to={"/admin/courses/new"}
          className="btn bg-text-fourthdary rounded-lg text-white"
        >
          Thêm khoá học
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
