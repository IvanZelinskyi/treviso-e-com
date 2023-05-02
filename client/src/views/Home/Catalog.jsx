import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { useRecoilValue } from "recoil";
import { products as productsAtom } from "../../atoms";
import useWindowDimensions from "../../hooks/useWindowDimenisons";
import { Link } from "react-router-dom";
const Catalog = () => {
  const { width } = useWindowDimensions();
  const [item, setItem] = useState({});
  const products = useRecoilValue(productsAtom);
  const numberSlides = () => {
    if (width > 1100) {
      return 3;
    }
    if (width > 768) {
      return 2;
    }
    if (width < 768) {
      return 1;
    }
  };
  useEffect(() => {
    if (products.length > 0) {
      let findClothing = products.filter(
        (prod) => prod.categoryId.category === "Clothing"
      );
      let findShoes = products.filter(
        (prod) => prod.categoryId.category === "Shoes"
      );
      let findAccessories = products.filter(
        (prod) => prod.categoryId.category === "Accessories"
      );
      let findBags = products.filter(
        (prod) => prod.categoryId.category === "Bags"
      );
      let findJewelry = products.filter(
        (prod) => prod.categoryId.category === "Jewelry"
      );
      setItem({
        Clothing: findClothing[1],
        Shoes: findShoes[1],
        Accessories: findAccessories[6],
        Bags: findBags[4],
        Jewelry: findJewelry[6],
      });
    }
  }, [products]);

  return (
    <section className="catalog noSelect">
      <Swiper
        modules={[Pagination]}
        slidesPerView={numberSlides()}
        spaceBetween={40}
        pagination={{
          clickable: true,
        }}
        className="catalog-slider"
      >
        <SwiperSlide className="catalog-card">
          <Link to="/Tote Bags">
            <p className="card-category">Tote Bags</p>
            <div className="card-image-container">
              <img src={item.Bags?.image} className="image1" />
            </div>
            <img src={item.Bags?.image2} className="image2" />
            <div className="card-content">
              <p className="card-brand">{item.Bags?.brand}</p>
              <p className="card-name">{item.Bags?.name}</p>
              <p className="card-price">{item.Bags?.price} $</p>
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide className="catalog-card">
          <Link to="/Tops">
            <p className="card-category">Tops</p>
            <div className="card-image-container">
              <img src={item.Clothing?.image} className="image1" />
            </div>
            <img src={item.Clothing?.image2} className="image2" />
            <div className="card-content">
              <p className="card-brand">{item.Clothing?.brand}</p>
              <p className="card-name">{item.Clothing?.name}</p>
              <p className="card-price">{item.Clothing?.price} $</p>
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide className="catalog-card">
          <Link to="/Sunglasses">
            <p className="card-category">Sunglasses</p>
            <div className="card-image-container">
              <img src={item.Accessories?.image} className="image1" />
            </div>
            <img src={item.Accessories?.image2} className="image2" />
            <div className="card-content">
              <p className="card-brand">{item.Accessories?.brand}</p>
              <p className="card-name">{item.Accessories?.name}</p>
              <p className="card-price">{item.Accessories?.price} $</p>
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide className="catalog-card">
          <Link to="/Watches">
            <p className="card-category">Watches</p>
            <div className="card-image-container">
              <img src={item.Jewelry?.image} className="image1" />
            </div>
            <img src={item.Jewelry?.image2} className="image2" />
            <div className="card-content">
              <p className="card-brand">{item.Jewelry?.brand}</p>
              <p className="card-name">{item.Jewelry?.name}</p>
              <p className="card-price">{item.Jewelry?.price} $</p>
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide className="catalog-card">
          <Link to="/Sandals">
            <p className="card-category">Sandals</p>
            <div className="card-image-container">
              <img src={item.Shoes?.image} className="image1" />
            </div>
            <img src={item.Shoes?.image2} className="image2" />
            <div className="card-content">
              <p className="card-brand">{item.Shoes?.brand}</p>
              <p className="card-name">{item.Shoes?.name}</p>
              <p className="card-price">{item.Shoes?.price} $</p>
            </div>
          </Link>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Catalog;
