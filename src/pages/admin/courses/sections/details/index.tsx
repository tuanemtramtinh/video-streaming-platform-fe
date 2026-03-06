import { AdminCustomInput } from "@/components/AdminCustomInput";

export default function AdminCourseSectionDetailsPage() {
  return (
    <div>
      <h2 className="text-color-primary mb-4 text-lg">Chi tiết chương</h2>

      <div>
        <AdminCustomInput
          label="Thứ tự chương"
          placeholder="Thứ tự chương..."
          style="mb-4"
        />

        <AdminCustomInput label="Tiêu đề" placeholder="Tiêu đề..." />
      </div>
    </div>
  );
}
