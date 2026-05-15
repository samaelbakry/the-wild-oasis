import styled from "styled-components";
import Logo from "./Logo"
import MainNav from "./MainNav"

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-100);
  padding: 4rem;
  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

export default function SideBar() {
  return <StyledSidebar>
    <Logo />
    <MainNav />
  </StyledSidebar>;
}
