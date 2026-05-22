import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_COUNT } from "../../utils/constants";

export function useBooking() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //===FILTER===//
  const filteredValues = searchParams.get("status") || "all";
  const filter =
    !filteredValues || filteredValues === "all"
      ? null
      : {
          field: "status",
          value: filteredValues,
        };

  //===SORTING===//
  const sortBy = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortBy.split("-");
  const sortByRow = { field, direction };

  //===PAGINATION===//
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const { data: { data: bookings, count } = {}, isLoading } = useQuery({
    queryKey: ["bookings", filter, sortByRow, page],
    queryFn: () => getBookings({ filter, sortByRow, page }),
  });
  //===PRE-FETCHING===//
  const pageCount = Math.ceil(count / PAGE_COUNT);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortByRow, page + 1],
      queryFn: () => getBookings({ filter, sortByRow, page: page + 1 }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortByRow, page - 1],
      queryFn: () => getBookings({ filter, sortByRow, page: page - 1 }),
    });
  }
  return { bookings, isLoading, count };
}
