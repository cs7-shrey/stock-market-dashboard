// the only data we require here is the stock ticker
import { useUserAuth } from "../context/UserAuthContext"
import { useLoaderData, Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export async function loader({ params }) {
    const stockId = params.stockId;
    // const companies = JSON.parse(localStorage.getItem("mapping"))['companies'];
    // const company = companies.find(company => company.ticker === stockId)['name'];
    return { stockId }
}
export default function StockPage() {
    const { user, logOut } = useUserAuth();
    const { stockId } = useLoaderData();
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        // navigate("/stocks/" + stockId + "/prices")
        if (location.pathname === `/stocks/${stockId}`) {
            navigate(`/stocks/${stockId}/prices`, { replace: true });
        }
    }, [stockId])
    return (
        <>
            <div className="flex flex-col">
                <div>
                    <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-betwee mt-6">
                        <div className="grid sm:grid-cols-4 grid-cols-2 items-center justify-center w-full mt-3 sm:justify-end sm:mt-0">
                            <div className="text-center">
                                <Link to={`/stocks/${stockId}/prices`} className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 mx-auto" aria-current="page">Stock Price</Link>
                            </div>
                            <div className="text-center">
                                <Link to={`/stocks/${stockId}/income-statements`} className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 mx-auto">Income Statements</Link>
                            </div>
                            <div className="text-center">
                                <Link to={`/stocks/${stockId}/balance-sheet`} className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 mx-auto">Balance Sheet</Link>
                            </div>
                            <div className="text-center">
                                <Link to={`/stocks/${stockId}/ratios`} className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 mx-auto" href="#">Ratios</Link>
                            </div>
                        </div>
                    </nav>
                </div>
                <div>
                    {/* {stockId} */}
                    <Outlet />
                </div>
            </div>
        </>
    )
}