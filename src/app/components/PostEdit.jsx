"use client"

import { useState } from "react";

export default function PostEdit({post, editPost, genreOptions}) {

  const [selectedGenre, setSelectedGenre] = useState(1);

  const handleGenreSelect = (e) => {
    setSelectedGenre(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData);
    formData.id = post.id;
    editPost(formDataObj);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 items-center justify-center w-80 mx-auto my-0"
    >
      
      <input defaultValue={post.artist} type="text" name="artist" id="artist" placeholder="artist name..." className=""/>
      
      <input defaultValue={post.title} type="text" name="title" id="title" placeholder="track title..." className=""/>

      <input defaultValue={post.link} type="text" name="link" id="link"placeholder="soundcloud link..." className=""/>
      
      <span>
        <label htmlFor="genre" className="float-left p-1 pr-2">Genre: </label>
        <select
          defaultValue={post.genre}
          name="genre"
          id="genre"
          value={selectedGenre}
          onChange={handleGenreSelect}
          width="40"
        >
          {genreOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </span>
      
      <input defaultValue={post.content} type="text" name="content" id="content" placeholder="message... (optional)" className=""
      />

      <button type="submit" className="">
        Save
      </button>

    </form>
  )
}