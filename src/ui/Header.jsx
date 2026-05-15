import styled from "styled-components"

const StyledHeader = styled.header`
background-color: var(--color-grey-0);
border: 1px black solid;
padding: 2rem;
`
export default function Header() {
  return <>
  <StyledHeader>
    <h1>header</h1>
  </StyledHeader>
  </>
}
