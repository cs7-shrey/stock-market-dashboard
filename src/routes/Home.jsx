import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
// import StockSvg from "../assets/StockSvg";
import Stock from "../assets/stocks.svg";
const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen max-w-sm mx-auto">
          <div className="absolute bottom-1 sm:w-[15%] w-[40%]">
            <button variant="primary" onClick={handleLogout} className="bg-[#212121] hover:bg-black text-white p-2 rounded-3xl w-full">
              Log out
            </button>
          </div>
          <div className="ring-black ring-4 sm:px-4 py-6 rounded-2xl flex flex-col items-center max-w-[60%] sm:max-w-md sm:transform scale-125">
              {/* <Stock className=''/> */}
              {/* <img src='../assets/stocks.svg' alt='mySvgImage' /> */}
              {/* <Stock /> */}
              <img src={Stock} alt='mySvgImage' className="w-[50px] h-[50px]"/>
              <div className="mt-3 mb-1">
                Stocks
              </div>
              <div className="max-w-[250px] w-[70%] text-center text-[#737373] mt-2 mb-1 text-[15px]">
                View Stock prices, fundamental data, balance sheets and more
              </div>
              <hr className="w-[50%] h-1 border-[#969696] m-2"/>
              <div className="text-xl text-[#737373] mb-3">
                Free
              </div>
              <div className="w-[70%]">
                <Link to="/stocks">
                  <button className="bg-[#212121] hover:bg-black text-white p-2 rounded-3xl w-full text-[12px]">
                    Get Started
                  </button>
                </Link>
              </div>
          </div>
      </div>
    </>
  );
};

export default Home;