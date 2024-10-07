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
      UPDATE mus_posts
      SET artist=$1, title=$2, link=$3, genre=$4, content=$5
      WHERE id=$6`,
      [formData.artist,formData.title,formData.link,formData.genre,formData.content, params.id]
    );

    revalidatePath("/posts");
    redirect("/posts");
  }


  return (
    <PostEdit post={post} editPost={editPost} genreOptions={genreOptions}/>
  )
}