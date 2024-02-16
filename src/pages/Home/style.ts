import { Chip } from "@mui/material";
import styled from "styled-components/macro";

const Styled = {
  Wrapper: styled.div`
    padding: 63px 545px;

    p {
      margin: 0;
      font-weight: 700;
      font-size: 45px;
    }
  `,

  SectionBanner: styled.section`
    margin-bottom: 36px;
    display: flex;
    flex-direction: column;
    max-width: 100%;
    padding-top: 2.5%;
  `,

  ItemWrapper: styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0;
    justify-content: center;
  `,

  CardItemWrap: styled.div`
    cursor: pointer;
    border-radius: 16px;
    margin: 12px;
    cursor: pointer;
    // background: lightgrey;
    height: 350px;
    min-width: 305px;
    max-width: 305px;
    border: 1px solid rgb(196, 196, 196);
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
  `,

  Item: styled.div`
    // background: #f6f6f6;
    border-radius: 16px 16px 0 0;
    // width: 295px;
    height: 65%;
    max-height: 195px;
    display: flex;
    flex-direction: row;
    // align-items: center;
    justify-content: center;

    img {
      border-radius: 16px 16px 0 0;
      width: 100%;
    }
  `,
  TextWrap: styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 8px;
    p {
      font-weight: 600;
    }

    div {
      width: 100%;
      // text-align: center;
      font-weight: 500;
      color: #121212;
      // font-size: 24px;
    }
  `,
  FlexContainer: styled.div`
    display: flex;
    flex-wrap: wrap;
  `,
  SkeletonWrapper: styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 20;
  `,

  SectionCategory: styled.section`
    margin: 36px 0;
  `,

  CategoryWrapper: styled.section`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding: 24px 0;
    justify-content: center;
  `,

  CardCategoryWrapper: styled.div`
    cursor: pointer;
    border-radius: 16px;
    height: 200px;
    min-width: 350px;
    max-width: 350px;
    border: 1px solid rgb(196, 196, 196);
    background: #f5f5f5;
    margin: 0 12px;
  `,

  ImgWrapper: styled.div`
    max-width: 100%;
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    img {
      border-radius: 16px 16px 0 0;
      // width: 100%;
      height: 100%;
    }
  `,

  DescriptionWrap: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 8px;
    height: 30%;
    border-top: 1px solid black;
    p {
      margin: 0;
      font-size: 14px;
    }

    p.title {
      font-size: 18px;
      font-weight: 600;
    }
  `,

  SectionVenue: styled.section`
    margin: 36px 0;
  `,

  TitleSectionWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,

  CardIconWrapper: styled.div`
    cursor: pointer;
    border-radius: 16px;
    // height: 200px;
    // min-width: 350px;
    max-width: 10%;
    border: 1px solid rgb(196, 196, 196);
    // background: #f5f5f5;
    margin: 0 12px;
    padding: 8px;

    .title {
      font-size: 16px;
      font-weight: 500;
      margin-top: 8px;
      text-align: center;
    }
  `,

  IconWrapper: styled.div`
    // width: 10%;
    // height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    img {
      border-radius: 16px 16px 0 0;
      // width: 100%;
      height: 100%;
    }
  `,

  Chip: styled(Chip)`
    &&& {
      width: fit-content;
      margin-bottom: 8px;
      background: darkgreen;
      padding: 1;
      font-size: 11;
      color: white;
      text-transform: uppercase;
    }
  `,
};

export default Styled;
