import React from "react";
import { SkinOutlined } from "@ant-design/icons";
import styled from "styled-components";

const StyledBottom = styled.div`
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
`;

const BottomBar = () => {
  return (
    <StyledBottom>
      <p>
        {" "}
        <SkinOutlined />
        S.C.T
      </p>
    </StyledBottom>
  );
};

export default BottomBar;
