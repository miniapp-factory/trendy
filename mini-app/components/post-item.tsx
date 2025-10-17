export default function PostItem({ post }: { post: any }) {
  return (
    <div className="border rounded-lg p-4">
      <img src={post.mediaUrl} alt="post media" className="w-full h-48 object-cover rounded" />
      <p className="mt-2 text-sm">{post.caption}</p>
    </div>
  );
}
