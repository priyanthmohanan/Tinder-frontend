import axios from "axios";
import { BASE_URL } from "./utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "./utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed && feed.length > 0) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed");
      dispatch(addFeed(res.data));
      console.log(res);
    } catch (err) {
      console.error("Error", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return <p className="flex justify-center py-10">Loading...</p>;

  if (feed.length <= 0)
    return <h1 className="flex justify-center py-10"> No new users found</h1>;

  console.log("Current feed state on render:", feed);

  return (
    <div className="flex justify-center py-10">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;