import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { Header } from './Header/Header';

const MainCustom = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 100vh;
  margin: 0 auto;
`;

const Main = () => {
  return (
    <>
      <Header/>
      <MainCustom>
        <Outlet/>
      </MainCustom>
    </>
  );
}

export { Main };
