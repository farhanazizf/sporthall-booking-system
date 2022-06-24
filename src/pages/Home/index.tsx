import { Button } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import MainLayout from "../../components/main-layout";
import Styled from "./style";
import Card from "./_card";
import CardCategory from "./_mini-card";

export const listVenue = [
  {
    id: "4f11d1b1-44e5-4e6b-8e49-b81e83042e2c",
    category: "futsal",
    price: 200000,
    picture:
      "https://i.pinimg.com/originals/bf/61/bd/bf61bd125649fbdb1d0aeaaac6b23c93.jpg",
    title: "Lapangan Futsal A",
  },
  {
    id: "4f11d1b1-44e5-4e6b-8e49-b81e83042e3c",
    category: "futsal",
    price: 200000,
    picture:
      "https://i.pinimg.com/originals/bf/61/bd/bf61bd125649fbdb1d0aeaaac6b23c93.jpg",
    title: "Lapangan Futsal B",
  },
  {
    id: "6a0c5c67-65e7-4b4f-951c-e8085cb62253",
    category: "basket",
    price: 200000,
    picture:
      "https://www.versacourt.com/cmss_files/imagelibrary/Header_Images/20-basketball-blue.jpg",
    title: "Lapangan Basket Outdoor A",
  },
  {
    id: "6a0c5c67-65e7-4b4f-951c-e8085cb62254",
    category: "basket",
    price: 200000,
    picture:
      "https://www.versacourt.com/cmss_files/imagelibrary/Header_Images/20-basketball-blue.jpg",
    title: "Lapangan Basket Outdoor B",
  },
  {
    id: "6a0c5c67-65e7-4b4f-951c-e8085cb62255",
    category: "basket",
    price: 300000,
    picture:
      "https://gelora-public-storage.s3-ap-southeast-1.amazonaws.com/upload/public-20211103125636.jpg",
    title: "Lapangan Basket Indoor",
  },
  {
    id: "9b2acf0c-d71f-4cd3-ab32-5abf9b56b2c2",
    category: "badminton",
    price: 100000,
    picture: "https://i.ytimg.com/vi/Ui9OGlDX8-A/maxresdefault.jpg",
    title: "Lapangan Badminton A",
  },
  {
    id: "9b2acf0c-d71f-4cd3-ab32-5abf9b56b2c3",
    category: "badminton",
    price: 100000,
    picture: "https://i.ytimg.com/vi/Ui9OGlDX8-A/maxresdefault.jpg",
    title: "Lapangan Badminton B",
  },
  {
    id: "9b2acf0c-d71f-4cd3-ab32-5abf9b56b2c4",
    category: "badminton",
    price: 100000,
    picture: "https://i.ytimg.com/vi/Ui9OGlDX8-A/maxresdefault.jpg",
    title: "Lapangan Badminton C",
  },
  {
    id: "9b2acf0c-d71f-4cd3-ab32-5abf9b56b2c5",
    category: "badminton",
    price: 100000,
    picture: "https://i.ytimg.com/vi/Ui9OGlDX8-A/maxresdefault.jpg",
    title: "Lapangan Badminton D",
  },
];

export const listMenu = [
  {
    title: "All Venue",
    logo: "https://leverageedu.com/blog/wp-content/uploads/2019/06/Career-in-Sports-01.png",
    venue: listVenue.length,
    category: "all",
  },
  {
    title: "Futsal",
    logo: "https://mmc.tirto.id/image/otf/500x0/2022/01/22/istock-1208563153_ratio-16x9.jpg",
    venue: listVenue.filter((val) => val.category === "futsal").length,
    category: "futsal",
  },
  {
    title: "Basket",
    logo: "https://i.eurosport.com/2017/10/23/2193314-45823610-2560-1440.jpg",
    venue: listVenue.filter((val) => val.category === "basket").length,
    category: "basket",
  },
  {
    title: "Badminton",
    logo: "https://japanese.binus.ac.id/files/2019/04/badminton.jpg",
    venue: listVenue.filter((val) => val.category === "badminton").length,
    category: "badminton",
  },
  {
    title: "Sepak Bola",
    logo: "https://img.olympicchannel.com/images/image/private/t_social_share_thumb/f_auto/primary/qjxgsf7pqdmyqzsptxju",
    venue: "1",
    category: "bola",
  },
  // {
  //   title: "Renang",
  //   logo: "https://media.istockphoto.com/photos/competitive-swimming-picture-id140469717?k=20&m=140469717&s=612x612&w=0&h=gtPRxrz2Ek1qTajNYyAr0Frfz4MpnYnsd5plUjOc35E=",
  //   venue: "1",
  //   category: "renang",
  // },
  // {
  //   title: "Voli",
  //   logo: "https://img.onmanorama.com/content/dam/mm/en/sports/other-sports/images/2021/7/7/volleyball-shutterstock.jpg",
  //   venue: "4",
  //   category: "volley",
  // },
];

const Homepage: React.FC = () => {
  const history = useHistory();
  const [category, setCategory] = React.useState("all");

  const handleCategory = (category: string) => {
    setCategory(category);
  };

  return (
    <MainLayout>
      <Styled.SectionBanner>
        <img src="https://via.placeholder.com/2000x500" alt="gambars" />
      </Styled.SectionBanner>

      <Styled.SectionCategory>
        <Styled.TitleSectionWrapper>
          <h3>Kategori Olahraga</h3>
        </Styled.TitleSectionWrapper>

        <Styled.CategoryWrapper>
          {listMenu.map((val, i) => (
            <CardCategory
              name={val.title}
              key={i}
              logo={val.logo}
              venue={val.venue}
              onClick={() => handleCategory(val.category)}
            />
          ))}
        </Styled.CategoryWrapper>
      </Styled.SectionCategory>

      <Styled.SectionVenue>
        <Styled.TitleSectionWrapper>
          <h2>
            Our Best {category === "all" ? "Sports" : category.toUpperCase()}{" "}
            Venue
          </h2>

          <p>Feels the different vibes of this sports venues</p>
        </Styled.TitleSectionWrapper>

        <Styled.ItemWrapper>
          {listVenue
            .filter((vals) =>
              category === "all" ? vals : vals.category === category
            )
            .map((val, i) => (
              <Card
                name={val.title}
                key={i}
                category={val.category}
                picture={val.picture}
                onClick={() => history.push("/detail", val)}
              />
            ))}
        </Styled.ItemWrapper>
        <div className="w-100 d-flex my-5" style={{ justifyContent: "center" }}>
          <Button
            variant="outlined"
            size="large"
            style={{
              borderRadius: 8,
              borderColor: "darkgreen",
              color: "darkgreen",
            }}
          >
            Lihat Lebih Banyak
          </Button>
        </div>
      </Styled.SectionVenue>
    </MainLayout>
  );
};

export default Homepage;
