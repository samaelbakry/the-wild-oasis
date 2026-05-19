import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/cabinsApis";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: updateCabin, isPending: isUpdating } = useMutation({
    mutationFn: ({ newCabin, id }) => createEditCabin(newCabin, id),

    onSuccess: () => {
      toast.success("Cabin updated Successfully");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateCabin, isUpdating };
}
