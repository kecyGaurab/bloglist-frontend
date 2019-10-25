import React from 'react'
import Blog from './components/Blog'
import BlogForm from './components/form/blogform'
import LoginForm from './components/form/loginform'
import ErrorNotification from './components/notification/error-notification'
import Notification from './components/notification/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

import {useState, useEffect} from 'react'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    likes: '',
  })
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
        <LoginForm
          handleLogin={handleLogin}
          handlePassword={handlePassword}
          handleUsername={handleUsername}
          username={username}
          password={password}
        />
      ) : (
        <div>
          <p>{user.name} is logged in</p>
          <button onClick={logOut}>log out</button>
          <div>
            <BlogForm
              addBlog={addBlog}
              handleAuthorChange={handleAuthorChange}
              handleTitleChange={handleTitleChange}
              handleUrlChange={handleUrlChange}
            />
          </div>
          <div>
            {blogs.map(blog => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
