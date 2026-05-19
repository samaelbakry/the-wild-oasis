import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/cabinsApis";
import toast from "react-hot-toast";

export function useCreateCabin(){
    const queryClient = useQueryClient();
    const { mutate:createCabin, isPending:isCreating } = useMutation({
    mutationFn: createEditCabin,

    onSuccess: () => {
      toast.success("Cabin Created Successfully");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
  return {createCabin , isCreating}
}