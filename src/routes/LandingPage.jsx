import { Link, useNavigate } from "react-router-dom"
import { useUserAuth } from "../context/UserAuthContext"
// import bg from '../../public/bgimage.jpg'
import bg from "../assets/bgimage.jpg"
import { useEffect } from "react";
export default function LandingPage() {
    const { user, logOut } = useUserAuth();
    console.log(user);
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error.message);
        }
    };
    // useEffect(() => {
    //     // Detect the current zoom level
    //     const getZoomLevel = () => {
    //         console.log(window.devicePixelRatio);
    //         return Math.round((1.1 / window.devicePixelRatio) * 100);
    //     };

    //     // Change zoom level
    //     const setZoomLevel = (zoomLevel) => {
    //         // Modern browsers
    //         document.documentElement.style.zoom = `${zoomLevel}%`;
    //     };
    //     const zoomLevel = getZoomLevel()
    //     setZoomLevel(zoomLevel);
    // }, [])
    return (
        <>
            <div
                className="bg-cover bg-center bg-repeat min-h-screen min-w-fit z-auto dark flex flex-col "
                style={{ backgroundImage: `url(${bg})` }}
            >
                {/* <div className=" md:h-full flex flex-col w-fit"> */}
                <header className="flex flex-wrap justify-end sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3 dark:bg-inherit">
                    <nav className=" w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-end">
                        {/* <a className="sm:order-1 flex-none text-xl font-semibold dark:text-white focus:outline-none focus:opacity-80" href="#">Brand</a> */}
                        <div className="sm:order-3 flex  items-center gap-x-2">
                            {user && <Link to='/stocks'>
                                <button type="button" className="py-2 px-3 text-sm font-medium rounded-lg border border-gray-700 bg-gray-800 text-white hover:bg-gray-700">
                                    Dashboard
                                </button>
                            </Link>}
                            <button type="button"
                                onClick={(e) => {
                                    if (user) {
                                        handleLogout();
                                    }
                                    else {
                                        navigate("/login");
                                    }
                                }}
                                className="py-2 px-3 text-sm font-medium self-end rounded-lg border border-gray-700 bg-gray-800 text-white hover:bg-gray-700">
                                {user ? "Logout" : "Login"}
                            </button>
                        </div>
                    </nav>
                </header>

                <div className="dark:text-white my-20 w-fit px-4" style={{
                    fontFamily: "FK Grotesk Neue, Arial, sans-serif",
                    lineHeight: "120px"
                }}>
                    <div className="font-bold sm:text-[7.7rem] text-[100px] md:w-[60%] sm:mx-2"
                    >
                        The future belongs to those who invest in it.
                    </div>
                    <div>
                        {/* <button className="text-[50px] sm:text-[50px] text-black px-6 py-1 rounded-xl mt-10 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-[#0046cc] dark:focus:ring-blue-800" */}
                        <button className="px-8 py-3 my-8 mx-2 text-[50px] font-medium text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/10"
                            style={{
                                fontFamily: "FK Grotesk Neue, Arial, sans-serif",
                                lineHeight: "75px",
                                fontWeight: "semibold"
                            }}
                        >
                            {user ? <Link to='/stocks'>
                                Go to stocks
                            </Link> : <Link to='/signup'>
                                Get Started
                            </Link>}
                        </button>
                    </div>
                </div>
                {/* </div> */}
            </div>
        </>
    )
}