"use client"

import timeAgo from "@/utils/timeAgo";
import Link from "next/link";
import Image from "next/image"; // dont remove - used for bg image in css
import cloudImage from "@/app/public/genres/cloud.jpg" // dont remove ^^^^
import dnbImage from "@/app/public/genres/dnb.jpg"
import trapImage from "@/app/public/genres/trap.jpg"
import houseImage from "@/app/public/genres/house.jpg"
import phonkImage from "@/app/public/genres/phonk.jpg"
import vaporwaveImage from "@/app/public/genres/vaporwave.jpg"
import futurefunkImage from "@/app/public/genres/futurefunk.jpg"
import synthwaveImage from "@/app/public/genres/synthwave.webp"
import lofiImage from "@/app/public/genres/lofi.jpg"
import '@/app/styles/post.css';
import { FaComment, FaShare, FaRegHeart, FaPenToSquare, FaTrashCan } from "react-icons/fa6";


export default function PostFull({post, deletePost}) {

  return (
    
    <div 
      key={post.id}
      className={`py-3.5 px-4 rounded-3xl w-5/6 genre-bg-${post.genre_name.toLowerCase().replace(/ /g,'')} drop-shadow`}
    >
      <div 
        className="py-3.5 px-5 rounded-2xl bg-neutral-800 bg-opacity-70 opacity-95 drop-shadow"
      >
        <span
          className="float-right text-sm text-stone-300"
        >
          {timeAgo(new Date(post.created_at))}
        </span>
        <h3 className="font-bold text-2xl">
          {post.title}
        </h3>
        <span className="bg-gcloud bg-gdnb bg-gtrap bg-ghouse bg-gphonk bg-gvaporwave bg-gfuturefunk bg-gsynthwave bg-glofi"></span> {/* silly fake element to load the genre tags in tailwind, they don't load via template literals unless we have already loaded without. */}
        <span 
          className={`bg-g${post.genre_name.toLowerCase().replace(/ /g,'')} text-black rounded-xl px-2 py-1 ml-4 font-bold align-text-top float-right drop-shadow`}
        >
          {post.genre_name}
        </span>

        <h4 className="font-thin text-lg"> 
          {post.artist}
        </h4>

        <p className="clear-left pt-2 pb-3">
          {post.content}
        </p>

        <iframe 
          width="100%" 
          height="20" 
          frameborder="no" 
          src={`https://w.soundcloud.com/player/?url=${post.link}&amp;color=ff0000&amp;inverse=true&amp;auto_play=false&amp;show_user=true" style="background:black;`}
        ></iframe>
        
      </div>

      <div className="w-full pt-4 px-4">
        <ul className="w-full flex flex-row justify-evenly items-center text-gray-800 text-3xl bg-cinereous-800 bg-opacity-70 rounded-2xl py-2 drop-shadow">

          <li>
            <button><FaRegHeart/></button>
          </li>

          <li>
            <Link href={`/posts/${post.genre_name}/${post.id}`}>
              <FaComment />
            </Link>
          </li>

          <li>
            <button><FaShare/></button>
          </li>

          <li>
            <Link href={`/posts/${post.genre_name}/${post.id}/edit`}>
              <FaPenToSquare/>
            </Link>
          </li>

          <li>
            <button onClick={()=>deletePost(post.id)}>
              <FaTrashCan/>
            </button>
          </li>

        </ul>
      </div>

    </div>
  )
}