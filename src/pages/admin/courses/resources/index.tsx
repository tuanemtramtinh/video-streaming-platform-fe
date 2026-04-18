import { AdminNewResourceModal } from "@/components/AdminNewResourceModal";
import { AdminResourceDetailModal } from "@/components/AdminResourceDetailModal";
import { DataTable } from "@/components/DataTable";
import { useGetResourcesByCourseId } from "@/hooks/useGetResourcesByCourseId";
import type { IResource } from "@/types/resources.type";
import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import { format } from "date-fns";
import { Search } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { useParams } from "react-router";

const columns: ColumnDef<IResource>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Tiêu đề",
  },
  {
    accessorKey: "createdAt",
    header: "Ngày đăng",
    cell: ({ getValue }) =>
      format(new Date(getValue<string>()), "dd/MM/yyyy HH:mm"),
  },
  {
    id: "actions",
    header: "Hành động",
    cell: ({ row }) => (
      <div onClick={(e) => e.stopPropagation()}>
        <a
          href={row.original.fileUrl}
          download
          className="btn btn-success btn-sm text-white"
        >
          Tải về
        </a>
      </div>
    ),
  },
];

export default function AdminResourcesPage() {
  const { id } = useParams();
  const courseId = Number(id);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<IResource | null>(
    null,
  );
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [keyword, setKeyword] = useState<string | undefined>(undefined);

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const page = pagination.pageIndex + 1;
  const limit = pagination.pageSize;

  const { data } = useGetResourcesByCourseId(courseId, page, limit, keyword);

  const handleSearch = useCallback((value: string) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      const trimmed = value.trim();
      setKeyword(trimmed || undefined);
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    }, 500);
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      <AdminNewResourceModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        courseId={courseId}
      />
      <AdminResourceDetailModal
        isOpen={selectedResource !== null}
        onClose={() => setSelectedResource(null)}
        resource={selectedResource}
      />
      <div className="text-color-primary mb-6 flex items-center justify-between text-xl font-bold">
        <div>Chi tiết khoá học</div>
        <button
          className="btn bg-text-fourthdary rounded-lg text-white"
          onClick={() => setIsOpen(true)}
        >
          Tạo tài liệu mới
        </button>
      </div>

      <label className="input mb-6 w-full rounded-lg">
        <Search />
        <input
          type="search"
          className="grow"
          placeholder="Tìm kiếm tài liệu..."
          onChange={(e) => handleSearch(e.target.value)}
        />
      </label>
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        pagination={pagination}
        pageCount={data?.meta.lastPage ?? 0}
        onPaginationChange={setPagination}
        onRowClick={setSelectedResource}
      />
    </div>
  );
}
