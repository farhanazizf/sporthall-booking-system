import { Button } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import MainLayout from "../../components/main-layout";
import Styled from "./style";
import Card from "./_card";
import { CardIconCategory } from "./_mini-card";
import Basketball from "../../assets/basketball.png";
import Badminton from "../../assets/badminton.png";
import Minsoc from "../../assets/football-ball (3).png";
import Football from "../../assets/football-ball (1).png";
import Futsal from "../../assets/football-ball (2).png";
import Field from "../../assets/football-field.png";
import http from "../../utils/http";
import { FilterTypes, IArena, IResponseArenaList } from "./interface";
import useToast from "../../components/toast";

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
    logo: Field,
    venue: listVenue.length,
    category: "all",
  },

  {
    title: "Basket",
    logo: Basketball,
    venue: listVenue.filter((val) => val.category === "basket").length,
    category: "BASKETBALL",
  },
  {
    title: "Badminton",
    logo: Badminton,
    venue: listVenue.filter((val) => val.category === "badminton").length,
    category: "BADMINTON",
  },
  {
    title: "Futsal",
    logo: Futsal,
    venue: listVenue.filter((val) => val.category === "futsal").length,
    category: "FUTSAL",
  },
  {
    title: "Mini Soccer",
    logo: Minsoc,
    venue: "1",
    category: "MINISOCCER",
  },
  {
    title: "Sepak Bola",
    logo: Football,
    venue: "1",
    category: "FOOTBALL",
  },
];

const Homepage: React.FC = () => {
  const [Toast, setToast] = useToast();

  const history = useHistory();
  const [loading, setLoading] = React.useState(false);
  const [category, setCategory] = React.useState("all");
  const [filter, setFilter] = React.useState<FilterTypes>({
    limit: 3,
    offset: 0,
    page: 1,
  });
  const [arena, setArena] = React.useState<IArena[]>([]);
  const [total, setTotal] = React.useState(0);

  const getArenaList = async (categories?: string) => {
    try {
      setLoading(true);
      const { data } = await http.get<IResponseArenaList>(`/arena`, {
        params: categories
          ? { offset: 0, category: categories }
          : { ...filter, category: category === "all" ? "" : category },
      });
      if (!categories) {
        setArena(arena.length > 0 ? [...arena, ...data.data] : data.data);
      } else {
        setArena(data.data);
      }
      setTotal(data.meta.total);
    } catch (error) {
      setToast({ message: "Error get data" });
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  React.useEffect(() => {
    getArenaList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleCategory = (category: string) => {
    setCategory(category);
    getArenaList(category);
  };

  const onLoadMore = () => {
    setFilter({ ...filter, offset: arena.length });
  };

  return (
    <MainLayout>
      <Toast />
      <Styled.SectionBanner>
        <img src="https://placehold.co/2000x500" alt="gambars" />
      </Styled.SectionBanner>

      <Styled.SectionCategory>
        <Styled.TitleSectionWrapper>
          <h3>Kategori Olahraga</h3>
        </Styled.TitleSectionWrapper>

        <Styled.CategoryWrapper>
          {listMenu.map((val, i) => (
            <CardIconCategory
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

        {/* <Styled.ItemWrapper>
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
        </Styled.ItemWrapper> */}

        <Styled.ItemWrapper>
          {arena.length > 0 ? (
            arena.map((val, i) => (
              <Card
                name={val.name}
                key={i}
                category={val.category}
                picture={val.image || ""}
                onClick={() => history.push(`/detail/${val.id}`, val)}
                city={val.city}
              />
            ))
          ) : (
            <p>Empty Venue available right now.</p>
          )}
        </Styled.ItemWrapper>
        {arena.length > 0 && arena.length < total ? (
          <div
            className="w-100 d-flex my-5"
            style={{ justifyContent: "center" }}
          >
            <Button
              variant="outlined"
              size="large"
              style={{
                borderRadius: 8,
                borderColor: "darkgreen",
                color: "darkgreen",
              }}
              onClick={onLoadMore}
            >
              Lihat Lebih Banyak
            </Button>
          </div>
        ) : null}
      </Styled.SectionVenue>
    </MainLayout>
  );
};

export default Homepage;
