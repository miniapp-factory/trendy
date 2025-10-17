import { useEffect, useState } from "react";
import { useMiniAppContext } from "@/components/context/miniapp-provider";
import PostItem from "./post-item";

export default function PostList() {
  const { contract, signer } = useMiniAppContext();
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!contract || !signer) return;
      const address = await signer.getAddress();
      const rawPosts = await contract.getUserPosts(address);
      setPosts(rawPosts);
    };
    fetchPosts();
  }, [contract, signer]);

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">My Posts</h2>
      <div className="grid gap-4">
        {posts.map((p, idx) => (
          <PostItem key={idx} post={p} />
        ))}
      </div>
    </section>
  );
}
