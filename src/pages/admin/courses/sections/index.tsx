import { AdminNewSectionModal } from "@/components/AdminNewSectionModal";
import type { ISectionRow } from "@/types/section.type";
import { Search } from "lucide-react";
import { useState } from "react";
import { DataTable } from "@/components/DataTable";
import type { ColumnDef } from "@tanstack/react-table";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { useGetSectionsByCourseId } from "@/hooks/useGetSectionsByCourseId";

export default function AdminCourseSectionPage() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 10);

  const { data } = useGetSectionsByCourseId(Number(id), page, limit);

  const rows: ISectionRow[] =
    data?.data?.map((section) => ({
      id: section.id,
      orderIndex: section.orderIndex,
      title: section.title,
      status: section.status,
    })) ?? [];

  const columns: ColumnDef<ISectionRow>[] = [
    {
      accessorKey: "orderIndex",
      header: "Chương",
    },
    {
      accessorKey: "title",
      header: "Tiêu đề",
    },
    {
      accessorKey: "status",
      header: "Trạng thái",
    },
  ];

  return (
    <div className="flex flex-1 flex-col">
      <AdminNewSectionModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className="text-color-primary mb-6 flex items-center justify-between text-xl font-bold">
        <div>Chi tiết khoá học</div>
        <button
          className="btn bg-text-fourthdary rounded-lg text-white"
          onClick={() => {
            console.log("hello");
            setIsOpen(true);
          }}
        >
          Tạo chương mới
        </button>
      </div>
      <label className="input mb-6 w-full rounded-lg">
        <Search />
        <input type="search" className="grow" placeholder="Search" />
      </label>
      <div className="flex flex-1 flex-col gap-6">
        <div className="flex-1 overflow-x-auto">
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
            onRowClick={(row) => {
              navigate(`/admin/courses/${id}/sections/${row.id}`);
            }}
          />
        </div>
      </div>
    </div>
  );
}
