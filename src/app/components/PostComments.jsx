"use client"

import timeAgo from "@/utils/timeAgo";
import Link from "next/link";
import { FaPenToSquare, FaTrashCan } from "react-icons/fa6";

export default function PostComments({post, comments, deleteComment}) {

  return (
    
    <div className="flex flex-col gap-4 m-4 w-full">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-zinc-200 bg-opacity-70 rounded-3xl py-4 px-6 text-stone-800 text-2xl">

          <span
            className="float-right text-base text-stone-800"
          >
            {timeAgo(new Date(post.created_at))}
          </span>

          <div className="clear-right float-right flex flex-row gap-3 pt-3 pl-2">
            <Link href={`/posts/${post.genre}/${post.id}/${comment.id}/edit`}>
              <FaPenToSquare/>
            </Link>
            <button onClick={()=>deleteComment(comment.id)}>
              <FaTrashCan/>
            </button>
          </div>
          
          <h4
            className="font-bold"
          >
            {comment.user_name}
          </h4>
        
          <p>{comment.content}</p>
        
        </div>
      ))}
    </div>

  )
}