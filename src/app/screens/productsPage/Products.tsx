import React, { ChangeEvent, useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "./slice";
import { createSelector } from "@reduxjs/toolkit";
import { retrieveProducts } from "./selector";
import { Product, ProductInquiry } from "../../../lib/types/product";
import "../../../css/product.css";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

const collections: { value: ProductCollection; label: string }[] = [
  { value: ProductCollection.DISH, label: "Dish" },
  { value: ProductCollection.SALAD, label: "Salad" },
  { value: ProductCollection.DRINK, label: "Drink" },
  { value: ProductCollection.DESSERT, label: "Dessert" },
  { value: ProductCollection.OTHER, label: "Other" },
];

interface ProductsProps {
  onAdd: ( item: CartItem ) => void;
}

export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const dispatch = useDispatch();
  const { products } = useSelector(productsRetriever);
  const productList = Array.isArray(products) ? products : [];
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.DISH,
    search: "",
  });

  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => dispatch(setProducts(data)))
      .catch((err) => console.log(err));
  }, [dispatch, productSearch]);

  useEffect(() => {
  if (searchText === "" && productSearch.search !== "") {
    setProductSearch({ ...productSearch, search: "" });
  }
}, [searchText]);


  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  }

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  }

  <Stack className={"product-category"}>
  <Button
    variant={"contained"}
    color={productSearch.productCollection === ProductCollection.DISH ? "primary" : "secondary"}
    onClick={() => searchCollectionHandler(ProductCollection.DISH)}
  >
    Dish
  </Button>
  <Button
  variant={"contained"}
  color={productSearch.productCollection === ProductCollection.SALAD ? "primary" : "secondary"}
  onClick={() => {
    alert("SALAD");
    searchCollectionHandler(ProductCollection.SALAD);
  }}
>
  Salad
</Button>
  <Button
    variant={"contained"}
    color={productSearch.productCollection === ProductCollection.DRINK ? "primary" : "secondary"}
    onClick={() => {
      alert("DRINK");
      searchCollectionHandler(ProductCollection.DRINK);
    }}
  >
    Drink
  </Button>
  <Button
    variant={"contained"}
    color={productSearch.productCollection === ProductCollection.DESSERT ? "primary" : "secondary"}
    onClick={() => {
      alert("DESSERT");
      searchCollectionHandler(ProductCollection.DESSERT);
    }}
  >
    Dessert
  </Button>
  <Button
    variant={"contained"}
    color={productSearch.productCollection === ProductCollection.OTHER ? "primary" : "secondary"}
    onClick={() => {
      alert("OTHER");
      searchCollectionHandler(ProductCollection.OTHER);
    }}
  >
    Other
  </Button>
</Stack>

  const brands = [
    { name: "Burak Gurme", imagePath: "/img/gurme.webp" },
    { name: "Burak Seafood", imagePath: "/img/seafood.webp" },
    { name: "Burak Sweets", imagePath: "/img/sweets.webp" },
    { name: "Burak Doner", imagePath: "/img/doner.webp" },
  ];

const searchProductHandler = () => {
  productSearch.page = 1;
  productSearch.search = searchText;
  setProductSearch({ ...productSearch });
};

const paginationHandler = (e: ChangeEvent<any>, value: number) => {
  productSearch.page = value;
  setProductSearch({ ...productSearch });
};

const chooseDishHandler = (id: string) => {
  history.push(`/products/${id}`);
}

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
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") searchProductHandler();
                }}
              />
              <Button
                variant={"contained"}
                className={"single-button-search"}
                endIcon={<SearchIcon />}
                onClick={searchProductHandler}
              >
                Search
              </Button>
            </Stack>
          </Stack>

          <Stack className={"dishes-filter-section"}>
            <Button
              variant={"contained"}
              className={"order"}
              color={
                productSearch.order === "createdAt" ? "primary" : "secondary"
              }
              onClick={() => searchOrderHandler("createdAt")}
            >
              New
            </Button>
            <Button
              variant={"contained"}
              className={"order"}
              color={productSearch.order === "price" ? "primary" : "secondary"}
              onClick={() => searchOrderHandler("productPrice")}
            >
              Price
            </Button>
            <Button
              variant={"contained"}
              className={"order"}
              color={productSearch.order === "views" ? "primary" : "secondary"}
              onClick={() => searchOrderHandler("productViews")}
            >
              Views
            </Button>
          </Stack>

          <Stack className={"list-category-section"}>
            <Stack className={"product-category"}>
              {collections.map((c) => (
                <Button
                  key={c.value}
                  variant={"contained"}
                  className={
                    productSearch.productCollection === c.value
                      ? "category active"
                      : "category"
                  }
                  onClick={() => searchCollectionHandler(c.value)}
                >
                  {c.label}
                </Button>
              ))}
            </Stack>

            <Stack className={"list-category-section"}>
              <Stack className={"product-wrapper"}>
                {productList.length !== 0 ? (
                  productList.map((product: Product) => {
                    const firstImage = product.productImages?.[0];
                    const isLavash = product.productName
                      .toLowerCase()
                      .includes("lavash");
                    const imagePath = firstImage
                      ? `${serverApi}/${firstImage}`
                      : isLavash
                        ? "/img/lavash.webp"
                        : "/icons/noimage-list.svg";
                    const sizeVolume =
                      product.productCollection === ProductCollection.DRINK
                        ? product.productVolume + "litre"
                        : product.productSize + "size";
                    return (
                      <Stack
                        key={product._id}
                        className={"product-card"}
                        onClick={() => {
                          chooseDishHandler(product._id);
                        }}
                      >
                        <Stack
                          className={"product-img"}
                          sx={{ backgroundImage: `url(${imagePath})` }}
                        >
                          <div className={"product-sale"}>{sizeVolume}</div>
                          <Button 
                              className={"shop-btn"}
                              onClick={(e) => {
                                console.log("BUTTON PRESSED!");
                                onAdd({ 
                                  _id: product._id, 
                                  quantity: 1,
                                  name: product.productName, 
                                  price: product.productPrice, 
                                  image: product.productImages[0],
                                });
                                e.stopPropagation();
                              }}>
                            <ShoppingCartIcon sx={{ fontSize: 18 }} />
                          </Button>
                          <Button className={"view-btn"} sx={{ right: "36px" }}>
                            <Badge
                              badgeContent={product.productViews}
                              color="secondary"
                            >
                              <RemoveRedEyeIcon
                                sx={{
                                  fontSize: 18,
                                  color:
                                    product.productViews === 0
                                      ? "gray"
                                      : "white",
                                }}
                              />
                            </Badge>
                          </Button>
                        </Stack>
                        <Box className={"product-desc"}>
                          <span className={"product-title"}>
                            {product.productName}
                          </span>
                          <div className={"pproduct-desc"}>
                            <MonetizationOnIcon />
                            {product.productPrice}
                          </div>
                        </Box>
                      </Stack>
                    );
                  })
                ) : (
                  <Box className="no-data">Products are not available!</Box>
                )}
              </Stack>
            </Stack>
          </Stack>

          <Stack className={"pagination-section"}>
            <Pagination
              count={
                products.length !== 0
                  ? productSearch.page + 1
                  : productSearch.page
              }
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color={"secondary"}
                />
              )}
              onChange={paginationHandler}
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
