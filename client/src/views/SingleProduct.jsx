import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { MdOutlineArrowBackIos } from "react-icons/md";
import useWindowDimensions from "../hooks/useWindowDimenisons";
import PageError from "../components/PageError";
import { products as productsAtom } from "../atoms";
const SingleProduct = ({
  cartData,
  addToCart,
  removeFromCart,
  setCartNotification,
}) => {
  const [product, setProduct] = useState({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [error, setError] = useState(null);
  const products = useRecoilValue(productsAtom);
  let navigate = useNavigate();
  let params = useParams();
  const { width } = useWindowDimensions();
  useEffect(() => {
    let findProduct = () => {
      const idx = products.findIndex((item) => item.name === params.name);
      if (idx === -1) {
        setError("product not found");
      } else {
        setProduct(products[idx]);
      }
    };
    products.length > 0 && findProduct();
  }, [products, params.name]);
  const exist = (product) => {
    const exist = cartData.find((prod) => prod._id === product._id);
    return exist;
  };
  if (error) {
    return <PageError />;
  }
  return (
    <main className="singleProduct fadeIn" key={params.name}>
      <div className="singleProd-goBack" onClick={() => navigate(-1)}>
        <span>
          <MdOutlineArrowBackIos />
        </span>
        {width > 1066 && <p>Back</p>}
      </div>
      {product.image && (
        <div className="slider-container">
          <div
            className="slider-carousel"
            style={{ transform: `translateY(-${currentIdx * 100}%)` }}
          >
            <div className="slider-card">
              <img src={product?.image} alt="" />
            </div>
            <div className="slider-card">
              <img src={product?.image2} alt="" />
            </div>
          </div>
          <div className="paginationImg-container">
            <img
              src={product.image}
              alt=""
              className="paginationImg1"
              onMouseEnter={() => setCurrentIdx(0)}
            />
            <img
              src={product.image2}
              alt=""
              className="paginationImg1"
              onMouseEnter={() => setCurrentIdx(1)}
            />
          </div>
        </div>
      )}
      {product.name && (
        <section className="singleProduct-content">
          <p className="singleProd-status">
            {product.status && product.status}
          </p>
          <h1 className="underline">{product.name}</h1>
          <Link to={`/brand/${product.brand}`}>
            <h2>{product.brand}</h2>
          </Link>
          <p className="singleProd-description">{product.description}</p>
          <button
            className="singleProd-addtocart"
            onClick={() => {
              if (!exist(product)) {
                addToCart(product);
                setCartNotification({
                  action: "add",
                  product: product,
                  display: true,
                });
              } else {
                removeFromCart(product);
                setCartNotification({
                  action: "remove",
                  product: product,
                  display: true,
                });
              }
            }}
          >
            <span>
              {!exist(product) ? `Add to bag` : `Remove from bag`}{" "}
              <strong>
                - {Intl.NumberFormat("en-US").format(product.price)} $
              </strong>
            </span>
          </button>
        </section>
      )}
    </main>
  );
};

export default SingleProduct;
