import { getUserWishlistApi } from "@/services/courses.service";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetWishlist = (page: number, limit: number, enabled = true) => {
  return useQuery({
    queryKey: ["courses", "wishlist", page, limit],
    queryFn: () => getUserWishlistApi({ page, limit }),
    placeholderData: keepPreviousData,
    enabled,
  });
};
