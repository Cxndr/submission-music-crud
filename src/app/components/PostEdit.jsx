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
      className="flex flex-col gap-3 items-center justify-center w-80 mx-auto my-0"
    >

      <label htmlFor="artist" className="relative top-2">artist</label>
      <input defaultValue={post.artist} type="text" name="artist" id="artist" placeholder="artist name..." className=""/>

      <label htmlFor="title" className="relative top-2">title</label>
      <input defaultValue={post.title} type="text" name="title" id="title" placeholder="track title..." className=""/>

      <label htmlFor="link" className="relative top-2">soundcloud link</label>
      <input defaultValue={post.link} type="text" name="link" id="link"placeholder="soundcloud link..." className=""/>
      
        <label htmlFor="genre" className="relative top-2">genre: </label>
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
      
      <label htmlFor="message" className="relative top-3">message</label>
      <input defaultValue={post.content} type="text" name="content" id="content" placeholder="message... (optional)" className=""
      />

      <button type="submit" className="mt-4">
        Save
      </button>

    </form>
  )
}