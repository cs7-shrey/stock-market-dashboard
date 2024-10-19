import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { useEffect, useState } from "react";
import AuthForm from "../components/AuthForm";
import Loading from "../components/Loading";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [signingUp, setSigningUp] = useState(false);
  const [password, setPassword] = useState("");
  const { signUp, user, loading, logOut } = useUserAuth();
  let navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("user to hai")
      navigate('/');
    }
  }, [loading])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSigningUp(true);
      console.log("signing up")
      await signUp(email, password);
      await logOut();
      navigate("/login");
    } catch (error) {
      setError(error.message)
      console.log("ye bhaiya email signup mein error aagya", error.message)
    }
    finally {
      setSigningUp(false);
    }
  }
  if (loading) {
    return (
      <div className="dark:bg-black w-full h-full dark:text-white">
      </div>
    )
  }
  return (
    <>
      {!user ?
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 dark:bg-black">
          {signingUp && <>
            <Loading />
          </>}
          <div className="shadow-lg rounded-xl p-4 sm:w-[450px] mx-auto dark:bg-[rgb(14,15,15)]">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
                Sign up
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <AuthForm onEmailChange={(e) => setEmail(e.target.value)} onPasswordChange={(e) => setPassword(e.target.value)} onSubmit={handleSubmit} type="Sign Up" error={error} />
              <div className="p-4 box mt-3 text-center dark:text-white">
                Already have an account?
                <Link to="/login"
                  className="mx-2 p-2 rounded-lg underline text-white"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div> :
        <div className="dark:bg-black w-full h-full">

        </div>
      }
    </>
  )
}