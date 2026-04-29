import { addToWishlistApi } from "@/services/courses.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToWishlistApi,
    onSuccess: (_, variables) => {
      console.log(_);
      toast.success("Đã thêm vào danh sách yêu thích!");
      queryClient.invalidateQueries({ queryKey: ["courses", "wishlist"] });
      queryClient.invalidateQueries({
        queryKey: ["courses", String(variables.courseId)],
      });
    },
    onError: () => {
      toast.error("Không thể thêm vào danh sách yêu thích. Vui lòng thử lại.");
    },
  });
};
