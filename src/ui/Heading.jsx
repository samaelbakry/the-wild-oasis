import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.type === "h1" &&
    css`
      font-size: 25px;
      font-weight: 800;
    `}

  ${(props) =>
    props.type === "h2" &&
    css`
      font-size: 22px;
      font-weight: 700;
    `}

  ${(props) =>
    props.type === "h3" &&
    css`
      font-size: 15px;
      font-weight: 700;
      text-align: center;
    `}

`;

export default Heading;