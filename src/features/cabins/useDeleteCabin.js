import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/cabinsApis";
import toast from "react-hot-toast";

export function useDeleteCabin(){
     const queryClient = useQueryClient();
      const { isPending, mutate:deleteCabinFn } = useMutation({
        mutationFn:  deleteCabin,
        onSuccess: () => {
          toast.success("Cabin Deleted !");
          queryClient.invalidateQueries({ queryKey: ["cabins"] });
        },
        onError: (err) => {
        toast.error(err.message);
      },
      });

      return {isPending , deleteCabinFn}
}