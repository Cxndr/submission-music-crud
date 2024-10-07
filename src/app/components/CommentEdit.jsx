"use client"

export default function EditComment({comment, editComment}) {

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData);
    formDataObj.id = comment.id;
    editComment(formDataObj);
  }

  return (
    <form onSubmit={handleSubmit}
      className="w-auto flex justify-center items-center gap-4 bg-zinc-900 bg-opacity-70 py-6 rounded-3xl"
    >

      <label htmlFor="user_name">Name: </label>
      <input defaultValue={comment.user_name} type="text" id="user_name" name="user_name" placeholder="leave blank for Anon"
        className="w-1/5 mr-7"
      />

      <label htmlFor="comment">Comment: </label>
      <input defaultValue={comment.content} type="text" id="content" name="content" placeholder="type a comment..."
        className="w-2/5 mr-7"
      />

      <button type="submit">Save</button>

    </form>
  )
}