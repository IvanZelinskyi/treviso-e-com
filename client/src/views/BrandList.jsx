import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { URL } from "./../config";
import Filter from "../components/Filter";
import Products from "./../components/Products";
import useWindowDimensions from "../hooks/useWindowDimenisons";
import PageError from "../components/PageError";

const BrandList = ({
  addToCart,
  cartData,
  removeFromCart,
  setCartNotification,
}) => {
  let params = useParams();
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemsState, setItemsState] = useState([]);
  const [price, setPrice] = useState([]);
  const [range, setRange] = useState([]);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState("");
  const { width } = useWindowDimensions();
  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${URL}/products/all`);
        if (res.data.ok) {
          const products = res.data.data.filter((prod) => {
            return prod.brand === params.brandName;
          });
          if (products.length === 0) {
            throw new Error("No products found for this brand");
          }
          setProducts(products);
          setIsLoading(false);
        }
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    getProducts();
  }, [params.brandName]);
  if (error) {
    return <PageError />;
  }
  return (
    <main className="subcategory fadeIn" key={params.brandName}>
      {!isLoading ? (
        <Filter
          products={products}
          setProducts={setProducts}
          filtered={filtered}
          setFiltered={setFiltered}
          isLoading={isLoading}
          price={price}
          setPrice={setPrice}
          range={range}
          setRange={setRange}
          setSort={setSort}
          itemsState={itemsState}
          setItemsState={setItemsState}
        />
      ) : (
        <>
          {width > 1066 ? (
            <div style={{ width: "20%" }}></div>
          ) : (
            <div
              style={{
                height: "8vh",
                marginTop: "12vh",
              }}
            ></div>
          )}
        </>
      )}

      <section className="subcategory-products">
        <div className="products-header">
          <p>{params.brandName}</p>
          <p>{itemsState?.length} items</p>
        </div>
        <div className="products-grid">
          {filtered.length > 0 ? (
            <Products
              items={filtered}
              range={range}
              sort={sort}
              itemsState={itemsState}
              setItemsState={setItemsState}
              addToCart={addToCart}
              cartData={cartData}
              removeFromCart={removeFromCart}
              setCartNotification={setCartNotification}
            />
          ) : (
            <Products
              items={products}
              range={range}
              sort={sort}
              itemsState={itemsState}
              setItemsState={setItemsState}
              addToCart={addToCart}
              cartData={cartData}
              removeFromCart={removeFromCart}
              setCartNotification={setCartNotification}
            />
          )}
        </div>
      </section>
    </main>
  );
};

export default BrandList;
