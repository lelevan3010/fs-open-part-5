import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([]) 
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 

  useEffect(() => {
    blogService
      .getAll().then(initBlogs => {
        setBlogs(initBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('user')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(username, password)
      
      window.localStorage.setItem("user", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    // console.log('logging in with', username, password)
  }

  const loginForm = () => {
    return (
      <div>
        <h1>login to application</h1>
  
        {/* <Notification message={errorMessage} /> */}
  
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  const addBlog = (e) => {
    e.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }
    blogService.create(newBlog)
    setBlogs([...blogs, newBlog])
    setTitle("")
    setAuthor("")
    setUrl("")
    setErrorMessage("New blog added")
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  
  const blogForm = () => {
    return <form onSubmit={addBlog}>
      <div>
        <label>title</label>
        <input
          value={title}
          onChange={({target}) => setTitle(target.value)}
        />
      </div>
      <div>
        <label>author</label>
        <input
          value={author}
          onChange={({target}) => setAuthor(target.value)}
        />
      </div>
      <div>
        <label>url</label>
        <input
          value={url}
          onChange={({target}) => setUrl(target.value)}
        />
      </div>
      <button type="submit">save</button>
    </form>  
  }
  
  return (
    <div>
      <h1>Blogs</h1>

      <Notification message={errorMessage} />

      {user === null 
        ? loginForm()
        : 
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={() =>{
            window.localStorage.removeItem("user")
            setUser(null)}
          }>Log out</button>
        </div>
      }
      {user !== null && blogForm()}
      {user !== null && (
        <div>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      )}
      
    </div>
  )
}

export default App
