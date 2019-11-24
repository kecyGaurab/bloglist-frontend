import React, {useState} from 'react'
// import Button from '@material-ui/core/Button'

import './blog.styles.css'

const Blog = ({blog, handleLike}) => {
  const [visible, setvisible] = useState(false)

  const hideWhenVisible = {display: visible ? '' : 'none', marginLeft: '10px'}
  const toggleVisbility = () => {
    setvisible(!visible)
  }

  return (
    <div>
      <div
        onClick={toggleVisbility}
        className="blog-name"
        style={{marginLeft: '10px'}}
      >
        <h3>{blog.title}</h3>
        <p>{blog.author}</p>
      </div>
      <div className="blogs" style={hideWhenVisible}>
        <p>{blog.url}</p>
        <p>
          likes:{blog.likes}{' '}
          <button value={blog.id} onClick={handleLike}>
            <i className="icon-like"></i>
          </button>
        </p>
        <p>added by {blog.user.username}</p>
        {/* {blog.user.username ? (
          <Button
            variant="contained"
            size="small"
            color="secondary"
            value={blog.id}
            onClick={removeBlog}>
            remove
          </Button>
        ) : null} */}
      </div>
    </div>
  )
}

export default Blog
