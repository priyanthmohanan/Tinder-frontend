import React, { useEffect } from 'react';
import axios from "axios";
import { BASE_URL } from './utils/constant';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux'
import { addConnection } from './utils/connectionSlice';



const Connections = () => {
  const connections = useSelector(store => store.connection)
  const dispatch = useDispatch();


  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections")
      console.log(res.data.data);
      dispatch(addConnection(res.data.data))
    } catch (err) {
      console.log(err ?.response ?.data)
    }
  }


  useEffect(() => {
    fetchConnections();
  }, [])
  if (!connections) return;
  if (connections ?.length === 0) return <h1  className="flex justify-center my-10">No Connections found</h1>


  return (
    <div className="my-10 mx-auto max-w-3xl">
      <h1 className="text-bold text-2xl mb-4">
        Connections
      </h1>
      {connections && connections.map(connection => (
        <div className="card card-side bg-base-100 shadow-xl mb-4">
          <figure className="w-40 h-40 p-2 shrink-0">
            <img
              className="w-full h-full object-cover"
              src={connection.photoUrl}
              alt="User Photo" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-base"> Name: {connection.firstName + " " + connection.lastName}</h2>
            <h3 className="text-sm">Age: {connection.age}</h3>
            <h3 className="text-sm capitalize">Gender: {connection.gender}</h3>
            <h3 className="text-sm">About: {connection.about}</h3>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Connections
