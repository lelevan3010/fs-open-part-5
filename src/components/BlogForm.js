import React from 'react'

const BlogForm = ({addBlog, title, setTitle, author, setAuthor, url, setUrl, setBlogFormVis}) => {


    return (<form onSubmit={addBlog}>
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
        <button onClick={()=>setBlogFormVis(false)}>cancel</button>
      </form>)
}

export default BlogForm
