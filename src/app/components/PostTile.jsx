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
  import { useState, useRef } from "react";


  export default function PostTile({post, deletePost}) {

    const [showLinkCopied,setShowLinkCopied] = useState(true)
    const [linkVisibility, setLinkVisibility] = useState("hidden");
    const linkOpacityTimer = useRef(null);
    const linkShowTimer = useRef(null);

    function copyPostLink(link) {
      navigator.clipboard.writeText(link);

      if (linkOpacityTimer.current) {
        clearTimeout(linkOpacityTimer.current);
      }
      if (linkShowTimer.current) {
        clearTimeout(linkShowTimer.current);
      }

      setShowLinkCopied(true);
      setLinkVisibility("");

      linkOpacityTimer.current = setTimeout(() => {
        setLinkVisibility("hidden");
      }, 3500);

      linkShowTimer.current = setTimeout(() => {
        setShowLinkCopied(false);
      }, 4500);

    }

    return (
      <>
        <div 
          key={post.id}
          // w-[calc((100%/4)-(((4-1)/4)*1.5rem))] // 
          className={`py-3.5 px-4 rounded-3xl w-[27.5rem] genre-bg-${post.genre_name.toLowerCase().replace(/ /g,'')} drop-shadow flex flex-col dropshadowbig`}
        >

          <div 
            className="py-3.5 px-5 rounded-2xl bg-neutral-800 bg-opacity-70 opacity-95 drop-shadow-lg flex flex-col justify-between min-h-40"
          >
            <div className="">
              <span
                className="float-right text-sm text-stone-300"
              >
                {timeAgo(new Date(post.created_at))}
              </span>
              <h3 className="font-bold text-2xl text-slate-50">
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

            </div>

            <iframe
              className="relative bottom-0 w-90%"
              width="100%" 
              height="20" 
              frameborder="no" 
              src={`https://w.soundcloud.com/player/?url=${post.link}&amp;color=ff0000&amp;inverse=true&amp;auto_play=false&amp;show_user=true" style="background:black;`}
            ></iframe>
            
          </div>

          <div className="post-icons w-full pt-3.5 px-4">
            <ul className="w-full flex flex-row justify-evenly items-center text-gray-800 text-3xl bg-cinereous-800 bg-opacity-70 rounded-2xl pt-2 pb-1 drop-shadow">

              {/* <li>
                <button><FaRegHeart/></button>
              </li> */}

              <li>
                <button>
                <Link href={`/posts/${post.genre_name}/${post.id}`}>
                  <FaComment />
                </Link>
                </button>
              </li>

              <li>
                <button onClick={copyPostLink}><FaShare/></button>
              </li>

              <li>
                <button>
                <Link href={`/posts/${post.genre_name}/${post.id}/edit`}>
                  <FaPenToSquare/>
                </Link>
                </button>
              </li>

              <li>
                <button onClick={()=>deletePost(post.id)}>
                  <FaTrashCan/>
                </button>
              </li>

            </ul>
          </div>
          { showLinkCopied && 
          <div className={`${linkVisibility} link-copied absolute bg-zinc-200 left-24 bottom-16 mb-1 z-50 bg-opacity-75 px-2.5 py-1 bold text-lg text-slate-900 rounded-lg opacity 0.8 dropshadowbig`}>
            <span>📋 link copied to clipboard!</span>
          </div>
        } 
        </div>


      </>
    )
  }