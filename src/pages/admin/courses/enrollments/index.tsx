import { DataTable } from "@/components/DataTable";
import { useGetEnrollmentsByCourse } from "@/hooks/useGetEnrollmentsByCourse";
import type { IEnrollment } from "@/types/enrollment.type";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useParams, useSearchParams } from "react-router";

export default function AdminCourseEnrollmentsPage() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 10);

  const { data } = useGetEnrollmentsByCourse(id!, page, limit);

  const columns: ColumnDef<IEnrollment>[] = [
    {
      accessorKey: "user.lastName",
      header: "Họ",
    },
    {
      accessorKey: "user.firstName",
      header: "Tên",
    },
    {
      accessorKey: "user.email",
      header: "Email",
    },
    {
      accessorKey: "enrolledAt",
      header: "Ngày đăng ký",
      cell: ({ getValue }) =>
        format(new Date(getValue() as string), "dd/MM/yyyy", { locale: vi }),
    },
  ];

  return (
    <div className="flex flex-1 flex-col">
      <div className="text-color-primary mb-6 text-xl font-bold">
        Danh sách học viên
      </div>

      <div className="flex flex-1 flex-col gap-6">
        <div className="flex-1 overflow-x-auto">
          <DataTable
            columns={columns}
            data={data?.data ?? []}
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
          />
        </div>
      </div>
    </div>
  );
}
