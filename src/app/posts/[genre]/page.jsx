import { db } from "@/utils/dbConn";
import TiledPosts from "@/app/components/TiledPosts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function PostsGenre({params, searchParams}) {

  const posts = (await db.query(`
    SELECT p.id, p.created_at, p.artist, p.title, p.content, p.link, p.genre, g.name AS genre_name 
    FROM mus_posts p
    INNER JOIN mus_genres g
    ON p.genre = g.id
    WHERE LOWER(g.name) = $1
    ORDER BY p.id DESC`,
    [params.genre]
  )).rows;

  async function deletePost(postId) {
    "use server"
    await db.query(`
      DELETE FROM mus_posts WHERE id = $1`,
      [postId]
    );
    const path = `/posts/`
    revalidatePath(path);
    redirect(path);
  }

  return (
    <div>
      <TiledPosts posts={posts} searchParams={searchParams} deletePost={deletePost}/>
    </div>
  )
}