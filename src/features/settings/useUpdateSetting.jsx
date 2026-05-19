import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingsFn } from "../../services/apiSettings";

export function useUpdateSetting() {

  const queryClient = useQueryClient();
  const { mutate: updateSetting, isPending: isUpdating } = useMutation({

    mutationFn: updateSettingsFn,
    onSuccess: () => {
      toast.success("Setting updated Successfully");

      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateSetting, isUpdating };
}
