import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";

export function useDeleteBooking(){
    const queryClient = useQueryClient()
    const { mutate:deleteBookingFn , isDeleting } = useMutation({ 
        mutationFn: (bookingId)=> deleteBooking(bookingId),
        onSuccess:()=>{
            toast.success(`Booking deleted successsfully !`)
            queryClient.invalidateQueries({
                queryKey:["bookings"]
            })
        },
        onError:()=>toast.error("couldnt delete booking ❌")
    })

    return {deleteBookingFn , isDeleting}
}