/* eslint-disable @next/next/no-img-element */
// @ts-nocheck
import { useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { fetchTweets } from "../utils/fetchTweets";

import Tweet from "./Tweet";
import TweetBox from "./TweetBox";
import { toast } from "react-hot-toast";

function Feed({ tweets: serverProps }) {
  const [tweets, setTweets] = useState(serverProps);
  // console.log("SSR: ", serverProps);
  // console.log(tweets); // Here we also client-side render
  const handleRefresh = async () => {
    const refreshToast = toast.loading("Refreshing...");
    const tweets = await fetchTweets();
    setTweets(tweets);
    toast.success("Feed updated!", {
      id: refreshToast,
    });
  };
  return (
    <div className="max-h-screen col-span-6 mt-2 overflow-scroll border-x lg:col-span-4 scrollbar-hide">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <ArrowPathIcon
          className="mt-5 mr-5 transition-all duration-500 ease-out cursor-pointer w-7 h-7 text-twitter hover:rotate-180 active:scale-125"
          onClick={handleRefresh}
        />
      </div>
      {/* Middle (Input) */}
      <div>
        <TweetBox setTweets={setTweets} />
      </div>
      {/* Bottom (All Tweets) */}
      <div>
        {tweets.map((tweet) => (
          <Tweet key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
