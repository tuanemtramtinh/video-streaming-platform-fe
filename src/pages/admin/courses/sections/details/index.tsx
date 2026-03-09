import { AdminCustomInput } from "@/components/AdminCustomInput";
import { useGetSectionById } from "@/hooks/useGetSectionById";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function AdminCourseSectionDetailsPage() {
  const { sectionId } = useParams();

  const [orderIndex, setOrderIndex] = useState("0");
  const [title, setTitle] = useState("");

  const { data, isSuccess } = useGetSectionById(sectionId as string);

  useEffect(() => {
    if (isSuccess && data) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOrderIndex(String(data.orderIndex));
      setTitle(data.title);
    }
  }, [isSuccess, data]);

  return (
    <div>
      <h2 className="text-color-primary mb-4 text-lg">Chi tiết chương</h2>

      <div>
        <AdminCustomInput
          label="Thứ tự chương"
          placeholder="Thứ tự chương..."
          style="mb-4"
          value={orderIndex}
          setValue={setOrderIndex}
        />

        <AdminCustomInput
          label="Tiêu đề"
          placeholder="Tiêu đề..."
          value={title}
          setValue={setTitle}
        />
      </div>
    </div>
  );
}
