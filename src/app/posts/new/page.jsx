"use client"

import { useState } from "react";


export default function PostNew() {

  const [selectedGenre, setSelectedGenre] = useState([]);

  const genreOptions = ['cloud', 'DnB', 'trap', 'house', 'phonk', 'vaporwave', 'future funk', 'synthwave', 'lofi'];

  const handleGenreSelect = (e) => {
    setSelectedGenre(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // add submit
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 items-center w-80 mx-auto my-0"
    >
      
      <input 
        type="text" 
        name="artist" 
        placeholder="artist name..."
        className="p-1.5 rounded-lg"
      />
      
      <input 
        type="text" 
        name="title" 
        placeholder="track title..."
        className="p-1.5 rounded-lg"
      />
      
      <input 
        type="text" 
        name="link" 
        placeholder="soundcloud link..."
        className="p-1.5 rounded-lg"
      />
      
      <select
        name="genre"
        value={selectedGenre}
        onChange={handleGenreSelect}
        width="40"
      >
        {genreOptions.map((option) => {
          <option key={option.index} value={option}>
            {option}
          </option>
        })}
      </select>
      
      <input 
        type="text" 
        name="content" 
        placeholder="message... (optional)" 
        className="p-1.5 rounded-lg"
      />

      <button type="submit">Submit</button>

    </form>
  );
}