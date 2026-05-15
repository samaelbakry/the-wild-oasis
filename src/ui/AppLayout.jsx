import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";
import styled from "styled-components";

const StyledApp = styled.div`
display: grid;
grid-template-columns: 26rem  1fr;
grid-template-rows: auto 1fr ;
height: 100vh;
`
const Main= styled.main`
background-color: var(--color-grey-50);
padding: 4rem ;
`

export default function AppLayout() {
  return (
    <StyledApp>
    <SideBar/>
    <Header/>
      <Main>
        <Outlet />
      </Main>
    </StyledApp>
  );
}
