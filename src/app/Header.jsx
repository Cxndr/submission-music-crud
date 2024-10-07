import Link from "next/link";
import { db } from "@/utils/dbConn";


export default async function Header() {

  const response = await db.query(`SELECT * FROM mus_genres ORDER BY id asc`);
  const genreOptions = response.rows;

  return (
    <header>
      <Link href="/"><h1>Clouds&Waves</h1></Link>
      {/* <h1>Clouds&Waves</h1> */}
      <nav className="w-4/5 flex justify-end items-center">
        
        <div className="h-full text-4xl flex justify-evenly items-center flex-wrap gap-10">
          <Link href="/">Feed</Link>
          <Link href="/posts/new">Add Music</Link>
          <span className="h-4/5 border-r-2 border-ultra_violet-700 mr-6"></span>
        </div>

        <div className="w-1/2 h-full text-xl flex items-center flex-wrap gap-x-6 gap-y-2">
          {genreOptions.map((genre) => (
            <Link 
              key={genre.id}
              href={`/posts/${genre.name.toLowerCase()}`}
            >
              {genre.name.toLowerCase()}
            </Link>
          ))}
        </div>

      </nav>
    </header>
  )
}