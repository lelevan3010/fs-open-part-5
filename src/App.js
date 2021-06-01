import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogFormVis, setBlogFormVis] = useState(false) 
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
        const sortBlogs = initBlogs.sort((b1,b2) => b1.likes - b2.likes)
        setBlogs(sortBlogs)
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

  const addBlog = (e) => {
    e.preventDefault()
    const newBlog = {
      title,
      author,
      url,
      likes: 0
    }
    blogService.create(newBlog).then(
      
      newBlog => {
        console.log(newBlog)
        setBlogs([...blogs, newBlog])
        setTitle("")
        setAuthor("")
        setUrl("")
        setErrorMessage("New blog added")
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    )
  }

  const updateLike = (id, blogObject) => {
    blogService
      .update(id, blogObject)
      .then(returnedBlog => {
        const updateBlogs = blogs.map(blog => blog.id !== id ? blog : returnedBlog)
        const sortBlogs = updateBlogs.sort((b1,b2) => b1.likes - b2.likes)
        console.log(sortBlogs)
        setBlogs( sortBlogs )
      })
  }

  const deleteBlog = (id) => {
    blogService
      .remove(id)
      .then(() => {
        const filterBlogs = blogs.filter(blog => blog.id !== id)
        const sortBlogs = filterBlogs.sort( (b1,b2) => b1.likes - b2.likes)
        setBlogs(sortBlogs)
      })
      .catch(error => {
        console.log(error)
      })
  }
  
  return (
    <div>
      <h1>Blogs</h1>

      <Notification message={errorMessage} />

      {user === null 
        ? <LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} setPassword={setPassword} password={password}/>
        : 
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={() =>{
            window.localStorage.removeItem("user")
            setUser(null)}
          }>Log out</button>
        </div>
      }
      <button onClick={() => {setBlogFormVis(true)}}>create new blog</button>
      {user !== null && 
      <Togglable isShown={blogFormVis}>
        <BlogForm 
          addBlog={addBlog}
          title={title}
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          url={url}
          setUrl={setUrl}
          setBlogFormVis={setBlogFormVis}
        />
      </Togglable>
      }
      {user !== null && (
        <div>
          <h2>blogs</h2>
          {blogs.map(blog =>
          {
            return <Blog 
              key         = {blog.id} 
              blog        = {blog}
              updateLike  = {updateLike}
              deleteBlog  = {deleteBlog}
            />
          }
          )}
        </div>
      )}
      
    </div>
  )
}

export default App
