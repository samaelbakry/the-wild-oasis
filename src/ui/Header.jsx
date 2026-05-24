import styled from "styled-components"
import HeaderMenu from "./HeaderMenu"
import UserAvatar from "../features/authentication/UserAvatar"


const StyledHeader = styled.header`
background-color: var(--color-grey-100);
padding: 4rem;
display: flex;
justify-content: flex-end;
align-items: center;
gap: 1rem;
`
export default function Header() {
  return <>
  <StyledHeader>
    <UserAvatar/>
    <HeaderMenu/>
  </StyledHeader>
  </>
}
