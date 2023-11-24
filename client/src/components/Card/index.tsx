import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.SATIN_BLACK};
  color: ${(props) => props.theme.colors.ALMOST_WHITE};
  padding: 1.25rem 1rem;
  border-radius: 0.5rem;
  border: 2px solid ${(props) => props.theme.colors.CLOSE_BLACK};
`;

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};

export default Card;
