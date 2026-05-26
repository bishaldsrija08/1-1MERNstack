import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <>
            <nav className="navbar">
                <div className="logo">
                    <Link to="/"><h2>BMS</h2></Link>
                </div>
                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/create">
                        Create Blog
                    </Link>
                    <Link to="/single">
                        Single Blog
                    </Link>
                </div>
            </nav>

        </>
    )
}

export default Navbar
