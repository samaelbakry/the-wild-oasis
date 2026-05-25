import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import Logout from "../features/authentication/Logout";
import { HiOutlineUser } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import ToogleModeButton from "./ToogleModeButton";

const StyledList = styled.ul`
  display: flex;
  gap: 0.4rem;
`;
export default function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <>
      <StyledList>
        <li>
          <ButtonIcon onClick={() => navigate("/account")}>
            <HiOutlineUser />
          </ButtonIcon>
        </li>
        <li>
          <ToogleModeButton />
        </li>
        <li>
          <Logout />
        </li>
      </StyledList>
    </>
  );
}
