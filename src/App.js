import React from 'react'
import Blog from './components/Blog'
import ErrorNotification from './components/notification/error-notification'
import Notification from './components/notification/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

import {useState, useEffect} from 'react'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    likes: '',
  })
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
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
    console.log('logging in with', username, password)

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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({target}) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({target}) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const logOut = event => {
    event.preventDefault()
    setUser(null)
    setUsername('')
    setPassword('')
    window.localStorage.removeItem('loggedBlogUser')
    
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

  const handleLikesChange = event => {
    event.preventDefault()
    setNewBlog({...newBlog, likes: event.target.value})
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
    if(!newBlog.title || !newBlog.author){
      setErrorMessage('missing blog title or author')
      setTimeout(() => {
        setErrorMessage(null);
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
    }, 5000)})
    .catch(error => {
      setErrorMessage(error.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000)
    })
 
  }

  const blogForm = () => (
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

      <div>
        <label>
          Likes
          <input type="number" onChange={handleLikesChange} />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  )

  return (
    <div>
      <h1>Blogs</h1>
      <div className="pop-up">
        <Notification message={message} />
        <ErrorNotification errorMessage={errorMessage} />
      </div>
      <h2>Login</h2>

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} is logged in</p><button onClick={logOut}>
            log out
          </button>
          {blogForm()}

          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
