import Pic from "../../assets/focus-prada.jpg";
import { useInView } from "react-intersection-observer";
import { GiMoebiusStar } from "react-icons/gi";
import { Link } from "react-router-dom";
const BrandFocus = () => {
  const { ref: pradaRef, inView: isVisible } = useInView({
    threshold: 0,
    triggerOnce: true,
  });
  return (
    <section className="brandFocus">
      <div className="marquee">
        <h5>
          NEW SEASON
          <span>
            <GiMoebiusStar className="marquee-icon" />
          </span>
        </h5>

        <h5>
          NEW SEASON
          <span>
            <GiMoebiusStar className="marquee-icon" />
          </span>
        </h5>

        <h5>
          NEW SEASON
          <span>
            <GiMoebiusStar className="marquee-icon" />
          </span>
        </h5>

        <h5>
          NEW SEASON
          <span>
            <GiMoebiusStar className="marquee-icon" />
          </span>
        </h5>

        <h5>
          NEW SEASON
          <span>
            <GiMoebiusStar className="marquee-icon" />
          </span>
        </h5>

        <h5>
          NEW SEASON
          <span>
            <GiMoebiusStar className="marquee-icon" />
          </span>
        </h5>

        <h5>
          NEW SEASON
          <span>
            <GiMoebiusStar className="marquee-icon" />
          </span>
        </h5>
        <h5>
          NEW SEASON
          <span>
            <GiMoebiusStar className="marquee-icon" />
          </span>
        </h5>
        <h5>
          NEW SEASON
          <span>
            <GiMoebiusStar className="marquee-icon" />
          </span>
        </h5>
      </div>
      <div className="brandFocus-wrapper">
        <div className="brandFocus-left">
          <div className="brandFocus-left-content">
            <h5>BRAND FOCUS</h5>
            <p>Prada New Season</p>
            <p className="brandFocus-left-text">
              Prada is known for their elegant and sophisticated designs, often
              featuring bold colors and unique details. Their shoes are
              typically crafted from high-quality materials and feature clean
              lines and minimalist silhouettes. Prada offers a range of styles
              including pumps, loafers, sandals, and sneakers.
            </p>
            <Link to="/brand/Prada">
              <button className="brandFocus-btn">
                <span>Discover</span>
              </button>
            </Link>
          </div>
        </div>
        <div className="brandFocus-right">
          <img
            src={Pic}
            alt="pic"
            ref={pradaRef}
            className={isVisible ? "zoomPic" : ""}
          />
        </div>
      </div>
    </section>
  );
};

export default BrandFocus;
