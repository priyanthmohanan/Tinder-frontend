import React, { useEffect } from 'react'
import axios from 'axios';
import { BASE_URL } from './utils/constant';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { addRequest, removeRequest } from './utils/requestSlice';



const Requests = () => {
  const requests = useSelector(store => store.request)
  const dispatch = useDispatch();

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/requests/received')
      console.log(res);
      dispatch(addRequest(res.data.data))
    } catch (err) {
      console.log(err ?.response ?.data)
    }
  }

  const reviewRequest = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) { }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests) return;
  if (requests ?.length === 0) return <h1 className="flex justify-center my-10">No Requests found</h1>

  console.log("Request Slice", requests)

  return (
    <div className="my-10 mx-auto max-w-3xl">
      <h1 className="text-bold text-2xl p-2 mb-4">
        Received Request
      </h1>
      {requests && requests.map(request => (
        <div className="card card-side bg-neutral text-neutral-content shadow-xl mb-4">
          <figure className="w-40 h-40 p-2 shrink-0">
            <img
              className="w-full h-full object-cover"
              src={request.fromUserId.photoUrl}
              alt="User Photo" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-base"> Name: {request.fromUserId.firstName + " " + request.fromUserId.lastName}</h2>
            <h3 className="text-sm">Age: {request.fromUserId.age}</h3>
            <h3 className="text-sm capitalize">Gender: {request.fromUserId.gender}</h3>
            <h3 className="text-sm">About: {request.fromUserId.about}</h3>
            <div className="card-actions justify-center my-2">
              <button className="btn btn-primary" onClick={() => reviewRequest("rejected", request._id)}>
                Reject
              </button>
              <button className="btn btn-secondary" onClick={() => reviewRequest("accepted", request._id)}>
                Accept
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Requests
