import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import {
  subCategories as subCategoriesAtom,
  products as productsAtom,
} from "../atoms";
// images
import dropdownAccessories from "../assets/dropdown-accessories.jpg";
import dropdownClothing from "../assets/dropdown-clothing.jpg";
import dropdownShoes from "../assets/catalogue-shoes.jpg";
import dropdownBags from "../assets/dropdown-bags.jpg";
import dropdownJewelry from "../assets/dropdown-jewelry.jpg";

const DropDown = ({
  dropDown,
  setDropDown,
  dropCats,
  setActive,
  setDropCats,
}) => {
  const [delayed, setDelayed] = useState(false);
  const [src, setSrc] = useState();
  const subCategories = useRecoilValue(subCategoriesAtom);
  const products = useRecoilValue(productsAtom);
  const [isInside, setIsInside] = useState(false);
  // delay rendering
  useEffect(() => {
    if (dropDown.display) {
      const timer = setTimeout(() => {
        setDelayed(true);
      }, 300);
      return () => clearTimeout(timer);
    } else if (delayed) {
      setDelayed(false);
    }
  }, [dropDown.display, delayed]);

  // get list of brands
  const getBrands = () => {
    const result = [];
    const productsOfCategory = products.filter(
      (e) => e.categoryId.category === dropDown.category
    );
    productsOfCategory.forEach((product) => {
      if (!result.includes(product.brand)) {
        result.push(product.brand);
      }
    });
    return result.map((brand, id) => {
      return (
        <Link
          to={`/brand/${brand}`}
          onClick={() => {
            setDropDown({ display: false, category: null });
            setDropCats(false);
          }}
          key={id}
        >
          <li>{brand}</li>
        </Link>
      );
    });
  };
  // image change
  useEffect(() => {
    if (dropDown.category === "Clothing") {
      setSrc(dropdownClothing);
    }
    if (dropDown.category === "Accessories") {
      setSrc(dropdownAccessories);
    }
    if (dropDown.category === "Shoes") {
      setSrc(dropdownShoes);
    }
    if (dropDown.category === "Bags") {
      setSrc(dropdownBags);
    }
    if (dropDown.category === "Jewelry") {
      setSrc(dropdownJewelry);
    }
  }, [dropDown.category]);
  return (
    <div
      className={dropDown.display ? "dropdown active" : "dropdown"}
      onMouseEnter={() => {
        {
          dropCats &&
            setDropDown({ category: dropDown.category, display: true });
          setIsInside(true);
        }
      }}
      onMouseLeave={() => {
        setDropDown({ display: false, category: null });
        setIsInside(false);
        setActive("");
      }}
      onTouchStart={() => {
        dropCats && setDropDown({ category: dropDown.category, display: true });
        setIsInside(true);
      }}
    >
      {delayed && (
        <div className="dropdown-inner fadeIn" key={dropDown.category}>
          <ul>
            <p>{dropDown.category}</p>
            {subCategories.map((subcat) => {
              if (subcat.categoryId.category === dropDown.category) {
                return (
                  <Link
                    to={`/${subcat.subCategoryName}`}
                    onClick={() => {
                      setDropDown({ display: false, category: null });
                      setDropCats(false);
                    }}
                    key={subcat._id}
                  >
                    <li>{subcat.subCategoryName}</li>
                  </Link>
                );
              }
            })}
          </ul>
          <ul>
            <p>FEATURED BRANDS</p>
            {getBrands()}
          </ul>
          <div className="dropdown-image-wrapper">
            <img src={src} alt="asd" className="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDown;
