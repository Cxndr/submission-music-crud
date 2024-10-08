import { db } from "@/utils/dbConn";
import TiledPosts from "../components/TiledPosts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { FaSortAmountDownAlt, FaSortAmountUp } from "react-icons/fa";
import Link from "next/link";

export default async function PostFeed({searchParams}) {

  const posts = (await db.query(`
    SELECT p.id, p.created_at, p.artist, p.title, p.content, p.link, p.genre, g.name AS genre_name 
    FROM mus_posts p
    INNER JOIN mus_genres g
    ON p.genre = g.id
    ORDER BY p.id DESC
    `)).rows;

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
    <>
      <div className="flex justify-center items-center gap-6 pl-16 mt-9 mb-3 ">
        <div className={`bg-slate-200 bg-opacity-70 px-4 py-2.5 rounded-3xl dropshadowmed text-blacklighter`}>
            <h2 className="roboto text-5xl font-bold">all music</h2>
          </div>
          { posts.length > 1 &&
            <div className="text-4xl dropshadowbig sort-icon">
              {
                  searchParams && (searchParams.sort === "asc")
                  ? <Link href={`/posts/?sort=desc`}> <FaSortAmountDownAlt/> </Link>
                  : <Link href={`/posts/?sort=asc`}> <FaSortAmountUp/> </Link>
              }
            </div>
          }
      </div>
    
      <TiledPosts posts={posts} searchParams={searchParams} deletePost={deletePost}/>

    </>
  )
}