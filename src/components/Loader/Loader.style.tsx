import styled from "styled-components";

const Container = styled.section`
  &#app-loader {
    display: none;
  }

  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 11;
  background-color: rgb(255 255 255 / 70%);
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100px;
    height: 100px;
  }
`;

export default Container;