import { AdminCustomInput } from "@/components/AdminCustomInput";
import { AdminDeleteSectionModal } from "@/components/AdminDeleteSectionModal";
import Loading from "@/components/Loading";
import { useUpdateSection } from "@/hooks/useUpdateSection";
import { useSectionStore } from "@/stores/useSectionStore";
import type { ISection } from "@/types/section.type";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function AdminCourseSectionDetailsPage() {
  const { sectionId } = useParams();
  const { mutate: updateSection } = useUpdateSection();

  const section = useSectionStore((state) => state.section);

  const [initialData, setInitialData] = useState<ISection | null>(null);
  const [orderIndex, setOrderIndex] = useState("0");
  const [title, setTitle] = useState("");
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  // const { data, isSuccess } = useGetSectionById(sectionId as string);

  const handleUpdate = () => {
    if (!initialData) return;

    const updateData: Partial<ISection> = {};

    if (title && initialData.title !== title) {
      updateData.title = title;
    }

    if (orderIndex && String(initialData.orderIndex) !== orderIndex) {
      updateData.orderIndex = Number(orderIndex);
    }

    updateSection({
      sectionId: sectionId as string,
      title: updateData.title,
      orderIndex: updateData.orderIndex,
    });
  };

  useEffect(() => {
    if (section) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOrderIndex(String(section.orderIndex));
      setTitle(section.title);
      setInitialData(section);
    }
  }, [section]);

  return (
    <div>
      {sectionId && (
        <AdminDeleteSectionModal
          sectionId={sectionId}
          isOpen={isOpenDelete}
          onClose={() => setIsOpenDelete(false)}
          setLoading={setIsLoadingDelete}
        />
      )}
      {isLoadingDelete && <Loading />}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-color-primary text-lg">Chi tiết chương</h2>
        <div className="flex gap-2">
          <button className="btn btn-info" onClick={handleUpdate}>
            Lưu
          </button>
          <button className="btn border-border bg-white">
            Chuyển sang Nháp
          </button>
          <button
            className="btn btn-error"
            onClick={() => setIsOpenDelete(true)}
          >
            Xoá
          </button>
        </div>
      </div>

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
