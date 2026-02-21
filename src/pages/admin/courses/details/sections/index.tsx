export default function AdminCourseSectionPage() {
  return (
    <div className="overflow-x-auto">
      <div className="mb-4 flex justify-end">
        <button className="btn bg-text-fourthdary rounded-lg text-white">
          Tạo chương mới
        </button>
      </div>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Chương</th>
            <th>Tiêu đề</th>
            <th>Ngày đăng</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <th>1</th>
            <td>The Solid State</td>
            <td>15/12/2025</td>
            <td>Public</td>
          </tr>
          {/* row 2 */}
          <tr>
            <th>2</th>
            <td>The Solid State</td>
            <td>15/12/2025</td>
            <td>Public</td>
          </tr>
          {/* row 3 */}
          <tr>
            <th>3</th>
            <td>The Solid State</td>
            <td>15/12/2025</td>
            <td>Public</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
