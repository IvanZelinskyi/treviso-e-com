import { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import useWindowDimensions from "../hooks/useWindowDimenisons";
import { IoIosOptions } from "react-icons/io";
import MobileFilter from "./MobileFilter";

const Filter = ({
  products,
  setFiltered,
  isLoading,
  price,
  setPrice,
  range,
  setRange,
  setSort,
  itemsState,
}) => {
  const [checked, setChecked] = useState([]);
  const [mobileFilter, setMobileFilter] = useState(false);
  let params = useParams();
  let navigate = useNavigate();
  let location = useLocation();
  const { width } = useWindowDimensions();
  // // FIND PRICE RANGE
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [checked.length, range]);
  useEffect(() => {
    let temp = [];
    products?.forEach((prod) => {
      temp.push(prod.price);
    });
    let min = Math.min(...temp);
    let max = Math.max(...temp);
    setPrice([min, max]);
    setRange([min, max]);
  }, []);
  // // Filtering checkboxes
  useEffect(() => {
    const filterCheckbox = () => {
      let temp = [];
      products.forEach((prod) => {
        if (checked.includes(prod.brand)) {
          temp.push(prod);
        }
      });
      setFiltered(temp);
    };
    filterCheckbox();
  }, [checked]);
  // // RENDER BRAND LIST CHECKBOXES
  const renderBrandList = (items) => {
    let brands = [];
    items.forEach((prod) => {
      if (!brands.includes(prod.brand)) {
        brands.push(prod.brand);
      }
      brands.sort((a, b) => {
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 0;
      });
    });
    return (
      <>
        {brands.map((brand, i) => {
          return (
            <li key={i} style={{ listStyle: "none" }}>
              <input
                type="checkbox"
                id={brand}
                value={brand}
                onChange={(e) => handleCheckbox(e)}
                className="checkbox"
              />
              <label htmlFor={brand}>{brand}</label>
            </li>
          );
        })}
      </>
    );
  };
  const handleCheckbox = (e) => {
    let { checked, value } = e.target;
    if (checked) {
      setChecked((prev) => [...prev, value]);
    } else {
      setChecked((prev) => {
        return [...prev.filter((brand) => brand !== value)];
      });
    }
  };
  return (
    <div className="filter">
      {width < 1066 && (
        <MobileFilter
          mobileFilter={mobileFilter}
          setMobileFilter={setMobileFilter}
          renderBrandList={renderBrandList}
          products={products}
          itemsState={itemsState}
          price={price}
          range={range}
          setRange={setRange}
        />
      )}
      <div className="filter-goBack" onClick={() => navigate(-1)}>
        <MdOutlineArrowBackIos className="goBack-icon" />
        {width > 1066 && <p>Back</p>}
      </div>
      {width >= 1066 ? (
        <>
          {!isLoading && (
            <>
              <h6>Filter</h6>
              <ul className="filter-wrapper">
                <p>
                  <span className="filter-title">Sort</span>
                </p>
                <li onClick={() => setSort("htl")}>Price: High to Low</li>
                <li onClick={() => setSort("lth")}>Price: Low to High</li>
              </ul>
              {!location.pathname.includes("/brand") && (
                <div className="filter-wrapper">
                  <p>
                    <span className="filter-title">Brand</span>
                  </p>
                  <ul className="filter-list">{renderBrandList(products)}</ul>
                </div>
              )}
              <div className="filter-wrapper">
                <p>
                  <span className="filter-title">Price</span>
                </p>
                {price.length > 0 && (
                  <Slider
                    getAriaLabel={() => "Price range"}
                    value={range}
                    min={price[0]}
                    max={price[1]}
                    defaultValue={(price[0], price[1])}
                    onChange={(event, newValue) => {
                      setRange(newValue);
                    }}
                    valueLabelDisplay="auto"
                    className="priceSlider"
                  />
                )}
                <div className="rangeText">
                  <p>{range[0]} $</p>
                  <p>{range[1]} $</p>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <button
          className="mobileFilter-button"
          onClick={() => setMobileFilter(true)}
        >
          <p>Filter</p>
          <span>
            <IoIosOptions />
          </span>
        </button>
      )}
    </div>
  );
};

export default Filter;
