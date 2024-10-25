import { useState, useEffect } from "react";
import { Link, NavLink, Outlet, Form, useSubmit, useLoaderData, useNavigate, useLocation } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { matchSorter } from "match-sorter";
import toggleIcon from "../assets/threelines.svg";
export async function loader({ request }) {
    const url = new URL(request.url)
    const q = url.searchParams.get("q")
    return { q };
}

export default function Stocks() {
    const [loading, setLoading] = useState(true);
    const [stocks, setStocks] = useState([]);
    const [allStocks, setAllStocks] = useState([]);
    const [error, setError] = useState(null);
    const [searchQ, setSearchQ] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { logOut } = useUserAuth();

    const { q } = useLoaderData();
    const submit = useSubmit();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const getStocksData = async () => {
            const url = "https://simpleclockbackend-gxeyedauc4afdcbk.canadacentral-01.azurewebsites.net/snp500"
            let data;
            try {
                setLoading(true);
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const jsonResposne = await response.json();
                data = jsonResposne['companies'];
                setAllStocks(data);
                if (!localStorage.getItem("mapping")) {
                    localStorage.setItem("mapping", JSON.stringify(data));
                }
                if (q) {
                    console.log("idhar to aaye the bhaiya")
                    data = matchSorter(data, q, { keys: ['name'] });
                }
                setStocks(data);
            }
            catch (err) {
                setError("Failed to fetch data from the server" + err.message);
                console.log("Error fetching data from the server", err);
            }
            finally {
                setLoading(false);
            }
        }
        getStocksData();
    }, []);
    useEffect(() => {
        document.getElementById("q").value = searchQ;
        const data = matchSorter(allStocks, searchQ, { keys: ['name'] });
        setStocks(data);
    }, [searchQ])

    if (error) {
        return (
            <div className="grid grid-cols-12 h-screen">
                <div className="flex flex-col col-span-2 text-red-500 bg-[#f7f7f7]">
                    <div>Some error occured, {error}</div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="grid grid-cols-12 h-screen overflow-hidden dark:bg-[#000000f3] dark:text-[#ffffff9f]">
                {!sidebarOpen &&
                    <button className="md:hidden mx-1 absolute top-8 w-5 h-5"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <img src={toggleIcon} alt="ci" className="inline w-10 h-10 invert" />
                    </button>}
                <div id='sidebar'
                    className={`md:col-span-2 col-span-12 w-full ${sidebarOpen ? 'block' : 'hidden md:block'}  flex flex-col mx-auto overflow-y-auto scrollbar-thin scrollbar-webkit dark:bg-[#111111]`}>
                    <div className="max-w-[300px]">
                        <div className="flex mt-6 self-center ml-4 mr-2 md:mx-auto top-0 z-10 sticky">
                            <Form id="search-form" role="search">
                                <input
                                    type="search"
                                    placeholder="Search"
                                    name="q"
                                    id="q"
                                    defaultValue={q}
                                    className="p-2 rounded-xl mx-auto pl-[2rem] w-[95%] dark:bg-[#212121]"
                                    onChange={(event) => {
                                        setSearchQ(event.target.value);
                                    }}
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='%23999' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' /%3E%3C/svg%3E")`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "0.625rem 0.75rem",
                                        backgroundSize: "1rem",
                                        position: "relative",
                                    }}
                                />
                            </Form>
                            {sidebarOpen &&
                                <button className="md:hidden mx-1 w-5 h-5"
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                >
                                    <img src={toggleIcon} alt="ci" className="inline w-10 h-10 invert" />
                                </button>}
                        </div>
                        <div className="flex flex-col items-centre m-3">
                            {loading ? <div className="dark:bg-inherit dark:text-white">
                                Loading...
                            </div>
                                :
                                <ul className="w-[90%]">
                                    {/* <div className="p-3 m-1 "> */}
                                    <Link to="/realtime">
                                        <button className="rounded-lg bg-[#212121] p-3 w-full text-white text-left mt-2">
                                            Realtime Random plot
                                        </button>
                                    </Link>
                                    {/* </div> */}
                                    {stocks.map((stock, index) => {
                                        return (
                                            // <div key={stock['ticker']} className="text-centre mt-2 p-2 rounded-md ">
                                            <NavLink to={`/stocks/${stock['ticker']}`}
                                                key={stock['ticker']}
                                                className={({ isActive }) =>
                                                    `block text-centre mt-2 p-2 rounded-md ${isActive ? 'bg-[#173372be] text-[#ffffffe1] font-bold' : 'hover:bg-gray-200 dark:hover:bg-gray-900'}`
                                                }
                                                onClick={(event) => {
                                                    if (location.pathname == `/stocks/${stock['ticker']}/prices`) {
                                                        // navigate(`/stocks/${stock['ticker']}/prices`, { replace: true });
                                                        event.preventDefault();
                                                    }
                                                    setSidebarOpen(false);
                                                    // navigate(`/stocks/${stock['ticker']}/prices`, {replace: true});
                                                }}
                                            >
                                                <li
                                                >
                                                    {stock['name']}
                                                </li>
                                            </NavLink>
                                            // {/* </div> */}
                                        )
                                    })}
                                </ul>}
                        </div>
                    </div>
                </div>
                <div className={`md:col-span-10 ${sidebarOpen ? 'hidden' : 'block'} md:block col-span-12 overflow-y-auto scrollbar-thin scrollbar-webkit m-4`}>
                    {/* <div className="flex justify-center items-center">
                        Kadi te has bol ve
                    </div> */}
                    <div className="flex justify-end">
                        <button
                            className="py-2 px-3 text-sm font-medium rounded-lg border border-gray-700 bg-gray-800 text-white hover:bg-gray-700" href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                logOut();
                            }}
                        >
                            Logout
                        </button>
                    </div>
                    <Outlet />
                </div>
            </div>
        </>
    )
}