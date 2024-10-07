"use client"
import { useState } from "react";


export default function CreatePostForm({genreOptions, insertPost}) {

  const [selectedGenre, setSelectedGenre] = useState(1);

  const handleGenreSelect = (e) => {
    setSelectedGenre(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData);
    insertPost(formDataObj);
    e.target.reset();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 items-center justify-center w-80 mx-auto my-0"
    >
      
      <input type="text" name="artist" id="artist" placeholder="artist name..." className=""/>
      
      <input type="text" name="title" id="title" placeholder="track title..." className=""/>

      <input type="text" name="link" id="link"placeholder="soundcloud link..." className=""/>
      
      <span>
        <label htmlFor="genre" className="float-left p-1 pr-2">Genre: </label>
        <select
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
      
      <input type="text" name="content" id="content" placeholder="message... (optional)" className=""
      />

      <button type="submit" className="">
        Submit
      </button>

    </form>
  );
}