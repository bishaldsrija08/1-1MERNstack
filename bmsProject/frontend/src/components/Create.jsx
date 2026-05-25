const Create = () => {
    return (
        <>
            <div className="container">

                <div className="form-container">
                    <h1>Create Blog</h1>

                    <form>

                        <input
                            type="text"
                            placeholder="Enter blog title"
                        />

                        <input
                            type="text"
                            placeholder="Enter blog subtitle"
                        />

                        <textarea
                            rows="6"
                            placeholder="Enter blog description"
                        ></textarea>

                        <button className="submit-btn">
                            Publish Blog
                        </button>

                    </form>
                </div>
            </div>
        </>
    )
}

export default Create