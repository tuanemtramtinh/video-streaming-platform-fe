import { AdminNewSectionModal } from "@/components/AdminNewSectionModal";
import type { ISectionRow } from "@/types/section.type";
import { Search } from "lucide-react";
import { useState } from "react";
import { DataTable } from "@/components/DataTable";
import type { ColumnDef } from "@tanstack/react-table";
import { useNavigate, useParams } from "react-router";

export default function AdminCourseSectionPage() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const data: ISectionRow[] = [
    {
      id: 1,
      orderIndex: 1,
      title: "The Solid State",
      createdAt: "15/12/2025",
      status: "Public",
    },
    {
      id: 2,
      orderIndex: 2,
      title: "Quantum Physics",
      createdAt: "16/12/2025",
      status: "Draft",
    },
  ];

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
      accessorKey: "createdAt",
      header: "Ngày đăng",
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
            data={data}
            onRowClick={() => {
              navigate(`/admin/courses/${id}/sections/1`);
            }}
          />
        </div>
      </div>
    </div>
  );
}
