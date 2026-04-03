import Uppy from "@uppy/core";
import AwsS3 from "@uppy/aws-s3";
import api from "@/lib/axios";

const restrictions = {
  maxNumberOfFiles: 1,
  allowedFileTypes: [
    "video/mp4",
    "video/quicktime",
    "video/webm",
    "video/x-matroska",
  ],
};

const documentRestrictions = {
  maxNumberOfFiles: 1,
  allowedFileTypes: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ],
};

export function createDocumentUppy() {
  return new Uppy({
    autoProceed: false,
    restrictions: documentRestrictions,
  }).use(AwsS3, {
    shouldUseMultipart: false,
    async getUploadParameters(file) {
      const res = await api.post("/resources/upload", {
        fileName: file.name,
        fileType: file.type ?? "",
      });
      return { method: "PUT", url: res.data.url };
    },
  });
}

// export function createSingleUppy() {
//   return new Uppy({ autoProceed: false, restrictions }).use(AwsS3, {
//     shouldUseMultipart: false,
//     async getUploadParameters(file) {
//       const res = await fetch(
//         `/api/s3/presign?filename=${encodeURIComponent(file.name)}&type=${encodeURIComponent(file.type ?? "")}`,
//       );
//       return res.json();
//     },
//   });
// }

export function createMultipartUppy() {
  return new Uppy({ autoProceed: false, restrictions }).use(AwsS3, {
    shouldUseMultipart: true,

    async createMultipartUpload(file) {
      const res = await api.post(`/lessons/multipart-upload/start`, {
        fileName: file.name,
        fileType: file.type,
      });
      const { uploadId, videoKey } = res.data;
      return { uploadId, key: videoKey };
    },

    async signPart(_file, { uploadId, key, partNumber }) {
      const res = await api.post(`/lessons/multipart-upload/sign-part`, {
        uploadId,
        videoKey: key,
        partNumber,
      });
      return { url: res.data.url };
    },

    async completeMultipartUpload(_file, { uploadId, key, parts }) {
      const res = await api.post(`/lessons/multipart-upload/complete`, {
        uploadId,
        videoKey: key,
        parts,
      });
      return { location: res.data.videoUrl };
    },

    // Backend has no listParts / abortMultipartUpload endpoints.
    // These stubs satisfy the type requirement.
    async listParts() {
      return [];
    },

    async abortMultipartUpload() {},
  });
}
