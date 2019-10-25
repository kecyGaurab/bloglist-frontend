import React from 'react'

const BlogForm = ({addBlog,handleAuthorChange,handleTitleChange,handleUrlChange}) => (
    <form onSubmit={addBlog}>
      <div>
        <label>
          Title:
          <input type="text" onChange={handleTitleChange} />
        </label>
      </div>

      <div>
        <label>
          Author:
          <input type="text" onChange={handleAuthorChange} />
        </label>
      </div>

      <div>
        <label>
          Url:
          <input type="url" onChange={handleUrlChange} />
        </label>
      </div>

      {/* <div>
        <label>
          Likes
          <input type="number" onChange={handleLikesChange} />
        </label>
      </div>
      <button type="submit">Submit</button> */}
    </form>
  )

export default BlogForm
