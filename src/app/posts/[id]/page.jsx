import { db } from "@/utils/utils"

export default async function PostPage({params}) {

  const post = (await db.query(`SELECT * FROM mus_posts WHERE id = ${params.id}`)).rows[0];

  return(
    <>
      <h3>{post.title}</h3>
      <span>{new Date(post.created_at).toLocaleString()}</span>
      <p>{post.content}</p>
      <img src={post.image} alt={"post-image"} width="200" height="200"/>
      <div dangerouslySetInnerHTML={{__html: post.link}}></div>
    </>
  )
}