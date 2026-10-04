import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { BASE_URL } from "./utils/constant";
import { removeUserFeed } from "./utils/feedSlice";

const SWIPE_THRESHOLD = 120; // px to drag before a swipe counts

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, about, photoUrl } = user;
  const dispatch = useDispatch();

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const interestedOpacity = useTransform(x, [0, 100], [0, 1]);
  const ignoreOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFeed(userId));
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleDragEnd = (_, info) => {
    if (info.offset.x > SWIPE_THRESHOLD) {
      handleSendRequest("interested", _id);
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      handleSendRequest("ignored", _id);
    }
  };

  return (
    <motion.div
      className="card bg-neutral text-neutral-content w-96 shadow-xl relative cursor-grab active:cursor-grabbing"
      style={{ x, rotate }}
      drag="x"
      dragSnapToOrigin
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
    >
      <motion.span
        style={{ opacity: interestedOpacity }}
        className="absolute top-4 left-4 z-10 text-pink-500 font-bold text-2xl border-4 border-pink-500 rounded px-2 -rotate-12"
      >
        INTERESTED
      </motion.span>
      <motion.span
        style={{ opacity: ignoreOpacity }}
        className="absolute top-4 right-4 z-10 text-indigo-500 font-bold text-2xl border-4 border-indigo-500 rounded px-2 rotate-12"
      >
        IGNORE
      </motion.span>

      <figure>
        <img
          src={
            photoUrl ||
            "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          }
          alt="User Photo"
          draggable={false}
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && <p>{age}</p>}
        {gender && <p className="capitalize">{gender}</p>}
        {about && <p>{about}</p>}

        <div className="card-actions justify-center my-2">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default UserCard;