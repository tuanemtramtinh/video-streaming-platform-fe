import { DataTable } from "@/components/DataTable";
import { useGetLessons } from "@/hooks/useGetLessons";
import type { ILessonRow } from "@/types/lesson.type";
import type { ColumnDef } from "@tanstack/react-table";
import { useNavigate, useParams, useSearchParams } from "react-router";

export default function AdminLessonsPage() {
  const navigate = useNavigate();
  const { id, sectionId } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 10);

  const { data } = useGetLessons(Number(sectionId), page, limit);

  const rows: ILessonRow[] =
    data?.data.map((lesson) => ({
      id: lesson.id,
      orderIndex: lesson.orderIndex,
      title: lesson.title,
      status: lesson.status,
    })) ?? [];

  const columns: ColumnDef<ILessonRow>[] = [
    {
      accessorKey: "orderIndex",
      header: "Bài học",
    },
    {
      accessorKey: "title",
      header: "Tiêu đề",
    },
    // {
    //   accessorKey: "createdAt",
    //   header: "Ngày đăng",
    // },
    {
      accessorKey: "status",
      header: "Trạng thái",
    },
  ];

  return (
    <div className="flex-1">
      <DataTable
        columns={columns}
        data={rows}
        pagination={{
          pageIndex: page - 1,
          pageSize: limit,
        }}
        pageCount={data?.meta.lastPage ?? 0}
        onPaginationChange={(updater) => {
          const next =
            typeof updater === "function"
              ? updater({ pageIndex: page - 1, pageSize: limit })
              : updater;

          setSearchParams({
            page: String(next.pageIndex + 1),
            limit: String(next.pageSize),
          });
        }}
        onRowClick={(row) =>
          navigate(
            `/admin/courses/${id}/sections/${sectionId}/lessons/${row.id}`,
          )
        }
      />
    </div>
  );
}
