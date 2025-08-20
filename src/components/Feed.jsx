import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed !== null) return; // only skip if we already have data
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      console.log("FEED API RESPONSE:", res.data);
      dispatch(addFeed(res.data)); // res.data is the array
    } catch (err) {
      console.error("Feed fetch error:", err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed)
    return <h1 className="flex justify-center my-10">Loading...</h1>;

  if (feed.length === 0)
    return <h1 className="flex justify-center my-10">No new users found!</h1>;

  return (
    <div className="flex flex-wrap justify-center gap-6 my-10">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
