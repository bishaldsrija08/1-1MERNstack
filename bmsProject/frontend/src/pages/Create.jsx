import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Create = () => {
    const navigate = useNavigate()
    const [blog, setBlog] = useState({
        blogTitle: "",
        blogSubTitle: "",
        blogDescription: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setBlog({
            ...blog, // spread operator to copy the existing state
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault() // prevent the default form submission behavior

        const response = await axios.post("https://one-1mernstack.onrender.com/api/blogs", blog)

        if (response.status === 200) {
            alert("Blog created successfully")
            navigate("/") // navigate to the home page after successful blog creation
        } else {
            alert("Failed to create blog")
        }
    }

    return (
        <>
            <div className="container">

                <div className="form-container">
                    <h1>Create Blog</h1>

                    <form>

                        <input
                            type="text"
                            placeholder="Enter blog title"
                            name="blogTitle"
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            placeholder="Enter blog subtitle"
                            name="blogSubTitle"
                            onChange={handleChange}
                        />

                        <textarea
                            rows="6"
                            placeholder="Enter blog description"
                            name="blogDescription"
                            onChange={handleChange}
                        ></textarea>

                        <input
                            type="submit"
                            value="Publish Blog"
                            className="submit-btn"
                            onClick={handleSubmit}
                        />

                    </form>
                </div>
            </div>
        </>
    )
}

export default Create