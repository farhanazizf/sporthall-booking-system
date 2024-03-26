import styled from "styled-components/macro";

const Styled = {
  Wrapper: styled.div``,

  SectionBanner: styled.section`
    margin-bottom: 36px;
    display: flex;
    flex-direction: column;
    max-width: 100vw;
    height: 300px;
    overflow: hidden;
  `,

  SectionHeader: styled.section``,

  ModalWrapper: styled.div`
    padding: 10px 12px;
  `,

  SectionQRIS: styled.section`
    display: flex;
    flex-direction: column;
    max-width: 200px;
    max-height: 100px;
    overflow: hidden;
  `,

  SectionMethod: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `,

  TextUniqueCode: styled.p`
    margin: 0;
    font-size: 32px;
    font-weight: bold;
    text-align: center;
  `,
};

export default Styled;
