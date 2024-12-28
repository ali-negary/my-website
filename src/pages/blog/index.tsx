import { useEffect, useState } from "react";

type BlogPost = {
  id: number;
  title: string;
  content: string;
};

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="py-2">
            <h2 className="text-xl">{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
