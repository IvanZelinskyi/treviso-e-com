import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { MdOutlineAdd } from "react-icons/md";
import { IoIosRemove } from "react-icons/io";
import useWindowDimensions from "../hooks/useWindowDimenisons";
const Products = ({
  items,
  range,
  sort,
  itemsState,
  setItemsState,
  addToCart,
  cartData,
  removeFromCart,
  setCartNotification,
}) => {
  let { width } = useWindowDimensions();
  const exist = (product) => {
    const exist = cartData.find((prod) => prod._id === product._id);
    return exist;
  };
  useEffect(() => {
    if (sort === "htl") {
      let temp = [...itemsState];
      const highToLow = temp.sort((a, b) => b.price - a.price);
      return setItemsState(highToLow);
    }
    if (sort === "lth") {
      let temp = [...itemsState];
      const lowToHigh = temp.sort((a, b) => a.price - b.price);
      return setItemsState(lowToHigh);
    }
  }, [sort]);
  useEffect(() => {
    if (items.length > 0) {
      setItemsState(items);
    }
  }, [items]);
  useEffect(() => {
    const filterPrice = () => {
      let temp = [];
      items.forEach((prod) => {
        if (prod.price >= range[0] && prod.price <= range[1]) {
          temp.push(prod);
        }
      });
      setItemsState(temp);
    };
    filterPrice();
  }, [range, items]);

  if (itemsState.length === 0)
    return (
      <div className="loader">
        <FadeLoader color="#d6e1e1" />
      </div>
    );
  return itemsState?.map((prod, i) => {
    return (
      <div className="product-card fadeIn" key={prod._id}>
        {width > 768 ? (
          <>
            {!exist(prod) ? (
              <button
                className="product-addtocart"
                onClick={() => {
                  addToCart(prod);
                  setCartNotification({
                    action: "add",
                    product: prod,
                    display: true,
                  });
                }}
              >
                <span>Add to Cart</span>
              </button>
            ) : (
              <button className="product-addtocart">
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
                  Remove from Cart
                </span>
              </button>
            )}
          </>
        ) : (
          <>
            {!exist(prod) ? (
              <MdOutlineAdd
                className="mobile-addtocart fadeIn"
                onClick={() => {
                  addToCart(prod);
                  setCartNotification({
                    action: "add",
                    product: prod,
                    display: true,
                  });
                }}
              />
            ) : (
              <IoIosRemove
                className="mobile-addtocart fadeIn"
                onClick={() => {
                  removeFromCart(prod);
                  setCartNotification({
                    action: "remove",
                    product: prod,
                    display: true,
                  });
                }}
              />
            )}
          </>
        )}
        <Link to={`/product/${prod.name}`} key={prod._id}>
          <img src={prod.image} alt="" className="product-image1" />
          <img src={prod.image2} alt="" className="product-image2" />
          <div className="product-card-content">
            <p>{prod.brand}</p>
            <p>{prod.name}</p>
            <p>{Intl.NumberFormat("en-US").format(prod.price)} $</p>
          </div>
        </Link>
      </div>
    );
  });
};

export default Products;
