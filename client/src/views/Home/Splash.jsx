import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { products as productsAtom } from "../../atoms";
import videoBG from "../../assets/video.mp4";
import splashImg from "../../assets/splashImg.jpg";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import useWindowDimensions from "../../hooks/useWindowDimenisons";
const Splash = () => {
  const { width } = useWindowDimensions();
  const products = useRecoilValue(productsAtom);
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    const getBrands = () => {
      let unique = [];
      let temp = [...products];
      temp.forEach((prod) => {
        if (!unique.includes(prod.brand)) {
          unique.push(prod.brand);
        }
        setBrands(unique);
      });
    };
    getBrands();
  }, [products]);
  return (
    <section className="splash noSelect">
      {width > 800 ? (
        <video src={videoBG} autoPlay loop muted />
      ) : (
        <img src={splashImg} alt="splashImage" />
      )}
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="brand-swiper"
      >
        {brands?.map((brand, i) => {
          return (
            <SwiperSlide className="brand-slide" key={i}>
              <Link to={`brand/${brand}`}>{brand}</Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Splash;
