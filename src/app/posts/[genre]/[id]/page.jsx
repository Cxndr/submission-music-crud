import { db } from "@/utils/dbConn";
import PostFull from "@/app/components/PostFull";
import PostComments from "@/app/components/PostComments";
import CommentForm from "@/app/components/CommentForm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function PostPage({params}) {
  const post = (await db.query(`
    SELECT p.id, p.created_at, p.artist, p.title, p.content, p.link, p.genre, g.name AS genre_name 
    FROM mus_posts p
    INNER JOIN mus_genres g
    ON p.genre = g.id
    WHERE p.id=$1
    ORDER BY p.id DESC`,
    [params.id]
  )).rows[0];

  const comments = (await db.query(`
    SELECT * FROM mus_comments WHERE post_id = $1`,
    [post.id]
  )).rows;

  async function deleteComment(commentId) {
    "use server"
    await db.query(`
      DELETE FROM mus_comments WHERE id = $1`,
      [commentId]
    );
    const path = `/posts/${params.genre}/${params.id}`
    revalidatePath(path);
    redirect(path);
  }
  
  async function insertComment(formData) {
    "use server";
    await db.query(`
      INSERT INTO mus_comments
      (user_name, content, post_id)
      VALUES
      ($1,$2,$3)`,
      [formData.user_name, formData.content, params.id]
    );

    const path = `/posts/${params.genre}/${params.id}`
    revalidatePath(path);
    redirect(path);
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


  return(
    <div className="flex flex-col gap-12 justify-center items-center">
      <PostFull post={post} deletePost={deletePost}/>
      <CommentForm insertComment={insertComment}/>
      <PostComments post={post} comments={comments} deleteComment={deleteComment}/>
    </div>
  )
}