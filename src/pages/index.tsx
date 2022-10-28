import type { NextPage } from "next";
import { useEffect, useState } from "react";

interface ApiProps {
  item: {
    title: string;
    subTitle: string;
  };
  subIte: {
    title: string;
    subTitle: string;
  };
}

export const fetchPosts = async () => {
  const res = await fetch("http://localhost:3000/api/objectdata");
  const posts: ApiProps = await res.json();
  return posts;
};

const Home: NextPage = () => {
  const [posts, setPosts] = useState<ApiProps>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await fetchPosts();
      setPosts(data);
      setIsLoading(false);
    })();
  }, []);

  //   useEffect(() => {
  //     (async function () {
  //       const data: any = await fetchPosts();

  //       setPosts(data);
  //       setIsLoading(false);
  //     })();
  //   }, []);

  useEffect(() => {
    if (!posts) return console.log("not posts");
    console.log("bbb", posts?.item.title);
  }, [posts]);

  if (!posts) return <p>now loading...</p>;
  return (
    <>
      <h1>Index page</h1>
      {isLoading && <h2>Loading...</h2>}
      <p>{posts?.item.title}</p>
    </>
  );
};

export default Home;
