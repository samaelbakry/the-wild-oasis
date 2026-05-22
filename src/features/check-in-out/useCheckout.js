import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckout(){
    const navigate =useNavigate()
    const queryClient = useQueryClient()
    const { mutate:checkout , isPending } = useMutation({

        mutationFn:(bookingId)=>updateBooking(bookingId , {
            status:"checked-out",
        }),
        onSuccess:(data)=>{
            toast.success(`Booking #${data.id} checked-out successsfully !`)
            queryClient.invalidateQueries({active:true})
            navigate("/")
        },
        onError:()=>toast.error("Somthing went wrong Couldnt checkout ❌")
    })

    return {checkout , isPending}
}