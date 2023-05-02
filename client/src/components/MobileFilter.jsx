import { AiOutlineClose } from "react-icons/ai";
import Slider from "@mui/material/Slider";
import { useLocation } from "react-router-dom";

const MobileFilter = ({
  mobileFilter,
  setMobileFilter,
  renderBrandList,
  products,
  itemsState,
  price,
  range,
  setRange,
}) => {
  let location = useLocation();
  return (
    <div className={mobileFilter ? "mobileFilter active" : "mobileFilter"}>
      <div className="mobileFilter-content">
        <AiOutlineClose
          onClick={() => setMobileFilter(false)}
          className="mobileFilter-close"
        />
        <ul className="mobileFilter-wrapper">
          <p>
            <span className="mobileFilter-title">Sort</span>
          </p>
          <li>Price: High to Low</li>
          <li>Price: Low to High</li>
        </ul>
        {!location.pathname.includes("/brand") && (
          <ul className="mobileFilter-wrapper mobileFilter-brands">
            <p>
              <span className="mobileFilter-title">Brand</span>
            </p>
            {renderBrandList(products)}
          </ul>
        )}
        <div className="mobileFilter-wrapper">
          <p>
            <span className="mobileFilter-title">Price</span>
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
              className="mobilePriceSlider"
            />
          )}
          <div className="rangeText">
            <p>{range[0]} $</p>
            <p>{range[1]} $</p>
          </div>
        </div>
        <div className="mobileFilter-footer">
          <button
            onClick={() => setMobileFilter(false)}
            className="mobileFilter-button"
          >
            Show {itemsState.length} items
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileFilter;
