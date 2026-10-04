import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from './utils/userSlice';
import { useNavigate } from 'react-router';
import { BASE_URL } from "./utils/constant";


const Login = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailID,
        password
      })
      console.log("From login", res);
      dispatch(addUser(res.data.user));
      return navigate('/');
    } catch (err) {
      setError(err ?.response ?.data);
    }
  }

  const handleSignUp = async () => {
    try {
      const res = await axios.post(BASE_URL + "/signup", {
        firstName,
        lastName,
        emailID,
        password
      })
      console.log("From Signup", res);
      dispatch(addUser(res.data.savedUser));
      return navigate('/profile');
    } catch (err) {
      setError(err ?.response ?.data);
    }
  }


  return (
    <div className="flex justify-center py-10">
      <div className="card bg-neutral-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          {!isLoggedIn && <><div>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input input-bordered w-full max-w-xs" />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input input-bordered w-full max-w-xs" />
            </label>
          </div>
          </>}
          <div>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email Id</span>
              </div>
              <input type="text" value={emailID} onChange={(e) => setEmailID(e.target.value)} className="input input-bordered w-full max-w-xs" />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input input-bordered w-full max-w-xs" />
            </label>
          </div>
          <p className="text-red-700">{error}</p>
          <div className="card-actions justify-center">
            <button onClick={isLoggedIn ? handleLogin : handleSignUp}
              className="btn btn-primary">
              {isLoggedIn ? "Login" : "Sign Up"}
            </button>
          </div>
          <p className="flex justify-center cursor-pointer"
           onClick={() => setIsLoggedIn((value) => !value)}>
           {!isLoggedIn ? "Existing User? Login here" : "New user? Sign Up"}
           </p>
        </div>
      </div>
    </div>

  )
}

export default Login
