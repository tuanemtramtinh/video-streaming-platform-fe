import { AdminNewResourceModal } from "@/components/AdminNewResourceModal";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useState } from "react";

export default function AdminResourcesPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-1 flex-col">
      <AdminNewResourceModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
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
        <input type="search" className="grow" placeholder="Search" />
      </label>
      <div className="flex flex-1 flex-col gap-6">
        <div className="flex-1 overflow-x-auto">
          <table className="border-border table border bg-white">
            {/* head */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Tiêu đề</th>
                <th>Loại</th>
                <th>Ngày đăng</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr className="hover:bg-background">
                <th>1</th>
                <td>The Solid State</td>
                <td>PDF</td>
                <td>31/10/2024 9:00</td>
                <td>
                  <button className="btn btn-info btn-sm mr-3 text-white">
                    Xem trước
                  </button>
                  <button className="btn btn-success btn-sm text-white">
                    Tải về
                  </button>
                </td>
              </tr>
              {/* row 2 */}
              <tr className="hover:bg-background">
                <th>2</th>
                <td>The Solid State</td>
                <td>PDF</td>
                <td>31/10/2024 9:00</td>
                <td>
                  <button className="btn btn-info btn-sm mr-3 text-white">
                    Xem trước
                  </button>
                  <button className="btn btn-success btn-sm text-white">
                    Tải về
                  </button>
                </td>
              </tr>
              {/* row 3 */}
              <tr className="hover:bg-background">
                <th>3</th>
                <td>The Solid State</td>
                <td>PDF</td>
                <td>31/10/2024 9:00</td>
                <td>
                  <button className="btn btn-info btn-sm mr-3 text-white">
                    Xem trước
                  </button>
                  <button className="btn btn-success btn-sm text-white">
                    Tải về
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="join w-full justify-center">
          <button className="join-item btn">
            <ChevronLeft size={14} />
          </button>
          <button className="join-item btn">1</button>
          <button className="join-item btn btn-active">2</button>
          <button className="join-item btn">3</button>
          <button className="join-item btn">4</button>
          <button className="join-item btn">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
