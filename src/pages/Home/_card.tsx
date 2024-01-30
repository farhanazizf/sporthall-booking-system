import { Divider } from "@mui/material";
import { Place, HomeWork } from "@mui/icons-material";

import React from "react";
import logo from "../../assets/wq.jpeg";
import Styled from "./style";

interface IType {
  name: string;
  category: string;
  price?: string | number;
  picture?: string;
  city?: string;
  onClick: () => void;
}

const getCover = (type: string) => {
  switch (type) {
    case "BASKETBALL":
      return "https://blog.nasm.org/hubfs/Training%20Basketball%20Players-1.jpg";
    case "FUTSAL":
      return "https://asset.ayo.co.id/photos/62106/1.%20Keuntungan%20Sparring%20Futsal%20dalam%20Meningkatakan%20Kualitas%20Permainan.jpg";
    case "MINISOCCER":
      return "https://gelora-public-storage.s3-ap-southeast-1.amazonaws.com/upload/public-20230110035949.jpg";
    default:
      return "https://sportsvenuecalculator.com/wp-content/uploads/2022/11/Sponsor-6.jpg";
  }
};

const Card: React.FC<IType> = ({ name, picture, category, city, onClick }) => {
  return (
    <Styled.CardItemWrap onClick={onClick}>
      <Styled.Item>
        <img src={getCover(category) || logo} alt={name} />
      </Styled.Item>
      <Styled.TextWrap>
        {category && (
          <Styled.Chip label={category} variant="outlined" color="primary" />
        )}

        <p style={{ fontSize: 14, marginBottom: 0 }}>{name}</p>
        <div
          className="d-flex"
          style={{ alignItems: "center", marginBottom: 4 }}
        >
          <Place color="action" style={{ fontSize: 12 }} />
          <span style={{ fontSize: 12, fontWeight: 400, color: "#6D7588" }}>
            {"GaneshArena"} - {city || "Karawang"}
          </span>
        </div>
        <div
          className="d-flex"
          style={{ alignItems: "center", marginBottom: 8 }}
        >
          <HomeWork color="action" style={{ fontSize: 12, marginRight: 4 }} />
          <span style={{ fontSize: 12, fontWeight: 400, color: "#6D7588" }}>
            {city || " Karawang"}
          </span>
        </div>
        {/* <p
          className="text-secondary"
          style={{ fontSize: 10, color: "#f5f5f5" }}
        >
          ini adalah lapangan yang .... dan ..... pernah dipakai ajang bergengsi
          sekelas ....
        </p> */}

        <Divider light />

        <div className="d-flex " style={{ justifyContent: "flex-end" }}>
          {/* <div className="d-flex " style={{ alignItems: "center" }}>
            <Star color="warning" />
            <Star color="warning" />
            <Star color="warning" />
            <StarOutline />
          </div> */}

          <p
            style={{
              fontSize: 12,
              margin: 0,
              fontWeight: 300,
              display: "flex",
              color: "#6D7588",
            }}
          >
            8 Booking berhasil
          </p>
        </div>
      </Styled.TextWrap>
    </Styled.CardItemWrap>
  );
};

export default Card;
