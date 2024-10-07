import PostTile from "../components/PostTile";

export default function TiledPosts({posts, searchParams, deletePost}) {

  if (searchParams) { // no searchParams when accessing through / route
    if (searchParams.sort === "asc") {
      posts.reverse();
    }
  }

  return (
    <div className="flex items-start flex-wrap gap-6 p-6">
        {posts.map((post) => (
          <PostTile post={post} deletePost={deletePost}/>
        ))}
      </div>
  )
}