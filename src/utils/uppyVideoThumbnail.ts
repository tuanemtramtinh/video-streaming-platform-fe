/**
 * Tạo URL ảnh (JPEG) từ một frame video để Uppy Dashboard hiển thị preview
 * (Dashboard chỉ render <img>, không có <video> cho preview ô file).
 */
export function generateVideoThumbnailPreview(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(blob);
    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.src = objectUrl;

    const cleanup = () => {
      URL.revokeObjectURL(objectUrl);
      video.removeAttribute("src");
      video.load();
    };

    const fail = (err: Error) => {
      cleanup();
      reject(err);
    };

    video.addEventListener("loadedmetadata", () => {
      const t =
        Number.isFinite(video.duration) && video.duration > 0
          ? Math.min(0.5, video.duration / 4)
          : 0.1;
      video.currentTime = t;
    });

    video.addEventListener("seeked", () => {
      try {
        const vw = video.videoWidth;
        const vh = video.videoHeight;
        if (!vw || !vh) {
          fail(new Error("Không đọc được kích thước video"));
          return;
        }
        const maxW = 400;
        const scale = vw > maxW ? maxW / vw : 1;
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(vw * scale);
        canvas.height = Math.round(vh * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          fail(new Error("Canvas 2D không khả dụng"));
          return;
        }
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (jpeg) => {
            cleanup();
            if (!jpeg) {
              reject(new Error("toBlob thất bại"));
              return;
            }
            resolve(URL.createObjectURL(jpeg));
          },
          "image/jpeg",
          0.85,
        );
      } catch (e) {
        fail(e instanceof Error ? e : new Error(String(e)));
      }
    });

    video.addEventListener("error", () => {
      fail(new Error("Không tải được video để tạo thumbnail"));
    });
  });
}
