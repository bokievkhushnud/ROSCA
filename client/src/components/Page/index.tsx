import React from "react";
import Header from "../Header";
import SideBar from "../SideBar";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.CLOSE_BLACK};
  color: ${(props) => props.theme.colors.ALMOST_WHITE};
`;

const Title = styled.h1`
  text-align: start;
  font-size: 2.5rem;
  font-weight: ${(props) => props.theme.fontweight.BOLD};
  margin-bottom: 1.5rem;
`;

const Content = styled.div`
  padding: 2rem;
  
`;

interface PageProps {
  children: React.ReactNode;
  title?: string;
}

const Page: React.FC<PageProps> = ({ children, title }) => {
  return (
    <Container>
      <SideBar />
      <InnerContainer>
        <Header />
        <Content>
          {title && <Title>{title}</Title>}
          {children}
        </Content>
      </InnerContainer>
    </Container>
  );
};

export default Page;
