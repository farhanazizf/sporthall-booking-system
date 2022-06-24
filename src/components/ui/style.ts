import styled from "styled-components/macro";

export const Label = styled.label`
  margin: 20px 20px;
  // height: fit-content;
  // position: absolute;
  // padding-left: 45px;
  // top: 0;
  // bottom: 0;
  // z-index: 3;
  // display: 'block';
`;

export const MarginBottom = styled.div`
  margin-bottom: 1rem;
`;

export const ErrorText = styled.p`
  margin: 5px 0;
  color: red;
  font-size: 13px;
`;

const Styled = {
  Row: styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px 0 30px;
  `,
};

export default Styled;
