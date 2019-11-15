import React from 'react'
import Blog from './components/Blog/Blog'
import BlogForm from './components/form/blogform'
import LoginForm from './components/form/loginform'
import ErrorNotification from './components/notification/error-notification'
import Notification from './components/notification/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Button from '@material-ui/core/Button'
import AppStyle from './App.style'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import './App.css'

import {useState, useEffect} from 'react'
import ToggalableForm from './components/toggle/toggalableForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    likes: 0,
  })
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const [likeBlog, setLikeBlog] = useState({})

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    const hideWhenVisible = {display: loginVisible ? 'none' : ''}
    const showWhenVisible = {display: loginVisible ? '' : 'none'}

    return (
      <React.Fragment>
        <div style={hideWhenVisible}>
          <Button
            variant="contained"
            style={{width: '84px'}}
            color="primary"
            onClick={() => setLoginVisible(true)}
          >
            login
          </Button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
            handleUsername={handleUsername}
            handlePassword={handlePassword}
          />
          <Button
            style={{marginTop: '5px'}}
            variant="contained"
            onClick={() => setLoginVisible(false)}
          >
            cancel
          </Button>
        </div>
      </React.Fragment>
    )
  }

  const handleLike = event => {
    event.preventDefault()
    const idToUpdate = event.currentTarget.value

    const selectedBlog = blogs.find(n => idToUpdate === n.id)
    setLikeBlog(selectedBlog)
    const likeAddedBlog = {...selectedBlog, likes: selectedBlog.likes + 1}
    console.log('likeAddedBlog', likeAddedBlog)
    blogService
      .update(idToUpdate, likeAddedBlog)
      .then(returnedBlog => {
        setBlogs(
          blogs.map(blog => (blog.id !== idToUpdate ? blog : likeAddedBlog))
        )
      })
      .catch(error => {
        setErrorMessage(
          `Blog '${selectedBlog.title} doesn't exist on the server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setBlogs(blogs.filter(n => n.id !== idToUpdate))
      })
  }

  console.log(likeBlog)

  const logOut = event => {
    event.preventDefault()
    setUser(null)
    setUsername('')
    setPassword('')
    window.localStorage.removeItem('loggedBlogUser')
  }

  const handleUsername = event => {
    setUsername(event.target.value)
  }
  const handlePassword = event => {
    setPassword(event.target.value)
  }

  const handleTitleChange = event => {
    event.preventDefault()
    setNewBlog({...newBlog, title: event.target.value})
  }

  const handleAuthorChange = event => {
    event.preventDefault()
    setNewBlog({...newBlog, author: event.target.value})
  }

  const handleUrlChange = event => {
    event.preventDefault()
    setNewBlog({...newBlog, url: event.target.value})
  }

  const addBlog = event => {
    event.preventDefault()
    const blogObj = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: newBlog.likes,
      id: blogs.length + 1,
    }
    if (!newBlog.title || !newBlog.author) {
      setErrorMessage('missing blog title or author')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return
    }

    blogService
      .create(blogObj)
      .then(data => {
        setBlogs(blogs.concat(data))
        setNewBlog('')

        setMessage(`a new blog ${blogObj.title} by ${blogObj.author} added`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  return (
    <div>
      <div className="nav-bar">Blogs</div>
      <div className="pop-up">
        <Notification message={message} />
        <ErrorNotification errorMessage={errorMessage} />
      </div>

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <div>
            <Paper className={AppStyle.root}>
              <Typography variant="h5" component="h3">
                <p>{user.name} is logged in</p>
                <Button
                  style={{width: '104.03px'}}
                  variant="contained"
                  color="secondary"
                  className={AppStyle.button}
                  onClick={logOut}
                >
                  Logout
                </Button>
              </Typography>
            </Paper>
          </div>

          <ToggalableForm buttonLabel="New Blog">
            <div>
              <BlogForm
                addBlog={addBlog}
                handleAuthorChange={handleAuthorChange}
                handleTitleChange={handleTitleChange}
                handleUrlChange={handleUrlChange}
              />
            </div>
            <Button
              onClick={addBlog}
              variant="contained"
              color="primary"
              className={AppStyle.button}
            >
              Create
            </Button>
          </ToggalableForm>

          <h2>Blogs</h2>
          {blogs.map(blog => (
            <Blog
              handleLike={handleLike}
              className="blogs"
              key={blog.id}
              blog={blog}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
