import { useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import { IoIosLogOut } from "react-icons/io";
import Orders from "../components/Orders";
import SignOut from "../components/SignOut";
import useWindowDimensions from "../hooks/useWindowDimenisons";
import { useNavigate } from "react-router-dom";

import { BiPurchaseTagAlt } from "react-icons/bi";
const MyProfile = ({
  user,
  setLogoutWindow,
  setOpenOrder,
  setSelectedOrder,
}) => {
  const [activeTab, setActiveTab] = useState("orders");
  const { width } = useWindowDimensions();
  let navigate = useNavigate();
  const displayContent = () => {
    if (activeTab === "orders") {
      return (
        <Orders
          email={user.email}
          setSelectedOrder={setSelectedOrder}
          setOpenOrder={setOpenOrder}
        />
      );
    }
    if (activeTab === "Sign Out") {
      return <SignOut setLogoutWindow={setLogoutWindow} />;
    }
  };
  return (
    <main className="profile-main fadeIn">
      <h1>My account</h1>
      <h2>Welcome, {user.firstname}</h2>
      <div className="profile-wrapper">
        <div className="profile-sidebar">
          <ul className="profile-sidebar-content">
            <li
              className={
                activeTab === "orders"
                  ? "profile-sidebar-section active"
                  : "profile-sidebar-section"
              }
              onClick={() => setActiveTab("orders")}
            >
              <div>
                <BiPurchaseTagAlt className="profile-sidebar-icon" />
                {width > 1000 && <span> Orders</span>}
              </div>
              {width > 1000 && (
                <SlArrowRight className="profile-sidebar-arrow" />
              )}
            </li>
            <li
              className={
                activeTab === "Sign Out"
                  ? "profile-sidebar-section active"
                  : "profile-sidebar-section"
              }
              onClick={() => setActiveTab("Sign Out")}
            >
              <div>
                <IoIosLogOut className="profile-sidebar-icon" />
                {width > 1000 && <span> Sign out</span>}
              </div>
              {width > 1000 && (
                <SlArrowRight className="profile-sidebar-arrow" />
              )}
            </li>
          </ul>
        </div>
        <div className="profile-content">
          <h3 className="fadeIn">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h3>
          <div className="profile-content-inner fadeIn" key={activeTab}>
            {displayContent()}
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyProfile;
