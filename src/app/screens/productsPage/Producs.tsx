import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "../../../css/product.css";

const products = [
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Set-Menu", imagePath: "/img/burak-set.webp" },
  { productName: "Kebab", imagePath: "/img/kebab.webp" },
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
  { productName: "Burger", imagePath: "/img/burger.webp" },
  { productName: "Steak", imagePath: "/img/Steak.webp" },
  { productName: "Kebab", imagePath: "/img/kebab1.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
];

const categories = ["Dish", "Salad", "Drink", "Dessert", "Other"];

const brands = [
  { name: "Burak Gurme", imagePath: "/img/gurme.webp" },
  { name: "Burak Seafood", imagePath: "/img/seafood.webp" },
  { name: "Burak Sweets", imagePath: "/img/sweets.webp" },
  { name: "Burak Doner", imagePath: "/img/doner.webp" },
];

export default function Products() {
  return (
    <div className="products">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className={"avatar-big-box"}>
            <Box className={"title"}>Burak Restaurant</Box>
            <Stack className={"search-box"}>
              <input
                type="search"
                className={"single-search-input"}
                name={"singleResearch"}
                placeholder={"Type here"}
              />
              <Button
                variant={"contained"}
                className={"single-button-search"}
                endIcon={<SearchIcon />}
              >
                Search
              </Button>
            </Stack>
          </Stack>

          <Stack className={"dishes-filter-section"}>
            <Button variant={"contained"} className={"order"}>New</Button>
            <Button variant={"contained"} className={"order"}>Price</Button>
            <Button variant={"contained"} className={"order"}>Views</Button>
          </Stack>

          <Stack className={"list-category-section"}>
            <Stack className={"product-category"}>
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant={"contained"}
                  className={index === 0 ? "category active" : "category"}
                >
                  {category}
                </Button>
              ))}
            </Stack>

            <Stack className={"product-wrapper"}>
              {products.length !== 0 ? (
                products.map((product, index) => (
                  <Stack key={index} className={"product-card"}>
                    <Stack
                      className={"product-img"}
                      sx={{ backgroundImage: `url(${product.imagePath})` }}
                    >
                      <div className={"product-sale"}>Large size</div>
                      <Button className={"shop-btn"}>
                        <ShoppingCartIcon sx={{ fontSize: 18 }} />
                      </Button>
                      <Button className={"view-btn"} sx={{ right: "20px" }}>
                        <Badge badgeContent={20} color="secondary">
                          <RemoveRedEyeIcon sx={{ fontSize: 18, color: "#fff" }} />
                        </Badge>
                      </Button>
                    </Stack>
                    <Box className={"product-desc"}>
                      <span className={"product-title"}>{product.productName}</span>
                      <div className={"product-price"}>
                        <MonetizationOnIcon sx={{ fontSize: 18 }} />
                        <span>15</span>
                      </div>
                    </Box>
                  </Stack>
                ))
              ) : (
                <Box className={"no-data"}>Products are not available!</Box>
              )}
            </Stack>
          </Stack>

          <Stack className={"pagination-section"}>
            <Pagination
              count={3}
              page={1}
              renderItem={(item) => (
                <PaginationItem
                  components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                  {...item}
                  color={"secondary"}
                />
              )}
            />
          </Stack>
        </Stack>
      </Container>

      <div className={"brands-logo"}>
        <Container>
          <Box className={"category-title"}>Our Family Brands</Box>
          <Stack className={"brand-list"}>
            {brands.map((brand, index) => (
              <Box key={index} className={"review-box"}>
                <img src={brand.imagePath} alt={brand.name} />
              </Box>
            ))}
          </Stack>
        </Container>
      </div>

      <div className={"address"}>
        <Container>
          <Stack className={"address-area"}>
            <Box className={"category-title"}>Our address</Box>
            <iframe
              title="Burak restaurant location"
              style={{ marginTop: "60px" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.4!2d69.2401!3d41.3111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE4JzQwLjAiTiA2OcKwMTQnMjQuMCJF!5e0!3m2!1sen!2s!4v1700000000000"
              width="1320"
              height="500"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
