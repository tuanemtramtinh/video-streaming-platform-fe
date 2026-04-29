import { removeFromWishlistApi } from "@/services/courses.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFromWishlistApi,
    onSuccess: () => {
      toast.success("Đã xoá khỏi danh sách yêu thích!");
      queryClient.invalidateQueries({ queryKey: ["courses", "wishlist"] });
    },
    onError: () => {
      toast.error("Không thể xoá khỏi danh sách yêu thích. Vui lòng thử lại.");
    },
  });
};
