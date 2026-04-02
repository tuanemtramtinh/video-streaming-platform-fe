import Uppy from "@uppy/core";
import AwsS3 from "@uppy/aws-s3";

const restrictions = {
  maxNumberOfFiles: 1,
  allowedFileTypes: ["video/mp4", "video/quicktime", "video/webm"],
};

export function createSingleUppy() {
  return new Uppy({ autoProceed: false, restrictions }).use(AwsS3, {
    shouldUseMultipart: false,
    async getUploadParameters(file) {
      const res = await fetch(
        `/api/s3/presign?filename=${encodeURIComponent(file.name)}&type=${encodeURIComponent(file.type ?? "")}`,
      );
      return res.json();
    },
  });
}

// Chỉ có multipart handlers — không có shouldUseMultipart
// Uppy sẽ tự dùng multipart cho tất cả file
export function createMultipartUppy() {
  return new Uppy({ autoProceed: false, restrictions }).use(AwsS3, {
    async createMultipartUpload(file) {
      const res = await fetch("/api/s3/multipart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
      });
      return res.json();
    },

    async signPart(_file, { uploadId, key, partNumber }) {
      const res = await fetch(
        `/api/s3/multipart/${uploadId}/${partNumber}?key=${encodeURIComponent(key)}`,
      );
      return res.json();
    },

    async listParts(_file, { uploadId, key }) {
      const res = await fetch(
        `/api/s3/multipart/${uploadId}?key=${encodeURIComponent(key)}`,
      );
      return res.json();
    },

    async completeMultipartUpload(_file, { uploadId, key, parts }) {
      const res = await fetch(`/api/s3/multipart/${uploadId}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, parts }),
      });
      return res.json();
    },

    async abortMultipartUpload(_file, { uploadId, key }) {
      await fetch(`/api/s3/multipart/${uploadId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });
    },
  });
}
