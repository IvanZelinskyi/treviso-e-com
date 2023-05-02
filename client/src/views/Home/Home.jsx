import Splash from "./Splash";
import Trends from "./Trends";
import Catalog from "./Catalog";
import BrandFocus from "./BrandFocus";
import Banner from "../../components/Banner";

const Home = ({
  products,
  cartData,
  addToCart,
  setCartNotification,
  removeFromCart,
}) => {
  return (
    <main className="home fadeIn">
      <Banner />
      <Splash />
      <Catalog />
      <Trends
        products={products}
        cartData={cartData}
        addToCart={addToCart}
        setCartNotification={setCartNotification}
        removeFromCart={removeFromCart}
      />
      <BrandFocus />
    </main>
  );
};

export default Home;
