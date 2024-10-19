import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useUserAuth();    
    if(loading) {
        return <div>loading...</div>;
    }
    // when the value of loading changes, the component will re-render
    console.log("check user in private: ", user);
    if(!user) {
        return <Navigate to="/" />
    }
    return children;
}

export default ProtectedRoute;

