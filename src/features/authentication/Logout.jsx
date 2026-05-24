import { HiLogout } from "react-icons/hi"
import ButtonIcon from "../../ui/ButtonIcon"
import { useLogout } from "./useLogout"
import SpinnerMini from "../../ui/SpinnerMini"


export default function Logout() {
  const { isPending , logoutFn} = useLogout()

  return (
    <ButtonIcon disabled={isPending} onClick={logoutFn}>
        {isPending ? <SpinnerMini /> : <HiLogout/>}
    </ButtonIcon>
  )
}
