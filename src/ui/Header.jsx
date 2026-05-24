import styled from "styled-components"
import Logout from "../features/authentication/Logout"

const StyledHeader = styled.header`
background-color: var(--color-grey-200);
padding: 2rem;
`
export default function Header() {
  return <>
  <StyledHeader>
    <h1>header</h1>
    <Logout/>
  </StyledHeader>
  </>
}
