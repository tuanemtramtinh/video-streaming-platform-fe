import { useQuery } from "@tanstack/react-query";
import { getPaymentByOrderCodeApi } from "@/services/payments.service";

export const useGetPaymentByOrderCode = (orderCode: string | null) => {
  return useQuery({
    queryKey: ["payment", orderCode],
    queryFn: () => getPaymentByOrderCodeApi(orderCode!),
    enabled: !!orderCode,
    retry: false,
  });
};
