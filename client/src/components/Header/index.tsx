import React from "react";
import styled from "styled-components";
import { useDarkMode } from "use-dark-mode-ts";

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: end;
  background-color: ${(props) => props.theme.colors.SATIN_BLACK};
  color: ${(props) => props.theme.colors.ALMOST_WHITE};
  padding: 1.25rem 2rem;
  border-left: 2px solid ${(props) => props.theme.colors.CLOSE_BLACK};
`;


const Header = () => {
  const darkMode = useDarkMode();
  return (
    <HeaderContainer>
      <h1>Header</h1>
    </HeaderContainer>
  );
};

export default Header;
