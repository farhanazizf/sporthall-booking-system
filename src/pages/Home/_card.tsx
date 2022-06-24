import { Chip, Divider } from "@mui/material";
import { Star, StarOutline } from "@mui/icons-material";

import React from "react";
import logo from "../../assets/wq.jpeg";
import Styled from "./style";

interface IType {
  name: string;
  category?: string;
  price?: string | number;
  picture?: string;
  onClick: () => void;
}

const Card: React.FC<IType> = ({ name, picture, category, onClick }) => {
  return (
    <Styled.CardItemWrap onClick={onClick}>
      <Styled.Item>
        <img src={picture || logo} alt={name} />
      </Styled.Item>
      <Styled.TextWrap>
        {category && (
          <Chip
            label={category.toUpperCase()}
            variant="outlined"
            color="primary"
            style={{
              width: "fit-content",
              marginBottom: 8,
              background: "darkgreen",
              color: "white",
            }}
          />
        )}

        <p style={{ fontSize: 14, marginBottom: 5 }}>{name}</p>
        <p
          className="text-secondary"
          style={{ fontSize: 10, color: "#f5f5f5" }}
        >
          ini adalah lapangan yang .... dan ..... pernah dipakai ajang bergengsi
          sekelas ....
        </p>
        <Divider light />
        <div
          className="d-flex align-items-center"
          style={{ justifyContent: "center" }}
        >
          <div className="d-flex " style={{ alignItems: "center" }}>
            <Star color="warning" />
            <Star color="warning" />
            <Star color="warning" />
            <StarOutline />
          </div>

          <p
            style={{
              fontSize: 12,
              margin: 0,
              fontWeight: 300,
              width: "40%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            8 review
          </p>
        </div>
      </Styled.TextWrap>
    </Styled.CardItemWrap>
  );
};

export default Card;
