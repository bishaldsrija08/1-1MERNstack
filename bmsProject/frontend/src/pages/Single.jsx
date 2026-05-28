import { Link } from "react-router-dom"
import Test2 from "./Test2"

const Single = () => {
    return (
        <div className="container">
            <article className="single-blog">
                <p className="single-blog-tag">Featured Story</p>

                <h1>Blog Title</h1>

                <h3>Blog Subtitle</h3>

                <div className="single-blog-content">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptates, corporis. Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Asperiores, quos.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
                        distinctio ea officia deserunt cupiditate suscipit, omnis
                        mollitia veritatis doloremque reprehenderit.
                    </p>
                </div>

                <div className="single-blog-actions">
                    <Link to="/" className="back-btn">
                        Back Home
                    </Link>
                    <Link to="/create" className="single-action-btn edit-btn">
                        Edit
                    </Link>
                    <button type="button" className="single-action-btn delete-btn">
                        Delete
                    </button>
                </div>
            </article>
            <Test2 title="Single Blog"/>
        </div>
    )
}

export default Single