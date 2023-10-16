import React, { useEffect, useState } from "react";
import LabelProducts from "../../components/labelProducts";
import { faHackerNews } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import ProductSlideContainer from "../../components/productSlideContainer";
import { getAllProduct } from "../../api/products/get";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../../store/client/user/useAuthStore";
import useWishlistStore from "../../store/client/wishlist/wishlist";
import {
  faCheck,
  faFire,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { ProductsType } from "../../types/product";
import HomeCategoryForm from "./components/category/form";
import useHomeCategoryValueStore from "../../store/client/home/category";
import BrandSlider from "../../components/brand/slide";
import { getAllBrands } from "../../api/brand/get";

const HomePage: React.FC = () => {
  /* Router */
  const navigate = useNavigate();

  /* States */
  const [saleData, setSaleData] = useState<ProductsType["data"] | []>([]);
  const [newProductData, setNewProductData] = useState<
    ProductsType["data"] | []
  >([]);

  const [topProductAPI, setTopProduct] = useState<ProductsType["data"] | []>(
    []
  );
  const [budgetProductAPI, setBudgetProduct] = useState<
    ProductsType["data"] | []
  >([]);
  const [popularProductAPI, setPopularProduct] = useState<
    ProductsType["data"] | []
  >([]);

  /* Store */
  const { isAuthenticated } = useAuthStore((state) => state);
  const { wishlist } = useWishlistStore((state) => state);
  const { categoryValue } = useHomeCategoryValueStore((state) => state);

  /* Queries */

  const productQuery = useQuery({
    queryKey: ["product"],
    queryFn: getAllProduct,
    retry: 3,
  });

  const brandQuery = useQuery({
    queryKey: ["brand"],
    queryFn: getAllBrands,
    retry: 2,
  });

  /* UseEffect */
  useEffect(() => {
    let isSub = true;
    if (isSub) {
      if (productQuery.isSuccess) {
        setSaleData(productQuery.data.data.filter((data) => data.sale > 0));
        setNewProductData(
          productQuery.data.data.filter((data) => data.new === true)
        );

        setTopProduct(
          productQuery.data.data.filter((data) => data.top === true)
        );
        setBudgetProduct(
          productQuery.data.data.filter(
            (data) =>
              data.price <= 1200 || (data.newPrice > 0 && data.newPrice <= 1200)
          )
        );
        setPopularProduct(
          productQuery.data.data.filter((data) => data.popularity === true)
        );
      }
    }
    return () => {
      isSub = false;
    };
  }, [productQuery.data, productQuery.isSuccess]);

  /* Query Loading */
  if (productQuery.isLoading) {
    return <h1>Loading... </h1>;
  }

  if (productQuery.isError) {
    return <h1>Error... </h1>;
  }

  // if (wishlistQuery.isSuccess) {
  //   setWishlist(wishlistQuery.data);
  // }

  // const dispatch = useDispatch();

  // //////////////////////// S E L E C T O R S ///////////////////////
  // const { productData, isLoading } = useSelector((state) => state.product);
  // const { newsData } = useSelector((state) => state.news);
  // const { weeklySaleData, isLoading: weeklyIsLoading } = useSelector(
  //   (state) => state.weekly_sale
  // );
  // const { brandDataIsLoading } = useSelector((state) => state.brand);

  // //////////////////////// D A T A ///////////////////////
  // useEffect(() => {
  //   dispatch(getAllProductData());
  //   dispatch(getAllNewsData());
  //   dispatch(getAllWeeklySaleData());
  //   dispatch(getAllBrandData());
  // }, []);

  // // Sale Data

  // // New Product Data
  // useEffect(() => {
  //   let isSub = true;
  //   if (isSub) {
  //     setNewProductData(productData.filter((data) => data.new === true));
  //   }
  //   return () => {
  //     isSub = false;
  //   };
  // }, [!isLoading]);

  // // Category
  // const [categoryValue, setCategoryValue] = useState("top");
  // const [topBg, setTopBg] = useState(true);
  // const [budgetBg, setBudgetBg] = useState(false);
  // const [popularBg, setPopularBg] = useState(false);

  // useEffect(() => {
  //   let isSub = true;
  //   if (isSub) {
  //     setTopProduct(productData.filter((data) => data.top === true));
  //     setBudgetProduct(
  //       productData.filter(
  //         (data) =>
  //           data.price <= 1200 || (data.new_price > 0 && data.new_price <= 1200)
  //       )
  //     );
  //     setPopularProduct(productData.filter((data) => data.popularity === true));
  //   }
  //   return () => {
  //     isSub = false;
  //   };
  // }, [!isLoading]);

  // /////////////////////// S U B S C R I B E //////////////////////////////
  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState,
  //   formState: { errors },
  // } = useForm();

  // const onSubmit = (data) => {
  //   dispatch(createSubscription(data));
  // };

  // useEffect(() => {
  //   if (formState.isSubmitSuccessful) {
  //     reset();
  //     alert("Successfully Added");
  //   }
  // }, [formState, reset]);

  return (
    <>
      {/* News */}
      {/*    {newsData?.length > 0 && <MainSlide />} */}

      {/* Hot Sales */}
      <LabelProducts icons={faFire} title="Hot Sales">
        <button
          className="sales_button"
          onClick={() => {
            navigate("/hot_deal_main_page");
          }}
        >
          More Sales
        </button>
      </LabelProducts>
      <ProductSlideContainer
        data={saleData}
        wishlist={wishlist}
        isAuthenticated={isAuthenticated}
      />

      {/* New Products */}
      <LabelProducts icons={faHackerNews} title="New Products">
        <button
          className="sales_button"
          onClick={() => {
            navigate("/new_product");
          }}
        >
          More Products
        </button>
      </LabelProducts>
      <ProductSlideContainer
        wishlist={wishlist}
        isAuthenticated={isAuthenticated}
        data={newProductData}
      />
      {/* Hot Deal */}
      {/* {weeklySaleData.length() === 1 && }
      {!weeklyIsLoading
        ? weeklySaleData.length === 1 && <HotDeal data={weeklySaleData[0]} />
        : ""} */}

      {/* By Category */}
      <LabelProducts title="By Category" icons={faCheck} butt>
        <HomeCategoryForm />
      </LabelProducts>
      {categoryValue == "top" && (
        <ProductSlideContainer
          wishlist={wishlist}
          isAuthenticated={isAuthenticated}
          data={topProductAPI}
        />
      )}
      {categoryValue === "budget" && (
        <ProductSlideContainer
          wishlist={wishlist}
          isAuthenticated={isAuthenticated}
          data={budgetProductAPI}
        />
      )}
      {categoryValue === "popular" && (
        <ProductSlideContainer
          wishlist={wishlist}
          isAuthenticated={isAuthenticated}
          data={popularProductAPI}
        />
      )}
      {/* Brands */}
      <LabelProducts icons={faUserShield} title="Brands" />
      {brandQuery.isSuccess && <BrandSlider brandData={brandQuery.data} />}

      {/* Subscribe */}
      {/* <section className="sub_section">
        <div className="left">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email..."
              {...register("email", { required: true })}
            />
            <button className="mail">
              <FontAwesomeIcon icon={faMailForward} />
            </button>
          </form>
        </div>
        <div className="right">
          <div className="container">
            <div className="icons">
              <FontAwesomeIcon icon={faFacebookF} />
            </div>
            <div className="icons">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </div>
          </div>
          <h2>Subscribe Now!</h2>
        </div>
      </section> */}
      {/* Footer */}
      {/* <Footer /> */}
    </>
  );
};

export default HomePage;
