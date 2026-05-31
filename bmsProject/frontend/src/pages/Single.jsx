import { Link, useParams, useNavigate} from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"

const Single = () => {
    const redirect = useNavigate()
    const {id} = useParams()
    const [blog, setBlog] = useState({})

    const fetchSingleBlog = async ()=>{
       const response = await axios.get(`http://localhost:3000/api/blogs/${id}`)
       setBlog(response.data.data)
    }
    
    useEffect(()=>{
        fetchSingleBlog()
    }, [])

    const handleDelete = async ()=>{
        await axios.delete(`http://localhost:3000/api/blogs/${id}`)
        // redirect to home page after deletion
        redirect("/")
    }
    
    return (
        <div className="container">
            <article className="single-blog">
                <p className="single-blog-tag">Featured Story</p>

                <h1>{blog.blogTitle}</h1>

                <h3>{blog.blogSubTitle}</h3>

                <div className="single-blog-content">
                {blog.blogDescription}
                </div>

                <div className="single-blog-actions">
                    <Link to="/" className="back-btn">
                        Back Home
                    </Link>
                    <Link to={`/update/${id}`} className="single-action-btn edit-btn">
                        Edit
                    </Link>
                    <button onClick={handleDelete} type="button" className="single-action-btn delete-btn">
                        Delete
                    </button>
                </div>
            </article>
        </div>
    )
}

export default Single