import { Divider } from "@mui/material";
import React from "react";
// import logo from "../../assets/wq.jpeg";
import Styled from "./style";
// import Basketball from "../../assets/basketball.png";

interface IType {
  name: string;
  venue: string | number;
  logo: string;
  onClick: () => void;
}

const CardCategory: React.FC<IType> = ({ name, logo, venue, onClick }) => {
  return (
    <Styled.CardCategoryWrapper onClick={onClick}>
      <Styled.ImgWrapper>
        <img src={logo} alt={name} />
      </Styled.ImgWrapper>
      <Styled.DescriptionWrap>
        <p className="title">{name}</p>
        <Divider />

        <p className="amount">{venue} lapangan</p>
      </Styled.DescriptionWrap>
    </Styled.CardCategoryWrapper>
  );
};

export const CardIconCategory: React.FC<IType> = ({
  name,
  logo,
  venue,
  onClick,
}) => {
  return (
    <Styled.CardIconWrapper onClick={onClick}>
      <Styled.IconWrapper>
        <img src={logo} alt={name} />
        <p className="title">{name}</p>
      </Styled.IconWrapper>
    </Styled.CardIconWrapper>
  );
};

export default CardCategory;
