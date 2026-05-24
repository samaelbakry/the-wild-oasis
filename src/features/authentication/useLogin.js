import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {login} from "../../services/apiAuth"
import toast from "react-hot-toast";

export function useLogin(){
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const {mutate:loginFn , isPending} = useMutation({
        
        mutationFn:({email , password})=>login({email , password}),
        onSuccess:(user)=>{
            queryClient.setQueryData(["user"] , user.user)
            toast.success("account logged in successfully !")
            navigate("/dashboard" , {replace : true})
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })

    return { isPending , loginFn }
}