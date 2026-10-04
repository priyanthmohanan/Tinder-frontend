import React, { Fragment, useEffect } from 'react'
import { Outlet } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { addUser } from './utils/userSlice';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux'



const Body = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(store => store.user)

  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get("http://localhost:3000/profile/view")
      console.log("from body", res)
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pb-16 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Body
