import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiDotsVertical } from "react-icons/hi";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;
const MenuContext = createContext();

export default function Menus({ children }) {
  const [openMenuId, setOpenMenuId] = useState("");
  const [position, setPosition] = useState(null);
  const open = setOpenMenuId;
  const close = () => setOpenMenuId("");

  return (
    <MenuContext.Provider
      value={{ open, close, openMenuId, setPosition, position }}
    >
      {children}
    </MenuContext.Provider>
  );
}

Menus.propTypes = {
  children: PropTypes.node,
};

function Toggle({ id }) {
  const { openMenuId, close, open, setPosition } = useContext(MenuContext);

  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.height + rect.y + 8,
    });

    openMenuId == "" || openMenuId !== id ? open(id) : close();
  }
  return (
    <>
      <StyledToggle onClick={handleClick}>
        <HiDotsVertical />
      </StyledToggle>
    </>
  );
}

function List({ id, children }) {
  const { openMenuId, position , close } = useContext(MenuContext);
   const ref = useOutsideClick(close ,false);
  if (openMenuId !== id) return null;

  return createPortal(
    <StyledList ref={ref} position={position}>{children}</StyledList>,
    document.body,
  );
}

function Button({ children, icon, onClick }) {

  function handleClick() {
    onClick?.();
  }
  return (
    <>
      <li>
        <StyledButton  onClick={handleClick}>
          {icon}
          {children}
        </StyledButton>
      </li>
    </>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.node,
  onClick: PropTypes.func,
};
List.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
};
Toggle.propTypes = {
  id: PropTypes.string,
};

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
