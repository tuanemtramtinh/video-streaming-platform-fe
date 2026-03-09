import { BookOpenText } from "lucide-react";

interface DocumentDrawerTriggerProps {
  drawerId?: string;
}

export function DocumentDrawerTrigger({
  drawerId = "my-drawer-1",
}: DocumentDrawerTriggerProps) {
  return (
    <div className="drawer-content">
      <label
        htmlFor={drawerId}
        className="btn btn-info drawer-button text-white"
      >
        <BookOpenText />
        Tài liệu
      </label>
    </div>
  );
}
