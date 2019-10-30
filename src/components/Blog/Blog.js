import React, {useState} from 'react'
import './blog.styles.css'

const Blog = ({blog}) => {
  const [visible, setvisible] = useState(false)

  const hideWhenVisible = {display: visible ? '' : 'none'}
  const toggleVisbility = () => {
    setvisible(!visible)
  }

  return (
    <div className="blogs">
       <div onClick={toggleVisbility} className="blog-name">
      <h3>{blog.title}</h3>
      <p>{blog.author}</p>
    </div>
      <div className="blogs" style={hideWhenVisible}>
        <p>{blog.url}</p>
        <p>likes:{blog.likes}  <button onClick={()=>console.log('click')}><i className="icon-like"></i></button></p>
        <p>added by {blog.user.username}</p>
        
      </div>
    
    </div>
   
  )
}

export default Blog
