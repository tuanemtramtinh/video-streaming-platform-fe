import { useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router";
import { toast } from "react-toastify";
import { useGetPaymentByOrderCode } from "@/hooks/useGetPaymentByOrderCode";

export default function PaymentReturnPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const orderCode = searchParams.get("orderCode");
  const status = searchParams.get("status");

  const {
    data: payment,
    isLoading,
    isError,
  } = useGetPaymentByOrderCode(orderCode);

  console.log(payment);

  useEffect(() => {
    if (!payment) return;
    if (payment.status !== "paid") return; // thêm dòng này

    toast.success("Đăng ký khoá học thành công!");
    navigate(`/courses/${payment.courseId}`, { replace: true });
  }, [payment, navigate]);

  if (!orderCode || status === "CANCELLED") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <div className="text-error text-5xl">✕</div>
        <h2 className="text-2xl font-bold">Thanh toán đã bị huỷ</h2>
        <p className="text-base-content/60">Bạn đã huỷ giao dịch thanh toán.</p>
        <Link to={`/courses/${payment?.courseId}`} className="btn btn-primary">
          Quay lại
        </Link>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <div className="text-error text-5xl">✕</div>
        <h2 className="text-2xl font-bold">Có lỗi xảy ra</h2>
        <p className="text-base-content/60">
          Không thể xác nhận giao dịch. Vui lòng liên hệ hỗ trợ.
        </p>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Về trang chủ
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <span className="loading loading-spinner loading-lg text-primary" />
        <p className="text-base-content/60">Đang xác nhận thanh toán...</p>
      </div>
    );
  }

  return null;
}
