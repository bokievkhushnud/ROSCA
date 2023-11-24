import styled from "styled-components";

const Container = styled.div`
  position: sticky;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.SATIN_BLACK};
  color: ${(props) => props.theme.colors.ALMOST_WHITE};
  width: 30%;
  padding: 1.25rem 2rem 1.25rem 1.25rem;

`;

const Logo = styled.div`
  display: flex;
  font-size: 2rem;
  font-weight: ${props => props.theme.fontweight.BOLD};
`;

const SideBar = () => {
  return (
    <Container>
      <Logo>GAJA</Logo>
    </Container>
  );
};

export default SideBar;
