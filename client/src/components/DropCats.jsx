import { useState, useEffect } from "react";
import {
  categories as categoriesAtom,
  subCategories as subCategoriesAtom,
} from "../atoms";
import { useRecoilValue } from "recoil";
import DropDown from "../components/DropDown";
import useWindowDimensions from "../hooks/useWindowDimenisons";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { Link } from "react-router-dom";
import { RxPerson } from "react-icons/rx";

const DropCats = ({
  setDropCats,
  dropCats,
  setModal,
  logout,
  isLoggedIn,
  logoutWindow,
  setLogoutWindow,
}) => {
  const [dropDown, setDropDown] = useState({ display: false, category: null });
  const [isInside, setIsInside] = useState(false);
  const [active, setActive] = useState("");
  const { width } = useWindowDimensions();
  const categories = useRecoilValue(categoriesAtom);
  const subCategories = useRecoilValue(subCategoriesAtom);
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    if (!dropCats) {
      setActive("");
      setAnimate(false);
    } else {
      setActive("categories");
    }
  }, [dropCats]);
  useEffect(() => {
    if (dropCats) {
      const timer = setTimeout(() => {
        setAnimate(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [dropCats]);
  useEffect(() => {
    width <= 768 && setActive("categories");
  }, []);
  const insideHandler = () => {
    return !isInside && setDropCats(false);
  };
  // console.log("isInside", isInside);
  return width > 768 ? (
    // desktop dropdown
    <div
      className={dropCats ? "cats-dropdown-overlay" : ""}
      onClick={insideHandler}
    >
      <div
        className={dropCats ? "cats-dropdown active" : "cats-dropdown"}
        onMouseEnter={() => setIsInside(true)}
        onMouseLeave={() => setIsInside(false)}
        onTouchStart={() => setIsInside(true)}
      >
        {categories.map((cat) => {
          return (
            <li
              key={cat._id}
              onTouchStart={() => {
                setDropDown({ display: true, category: cat.category });
                setActive(`${cat.category}`);
              }}
              onMouseEnter={() => {
                setDropDown({ display: true, category: cat.category });
                setActive(`${cat.category}`);
              }}
              onMouseLeave={() =>
                setDropDown({ display: false, category: null })
              }
              className={
                width > 768 && active === cat.category ? "activeBG" : ""
              }
            >
              <span>{cat.category}</span>
            </li>
          );
        })}
      </div>
      <DropDown
        dropDown={dropDown}
        setDropDown={setDropDown}
        setIsInside={setIsInside}
        isInside={isInside}
        setActive={setActive}
        setDropCats={setDropCats}
        dropCats={dropCats}
      />
    </div>
  ) : (
    // mobile sidebar
    <>
      {dropCats && (
        <div className="mobile-sidebar fadeIn">
          <div className="sidebar-header active">
            {!isLoggedIn ? (
              <RxPerson
                className="sidebar-account fadeIn"
                onClick={() => {
                  setDropCats(false);
                  setModal({ display: true, tab: "login" });
                }}
              />
            ) : (
              <Link to="/profile">
                <RxPerson
                  className="sidebar-account fadeIn"
                  onClick={() => setDropCats(false)}
                />
              </Link>
              // <IoIosLogOut
              //   className="sidebar-account fadeIn"
              //   onClick={() => {
              //     setDropCats(false);
              //     setLogoutWindow(true);
              //   }}
              // />
            )}

            <AiOutlineClose
              className="sidebar-close fadeIn"
              onClick={() => setDropCats(false)}
            />
            {active && active !== "categories" && (
              <MdOutlineArrowBackIos
                className="sidebar-back fadeIn"
                onClick={() => setActive("categories")}
              />
            )}
          </div>
          <div className="mobile-sidebar-inner">
            {/* render cateogries  */}
            <ul>
              {active === "categories" && (
                <>
                  {categories &&
                    [...categories]
                      .sort((a, b) => a.category.length - b.category.length)
                      .map((cat) => {
                        return (
                          <li
                            key={cat._id}
                            onClick={() => setActive(cat.category)}
                            className="fadeIn"
                          >
                            {cat.category}
                          </li>
                        );
                      })}
                </>
              )}
              {/* render subcategories  */}
              {active && active !== "categories" && (
                <>
                  {subCategories.map((subcat) => {
                    if (subcat.categoryId.category === active) {
                      return (
                        <li className="fadeIn" key={subcat._id}>
                          <Link
                            to={`/${subcat.subCategoryName}`}
                            key={subcat._id}
                            onClick={() => setDropCats(false)}
                          >
                            {subcat.subCategoryName}
                          </Link>
                        </li>
                      );
                    }
                  })}
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default DropCats;
