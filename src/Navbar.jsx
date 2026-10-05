import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeUser } from './utils/userSlice';
import { useNavigate } from 'react-router';
import { BASE_URL } from './utils/constant';

const Navbar = () => {

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async (res) => {
    try {
      await axios.post(BASE_URL + '/logout', {})
      dispatch(removeUser());
      navigate('/login');
    } catch (err) {
      console.error("Logout failed:", err.response ?.data || err.message);
    }
  }

  return (
    <div className="navbar bg-neutral text-neutral-content z-50 fixed top-0">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl text-neutral-content hover:bg-neutral-content hover:text-neutral-700">
          DevTinder
      </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
        </div>
        {user && (
          <div className="mx-5 flex items-center">
            <p className="px-2">Welcome {user.firstName}</p>
            <div className="dropdown dropdown-end">
              <div tabIndex="0" role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="User photo"
                    src={user.photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
                </div>
              </div>
              <ul
                tabIndex="0"
                className="menu menu-sm dropdown-content  bg-base-100 text-base-content rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                  <Link to="/profile" className="justify-between text-base-content hover:bg-base-200 focus:bg-base-200 focus:text-base-content">
                    Profile
              <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections" className="justify-between text-base-content hover:bg-base-200 focus:bg-base-200 focus:text-base-content">
                    Connections
              </Link>
                </li>
                <li>
                  <Link to="/requests" className="justify-between text-base-content hover:bg-base-200 focus:bg-base-200 focus:text-base-content">
                    Requests
            </Link>
                </li>
                <li onClick={handleLogout} className="justify-between text-base-content hover:bg-base-200 focus:bg-base-200 focus:text-base-content">
                  Logout
                </li>
              </ul>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Navbar
