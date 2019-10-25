import React from 'react'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import  useStylesBlog  from './blog.style.js'




const Blog = ({ blog }) => (
    <div>
    <Paper className={useStylesBlog.root}>
        <Typography variant="h5" component="h3">
        <div>{blog.title} </div>
        </Typography>
        <Typography component="p">
        <div>{blog.author}</div>
        </Typography>
      </Paper>
      </div>)
  

export default Blog