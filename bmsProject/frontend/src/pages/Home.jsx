import { Link } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"

const Home = () => {
    const [blogs, setBlogs] = useState([]) // State to hold the list of blogs

    // Function to fetch blogs from the backend
    const fetchBlogs = async () => {
        const response = await axios.get("https://one-1mernstack.onrender.com/api/blogs")
        setBlogs(response.data.data)
    }

    // Fetch blogs when the component mounts
    useEffect(() => {
        fetchBlogs()
    }, []) // Empty dependency array to run only once on mount

    return (
        <>
            <div className="card-container">
                {blogs.map((blog, index) => {
                    return(
                    <div className="blog-grid" key={index}>
                        <div className="blog-card">
                            <h2>{blog.blogTitle}</h2>
                            <h4>{blog.blogSubTitle}</h4>
                            <p>
                                {blog.blogDescription}
                            </p>
                            <Link to={`/single/${blog._id}`} className="read-btn">
                                Read More
                            </Link>
                        </div>
                    </div>
                    )
                })}
            </div>

        </>
    )
}

export default Home
