import { db } from "@/utils/dbConn";
import TiledPosts from "@/app/components/TiledPosts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FaSortAmountDownAlt, FaSortAmountUp } from "react-icons/fa";

export default async function PostsGenre({params, searchParams}) {

  const genreName = (await db.query(`
      SELECT name
      FROM mus_genres
      WHERE LOWER(REPLACE(name, ' ', ''))  = $1`,
      [params.genre]
    )).rows[0].name;

  const posts = (await db.query(`
    SELECT p.id, p.created_at, p.artist, p.title, p.content, p.link, p.genre, g.name AS genre_name 
    FROM mus_posts p
    INNER JOIN mus_genres g
    ON p.genre = g.id
    WHERE LOWER(REPLACE(g.name, ' ', '')) = $1
    ORDER BY p.id DESC`,
    [params.genre]
  )).rows;

  let iconOffsetClass = ""
  if (posts.length > 1) {
    iconOffsetClass="pl-16"
  }

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
      <div 
        className={`flex justify-center items-center gap-6 mt-9 mb-3 ${iconOffsetClass}`}>
        <div className={`bg-g${params.genre} bg-opacity-70 px-4 py-2.5 rounded-3xl dropshadowmed text-blacklighter`}>
            <h2 className="roboto text-5xl font-bold">{`${genreName}`}</h2>
          </div>
          { posts.length > 1 &&
            <div className="text-4xl dropshadowbig">
              {
                  searchParams && (searchParams.sort === "asc")
                  ? <Link href={`/posts/${params.genre}/?sort=desc`}> <FaSortAmountDownAlt/> </Link>
                  : <Link href={`/posts/${params.genre}/?sort=asc`}> <FaSortAmountUp/> </Link>
              }
            </div>
          }
      </div>

      <TiledPosts posts={posts} searchParams={searchParams} deletePost={deletePost}/>
    </>

  )
}