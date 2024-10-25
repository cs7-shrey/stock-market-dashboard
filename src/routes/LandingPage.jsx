import { Link, useNavigate } from "react-router-dom"
import { useUserAuth } from "../context/UserAuthContext"
// import bg from '../../public/bgimage.jpg'
import bg from "../assets/bgimage.jpg"
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
    return (
        <>
            <div
                className="bg-cover bg-center bg-repeat min-h-screen min-w-fit z-auto dark flex flex-col "
                style={{ backgroundImage: `url(${bg})` }}
            >
                {/* <div className=" md:h-full flex flex-col w-fit"> */}
                    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3 dark:bg-inherit">
                        <nav className=" w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between">
                            {/* <a className="sm:order-1 flex-none text-xl font-semibold dark:text-white focus:outline-none focus:opacity-80" href="#">Brand</a> */}
                            <div className="sm:order-3 flex items-center gap-x-2">
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
                                    className="py-2 px-3 text-sm font-medium rounded-lg border border-gray-700 bg-gray-800 text-white hover:bg-gray-700">
                                    {user ? "Logout" : "Login"}
                                </button>
                            </div>
                            <div id="hs-navbar-alignment" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:grow-0 sm:basis-auto sm:block sm:order-2" aria-labelledby="hs-navbar-alignment-collapse">
                                {/* <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:mt-0 sm:ps-5">
                                <a className="font-medium text-blue-500 focus:outline-none" href="#" aria-current="page">Landing</a>
                                <a className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500" href="#">Account</a>
                                <a className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500" href="#">Work</a>
                                <a className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500" href="#">Blog</a>
                            </div> */}
                            </div>
                        </nav>
                    </header>

                    <div className="dark:text-white my-20 w-fit px-4" style={{
                        fontFamily: "FK Grotesk Neue, Arial, sans-serif",
                        lineHeight: "120px"
                    }}>
                        <div className="font-bold sm:text-[120px] text-[100px] md:w-[60%] sm:mx-2">
                            The future belongs to those who invest in it.
                        </div>
                        <div>
                            {/* <button className="text-[50px] sm:text-[50px] text-black px-6 py-1 rounded-xl mt-10 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-[#0046cc] dark:focus:ring-blue-800" */}
                            <button className="px-8 py-3 my-8 mx-2 text-[50px] font-medium text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/10"
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