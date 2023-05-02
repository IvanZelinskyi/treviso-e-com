import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { products as productsAtom } from "../atoms";
import { VscClose } from "react-icons/vsc";
import { Link } from "react-router-dom";
export default function Search({ search, setSearch }) {
  const [inside, setInside] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredSearch, setFilteredSearch] = useState([]);
  const products = useRecoilValue(productsAtom);

  useEffect(() => {
    if (!search) {
      setFilteredSearch([]);
      setQuery("");
    }
  }, [search]);

  useEffect(() => {
    if (query.length > 0) {
      const filteredProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.brand.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSearch(filteredProducts);
    }
    if (!query) {
      setFilteredSearch([]);
    }
  }, [query]);

  const insideHandler = () => {
    return !inside && setSearch(false);
  };

  return (
    <div className={search ? "search-overlay" : ""} onClick={insideHandler}>
      <div
        className={search ? "search active" : "search"}
        onMouseEnter={() => setInside(true)}
        onMouseLeave={() => setInside(false)}
        onTouchStart={() => setInside(true)}
      >
        <VscClose className="search-icon" onClick={() => setSearch(false)} />
        <h1>Treviso</h1>
        <input
          type="text"
          placeholder="What are you looking for ?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {filteredSearch.length == 0 && query.length > 1 && (
          <p className="noResults"> no results found</p>
        )}
      </div>

      {filteredSearch.length > 0 && (
        <div
          className="search-data-container fadeIn"
          onMouseEnter={() => setInside(true)}
          onMouseLeave={() => setInside(false)}
        >
          {filteredSearch.map((product) => {
            const price = Intl.NumberFormat("en-US").format(product.price);
            return (
              <Link
                to={`/product/${product.name}`}
                onClick={() => setSearch(false)}
                className="search-data-card"
                key={product._id}
              >
                <p>{product.brand}</p>
                <img src={product.image} alt={product.name} />
                <p className="search-prodName">{product.name}</p>
                <p style={{ color: "gray" }}>{price}$</p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
