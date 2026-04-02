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

export function createMultipartUppy() {
  return new Uppy({ autoProceed: false, restrictions }).use(AwsS3, {
    shouldUseMultipart: true,

    async createMultipartUpload(file) {
      console.log("hello");
      console.log(file.name);
      console.log(file.type);
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
