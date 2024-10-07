import CreatePostForm from "@/app/components/CreatePostForm";
import { db } from "@/utils/dbConn";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function NewPost() {
  
  async function insertPost(formData) {
    "use server";
    await db.query(`
      INSERT INTO mus_posts
      (artist, title, link, genre, content)
      VALUES
      ($1,$2,$3,$4,$5)`,
      [formData.artist,formData.title,formData.link,formData.genre,formData.content]
    );

    revalidatePath("/posts");
    redirect("/posts");
  }

  const response = await db.query(`SELECT * FROM mus_genres`);
  const genreOptions = response.rows;

  return (
    <CreatePostForm insertPost={insertPost} genreOptions={genreOptions}/>
  )
}