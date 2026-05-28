import { Link } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"

const Home = () => {
    const [blogs, setBlogs]= useState([]) // State to hold the list of blogs

    // Function to fetch blogs from the backend
    const fetchBlogs = async ()=>{
        const response = await axios.get("http://localhost:3000/api/blogs")
        console.log(response.data)
    }

    // Fetch blogs when the component mounts
    useEffect(()=>{
        fetchBlogs()
    }, []) // Empty dependency array to run only once on mount

    return (
        <>
            <div className="card-container">
                <div className="blog-grid">
                    <div className="blog-card">
                        <h2>Blog Title</h2>
                        <h4>Blog Subtitle</h4>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Quisquam, voluptate.
                        </p>
                        <Link to="/single" className="read-btn">
                            Read More
                        </Link>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home
