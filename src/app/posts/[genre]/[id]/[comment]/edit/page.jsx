import { db } from "@/utils/dbConn";
import CommentEdit from "@/app/components/CommentEdit";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function EditCommentPage({params}) {

  const comment = (await db.query(`
    SELECT * FROM mus_comments WHERE id = $1`,
    [params.comment]
  )).rows[0];

  async function editComment(formData) {
    "use server";

    await db.query(`
      UPDATE mus_comments
      SET user_name=$1, content=$2
      WHERE id=$3`,
      [formData.user_name, formData.content, params.comment,]
    );

    const path = `/posts/${params.genre}/${params.id}`
    revalidatePath(path);
    redirect(path);
  }

  return (
    <CommentEdit comment={comment} editComment={editComment}/>
  )
}