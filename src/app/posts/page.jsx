import { db } from "@/utils/utils";
import Image from "next/image";
import cloudImg from "../public/genres/cloud.jpg";
import './posts.css';
import { timeAgo } from "@/utils/utils";

export default async function PostFeed({searchParams}) {

  const posts = (await db.query(`
    SELECT p.id, p.created_at, p.title, p.content, p.link, p.genre, g.name AS genre_name 
    FROM mus_posts p
    INNER JOIN mus_genres g
    ON p.genre = g.id
    ORDER BY p.id DESC
    `)).rows;

  if (searchParams) { // no searchParams when accessing through / route
    if (searchParams.sort === "asc") {
      posts.reverse();
    }
  }
  console.log(cloudImg);

  return (
    <div>
      <h2>All Posts</h2>
      <ul className="flex items-start flex-wrap gap-6 p-6">
        {posts.map((post) => (
          <li 
            key={post.id}
            className="w-[calc((100%/4)-(((4-1)/4)*1.5rem))] py-3.5 px-4 rounded-3xl genre-bg-1 "
          >
            <div 
              className="py-3.5 px-5 rounded-2xl bg-neutral-800 opacity-60"
            >
              {/* <Image src={cloudImg} alt="clouds"></Image> */}
              <span
                className="float-right text-sm text-stone-300"
              >{timeAgo(new Date(post.created_at))}</span>
              <h3 className="float-left font-bold text-xl">{post.title}</h3>
              <span className="bg-blue-300 text-black rounded-xl px-2 py-1 ml-4 font-bold align-text-top">{post.genre_name}</span>
              <p className="clear-left pt-2 pb-3">{post.content}</p>
              <iframe 
                width="100%" 
                height="20" 
                frameborder="no" 
                src={`https://w.soundcloud.com/player/?url=${post.link}&amp;color=ff0000&amp;inverse=true&amp;auto_play=false&amp;show_user=true" style="background:black;`}
              ></iframe>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}