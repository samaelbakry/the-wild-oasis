import { useMutation } from "@tanstack/react-query";
import {signup} from '../../services/apiAuth'
import toast from "react-hot-toast";

export function useSignup(){
    const {mutate:signupFn , isPending } = useMutation({
        mutationFn:signup,
        onSuccess:()=>{
            toast.success("account created siccessfully now verify your account !")
        }
    })

    return {signupFn ,isPending }
}