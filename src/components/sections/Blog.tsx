import { useEffect, useState } from "react";

type BlogPost = {
  id: number;
  title: string;
  summary: string;
  image: string;
};

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <section id="blog" className="py-20 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Blog</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="rounded overflow-hidden shadow-lg">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold">{post.title}</h3>
                <p className="text-gray-600">{post.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
