import PostEdit from "@/app/components/PostEdit"
import { db } from "@/utils/dbConn";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function EditPostPage({params}) {

  const post = (await db.query(`
    SELECT * FROM mus_posts WHERE id = $1`,
    [params.id]
  )).rows[0];

  const response = await db.query(`SELECT * FROM mus_genres`);
  const genreOptions = response.rows;

  async function editPost(formData) {
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


  return (
    <PostEdit post={post} editPost={editPost} genreOptions={genreOptions}/>
  )
}