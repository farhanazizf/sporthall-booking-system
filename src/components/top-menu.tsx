import { Container } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { KeyboardArrowDown } from "@mui/icons-material";

const Styled = {
  TopWrapper: styled.div`
    background: #f5f5f5;
    padding: 10px 20px;
    p {
      margin: 0;
    }
  `,
  Container: styled(Container)`
    &&& {
      display: flex;
    }
  `,
  FlexWrapper: styled.div<{ justify: string }>`
    display: flex;
    width: 33%;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    p {
      margin: 0 10px;
      cursor: pointer;
    }
    svg {
      cursor: pointer;
    }
  `,
};

const TopMenu: React.FC = () => {
  return (
    <Styled.TopWrapper>
      <Styled.Container maxWidth="lg">
        <Styled.FlexWrapper justify="start">
          <p>Indonesia</p>
          <KeyboardArrowDown />
        </Styled.FlexWrapper>
        <Styled.FlexWrapper justify="center">
          {/* <LocalShippingOutlined /> */}
          <p>Praktis</p>
          <p>Pembayaran Mudah</p>
          <p>Pembayaran Mudah</p>
        </Styled.FlexWrapper>
        <Styled.FlexWrapper justify="end">
          {/* <p>Shipping</p> */}
          <p>FAQ</p>
          <p>Contact</p>
        </Styled.FlexWrapper>
      </Styled.Container>
    </Styled.TopWrapper>
  );
};

export default TopMenu;
