import { useState, useEffect } from "react";
import TrendsSplash from "../../assets/sunglasses-trends.jpg";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { useInView } from "react-intersection-observer";
const Trends = ({
  products,
  cartData,
  addToCart,
  setCartNotification,
  removeFromCart,
}) => {
  const [items, setItems] = useState([]);
  const { ref: picRef, inView: isVisible } = useInView({
    threshold: 0.8,
    triggerOnce: true,
  });
  const exist = (product) => {
    const exist = cartData.find((prod) => prod._id === product._id);
    return exist;
  };
  useEffect(() => {
    let temp = [];
    products.forEach((prod) => {
      if (prod.subCategoryProduct === "Sunglasses") {
        if (prod.bestSeller) {
          temp.push(prod);
        }
      }
    });
    const resultArray = temp.slice(0, 3);
    setItems(resultArray);
  }, [products]);

  return (
    <section className="trends-main">
      <div className="trends-splash-container">
        <img src={TrendsSplash} ref={picRef} className={`trends-splashBG`} />
        <h4>
          Sunglasses <br /> summer <br />
          trends
        </h4>
        <Link to="/Sunglasses">
          <button className="trends-btn">
            <span>Discover</span>
          </button>
        </Link>
      </div>
      <div className="trends-swiper-container">
        <div className="trends-card-header">
          <h5>Bestseller</h5>
        </div>
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          navigation={true}
          className="trends-swiper"
        >
          {items?.map((prod) => {
            return (
              <SwiperSlide className="trends-card" key={prod._id}>
                <Link to={`/product/${prod.name}`}>
                  <img src={prod.image} alt={prod.name} />
                  <p className="trendsProdName">{prod.name}</p>
                </Link>
                <Link to={`/brand/${prod.brand}`}>
                  <p className="trendsProdBrand">{prod.brand}</p>
                </Link>
                <button className="singleProd-addtocart">
                  {!exist(prod) ? (
                    <span
                      onClick={() => {
                        addToCart(prod);
                        setCartNotification({
                          action: "add",
                          product: prod,
                          display: true,
                        });
                      }}
                    >
                      Add to cart <strong>- {prod.price} $</strong>
                    </span>
                  ) : (
                    <span
                      onClick={() => {
                        removeFromCart(prod);
                        setCartNotification({
                          action: "remove",
                          product: prod,
                          display: true,
                        });
                      }}
                    >
                      Remove from cart <strong>- {prod.price} $</strong>
                    </span>
                  )}
                </button>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default Trends;
