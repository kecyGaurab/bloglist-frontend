import React from 'react'
import useStyles from './form.styles'
import TextField from '@material-ui/core/TextField'

const BlogForm = ({
  addBlog,
  handleAuthorChange,
  handleTitleChange,
  handleUrlChange,
}) => (
  <form onSubmit={addBlog}>
    <div>
      <TextField
        id="outlined-name"
        label="Title"
        className={useStyles.textField}
        onChange={handleTitleChange}
        margin="normal"
        variant="outlined"
      />
    </div>

    <div>
      <TextField
        id="outlined"
        label="Author"
        onChange={handleAuthorChange}
        className={useStyles.textField}
        margin="normal"
        variant="outlined"
      />
    </div>
    <div>
      <TextField
        id="outlined"
        label="Url"
        onChange={handleUrlChange}
        className={useStyles.textField}
        margin="normal"
        variant="outlined"
      />
    </div>

  </form>
)

export default BlogForm
