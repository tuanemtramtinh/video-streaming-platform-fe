import api from "@/lib/axios";

export interface IPayment {
  id: number;
  orderCode: string;
  paymentLinkId: string;
  userId: number;
  courseId: number;
  originalAmount: number;
  finalAmount: number;
  discountPercent: number;
  status: string;
  payosStatus: string;
  checkoutUrl: string;
  qrCode: string;
  failureReason: string | null;
  expiredAt: string | null;
  paidAt: string | null;
  cancelledAt: string | null;
  createdAt: string;
  updatedAt: string;
  course: {
    id: number;
    title: string;
    thumbnailUrl: string;
    price: number;
    discount: number;
  };
}

export const getPaymentByOrderCodeApi = async (orderCode: string) => {
  const res = await api.get(`/payments/${orderCode}`);
  return res.data as IPayment;
};

export const checkoutCourseApi = async (courseId: string) => {
  const res = await api.post("/payments/checkout", { courseId: Number(courseId) });
  return res.data as IPayment;
};
