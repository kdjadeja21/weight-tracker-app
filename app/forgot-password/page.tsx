"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import withToaster from "../withToaster";
import { FirebaseError } from "firebase/app";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import withReduxProvider from "../withReduxProvider";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const resetEmail = async () => {
    try {
      setIsLoading(true);
      await sendPasswordResetEmail(auth, email);
      toast.success(
        "A Reset Password link has been sent to your registered email address."
      );
      setIsLoading(false);
    } catch (error) {
      console.log({ error });
      if (error instanceof FirebaseError) {
        toast.error(error.message.replace("Firebase: ", ""));
      } else {
        toast.error("An error occurred.");
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Forgot Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 bg-gray-700 px-1.5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={resetEmail}
                disabled={!email || isLoading}
                className={`flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50 disabled:pointer-events-none ${
                  isLoading ? "opacity-40 pointer-events-none" : ""
                }`}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-400">
            Back to{" "}
            <button
              onClick={() => router.push("signin")}
              className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default withReduxProvider(withToaster(ForgotPassword));
