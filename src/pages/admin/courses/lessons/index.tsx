import { DataTable } from "@/components/DataTable";
import type { ILessonRow } from "@/types/lesson.type";
import type { ColumnDef } from "@tanstack/react-table";
import { useNavigate, useParams } from "react-router";

export default function AdminLessonsPage() {
  const navigate = useNavigate();
  const { id, sectionId } = useParams();

  const data: ILessonRow[] = [
    {
      id: 1,
      orderIndex: 1,
      title: "The Solid State",
      createdAt: "31/10/2024 9:00",
      status: "Công khai",
    },
    {
      id: 2,
      orderIndex: 2,
      title: "The Solid State",
      createdAt: "31/10/2024 9:00",
      status: "Công khai",
    },
    {
      id: 3,
      orderIndex: 3,
      title: "The Solid State",
      createdAt: "31/10/2024 9:00",
      status: "Công khai",
    },
  ];

  const columns: ColumnDef<ILessonRow>[] = [
    {
      accessorKey: "orderIndex",
      header: "Bài học",
    },
    {
      accessorKey: "title",
      header: "Tiêu đề",
    },
    {
      accessorKey: "createdAt",
      header: "Ngày đăng",
    },
    {
      accessorKey: "status",
      header: "Trạng thái",
    },
  ];

  return (
    <div className="flex-1">
      <DataTable
        columns={columns}
        data={data}
        onRowClick={() =>
          navigate(`/admin/courses/${id}/sections/${sectionId}/lessons/1`)
        }
      />
    </div>
  );
}
