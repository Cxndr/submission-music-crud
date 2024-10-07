import PostTile from "../components/PostTile";

export default function TiledPosts({posts, searchParams, deletePost}) {

  if (searchParams) { // no searchParams when accessing through / route
    if (searchParams.sort === "asc") {
      posts.reverse();
    }
  }

  

  return (
    <>
      <div className="flex justify-center flex-wrap gap-6 p-6">
      {/* <div className="grid grid-cols-4 gap-6 p-6"> */}
        {posts.map((post) => (
          <PostTile key={post.id} post={post} deletePost={deletePost}/>
        ))}
      </div>

    </>
  )
}