import { DataTable } from "@/components/DataTable";
import { useGetLessons } from "@/hooks/useGetLessons";
import type { ILessonRow } from "@/types/lesson.type";
import type { ColumnDef } from "@tanstack/react-table";
import { Search } from "lucide-react";
import { useCallback, useRef } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";

export default function AdminLessonsPage() {
  const navigate = useNavigate();
  const { id, sectionId } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 10);
  const keywordFromUrl = searchParams.get("keyword") ?? undefined;

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data } = useGetLessons(Number(sectionId), page, limit, keywordFromUrl);

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
    {
      accessorKey: "status",
      header: "Trạng thái",
    },
  ];

  const handleSearch = useCallback(
    (value: string) => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        const trimmed = value.trim();
        setSearchParams({
          page: "1",
          limit: String(limit),
          ...(trimmed ? { keyword: trimmed } : {}),
        });
      }, 500);
    },
    [limit, setSearchParams],
  );

  return (
    <div className="flex flex-1 flex-col gap-4">
      <label className="input w-full rounded-lg">
        <Search />
        <input
          type="search"
          className="grow"
          placeholder="Tìm kiếm bài học..."
          defaultValue={keywordFromUrl ?? ""}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </label>
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
              ...(keywordFromUrl ? { keyword: keywordFromUrl } : {}),
            });
          }}
          onRowClick={(row) =>
            navigate(
              `/admin/courses/${id}/sections/${sectionId}/lessons/${row.id}`,
            )
          }
        />
      </div>
    </div>
  );
}
