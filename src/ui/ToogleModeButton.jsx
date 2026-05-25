import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2"
import ButtonIcon from "./ButtonIcon"
import { useDarkMode } from "../context/DarkModeContext"

export default function ToogleModeButton() {
    const {handleDarkToggle , isDarkMode} = useDarkMode()
  return <>
  <ButtonIcon onClick={handleDarkToggle}>
   { isDarkMode ? <HiOutlineSun/>   : <HiOutlineMoon/>}
  </ButtonIcon>
  </>
}
