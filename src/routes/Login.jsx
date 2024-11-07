// import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import AuthForm from "../components/AuthForm";
import GoogleButton from "../components/GoogleButton";
import Bat from "../assets/bat.svg"

// firebase import  [left for now]

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn, user, loading } = useUserAuth();
  const navigate = useNavigate();
  const [loggingIn, setLoggingIn] = useState(false);
  const dpr = window.devicePixelRatio;
  const scaleRatio = 1.1 / dpr;

  useEffect(() => {
    if (user) {
      console.log("user to hai")
      navigate('/');
    }
  }, [loading])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoggingIn(true);
      await logIn(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
      console.log("error in login", error);
    }
    finally {
      setLoggingIn(false);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    console.log("google sign in clicked")
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      setError(error.message)
      console.log("ye bhaiya google sign in mein error aagya hai", error)
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
      {user ? <div className="dark:bg-black w-full h-full dark:text-white">
      </div>
        :
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 dark:bg-black"
          // style={{
          //   "transform": `scale(${scaleRatio})`
          // }}
        >


          <div
            className="shadow-lg rounded-xl p-4 sm:w-[450px] mx-auto dark:bg-[rgb(14,15,15)]"
          >
            {/* <img src="/oie_17111940SXFKCAAB-removebg-preview.png" alt="yourcompany" 
            className="mx-auto w-44 h-40 invert-1 text-white"
          /> */}
            {/* <Bat /> */}
            <div className="flex justify-center">
              <img src={Bat} alt='mySvgImage' className="w-[150px] h-[150px] invert" />
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
              <AuthForm
                onEmailChange={(e) => setEmail(e.target.value)}
                onPasswordChange={(e) => setPassword(e.target.value)}
                onSubmit={handleSubmit}
                type="Sign In"
                error={error}
                processing={loggingIn}
              />
              {/* {loggingIn && <>
                <Loading />
              </>} */}
              <br />
              <div className="self-center mx-auto w-fit">
                {/* <GoogleButton
                    className="g-btn rounded-xl"
                    type="dark"
                    onClick={handleGoogleSignIn}
                /> */}
                <GoogleButton onClick={handleGoogleSignIn} />
              </div>
              <div className="p-4 box mt-3 text-center dark:text-white">
                Don't have an account?
                <Link to="/signup"
                  className="mx-2 p-2 rounded-lg text-white underline"
                >
                  {/* {" "} */}
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}
