import { useEffect, useState } from "react";
import { useMiniAppContext } from "@/components/context/miniapp-provider";
import IdCard from "./id-card";
import PostList from "./post-list";

export default function Dashboard() {
  const { contract, signer } = useMiniAppContext();
  const [idNumber, setIdNumber] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("0");
  const [postCount, setPostCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!contract || !signer) return;
      const address = await signer.getAddress();
      const id = await contract.userId(address);
      setIdNumber(id.toString());
      const bal = await signer.getBalance();
      setBalance(ethers.utils.formatEther(bal));
      const posts = await contract.getUserPosts(address);
      setPostCount(posts.length);
    };
    fetchData();
  }, [contract, signer]);

  return (
    <section className="w-full max-w-2xl mx-auto space-y-6">
      <IdCard idNumber={idNumber} />
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="text-sm font-medium">Wallet Balance</h3>
          <p className="text-lg">{balance} BASE</p>
        </div>
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="text-sm font-medium">Posts Uploaded</h3>
          <p className="text-lg">{postCount}</p>
        </div>
      </div>
      <PostList />
    </section>
  );
}
