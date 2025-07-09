import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName: firstName,
          lastName: lastName,
          email: emailID,
          password: password,
        },
        { withCredentials: true }
      );
      console.log(res.data);

      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err.response.data || "Something went wrong");
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email: emailID,
          password: password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err.response.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center my-30">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          <div className="my-4">
            {!isLoginForm && (
              <>
                <label className="form-control w-full max-w-xs">
                  <div className="label my-2">
                    <span className="label-text">Fisrt Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label my-2">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </>
            )}
            <label className="form-control w-full max-w-xs">
              <div className="label my-2">
                <span className="label-text">Email ID</span>
              </div>
              <input
                type="email"
                value={emailID}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmailID(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-4">
              <div className="label my-2">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                value={password}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          <p
            className="m-auto cursor-pointer py-2"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "New User? Signup Here"
              : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
