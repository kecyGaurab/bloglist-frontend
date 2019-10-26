import React from 'react'
import './blog.styles.css'

const Blog = ({blog}) => (
  <div className='blogs'>
    <h3>{blog.title}</h3>
    <p>{blog.author}</p>
  </div>
)

export default Blog
