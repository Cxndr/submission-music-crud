"use client"

export default function CommentForm({insertComment}) {

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData);
    insertComment(formDataObj);
    e.target.reset();
  }


  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center gap-4 bg-zinc-900 bg-opacity-70 py-6 rounded-3xl"
    >

      <label htmlFor="user_name">Name: </label>
      <input type="text" id="user_name" name="user_name" placeholder="anonymous"
        className="text-xl rounded-xl w-1/6 mr-6"
      />

      <label htmlFor="comment">Comment: </label>
      <input type="text" id="content" name="content" placeholder="type a comment..."
        className="text-xl rounded-xl w-2/6 mr-6"
      />

      <button 
        type="submit"
        className="text-xl rounded-xl"
      >
        Submit
      </button>

    </form>
  )
}