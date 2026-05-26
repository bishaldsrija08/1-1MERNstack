import { Link } from "react-router-dom"

const Home = () => {
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
                        <button className="read-btn">
                            Read More
                        </button>
                    </div>
                </div>

                <div className="blog-grid">
                    <div className="blog-card">
                        <h2>Blog Title</h2>
                        <h4>Blog Subtitle</h4>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Quisquam, voluptate.
                        </p>
                        <button className="read-btn">
                            Read More
                        </button>
                    </div>
                </div>

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


                <div className="blog-grid">
                    <div className="blog-card">
                        <h2>Blog Title</h2>
                        <h4>Blog Subtitle</h4>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Quisquam, voluptate.
                        </p>
                        <button className="read-btn">
                            Read More
                        </button>
                    </div>
                </div>


                <div className="blog-grid">
                    <div className="blog-card">
                        <h2>Blog Title</h2>
                        <h4>Blog Subtitle</h4>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Quisquam, voluptate.
                        </p>
                        <button className="read-btn">
                            Read More
                        </button>
                    </div>
                </div>

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
