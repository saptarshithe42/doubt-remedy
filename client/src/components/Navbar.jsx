import { Link, useNavigate } from 'react-router-dom'
// import { useLogout } from '../hooks/useLogout'
// import { useAuthContext } from '../hooks/useAuthContext'

// styles & images
import './Navbar.css'

// icons
import { FaUserCircle } from "react-icons/fa"
import { useContext } from 'react'
import { UserContext } from '../App'
import { UserState } from '../context/AuthContext'


// components
// import OffCanvas from './OffCanvas'


function Navbar() {
	// const { state, dispatch } = useContext(UserContext);
	const { user } = UserState();

	const RenderMenu = () => {
		// if user is logged in
		if (user) {
			return (
				<>
					<li ><Link to="/about" className="nav-item btn btn-outline-primary">About</Link></li>
					<li className="nav-item btn btn-light" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
						Profile <FaUserCircle style={userIcon} />
						{/* <OffCanvas /> */}
					</li>
					<li ><Link to="/logout" className="nav-item btn btn-outline-primary">Logout</Link></li>
				</>
			)
		} else {
			return (
				<>
					{/* <li ><Link to="/about" className="nav-item btn btn-outline-primary">About</Link></li> */}
					<li ><Link to="/login" className="nav-item btn btn-outline-primary">Login</Link></li>
					<li ><Link to="/signup" className="nav-item btn btn-outline-primary">Signup</Link></li>
				</>
			)
		}
	}

	// const { logout, isPending } = useLogout()
	// const { user } = useAuthContext()
	// const navigate = useNavigate()

	const userIcon = {
		fontSize: "1.5rem",
		// color : "white"
	}

	const handleLogout = async () => {

		// await logout()

		// navigate("/")
	}

	return (

		<nav className="navbar navbar-expand-md bg-dark">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">Doubt Remedy</Link>
				{/* <a className="navbar-brand" href="/">Doubt Remedy</a> */}
				<button className="navbar-toggler" style={{ backgroundColor: "white" }} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon" ></span>
				</button>
				<div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
					{/* {!user && */}
					<ul className="nav">
						<RenderMenu />
					</ul>
					{/* } */}

					{/* {user && */}
					{/* <ul className="nav"> */}
					{/* <li className="nav-item btn btn-light" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
								Profile <FaUserCircle style={userIcon} />
								<OffCanvas />
							</li> */}
					{/* <li className="nav-item">
								{!isPending && <button className="btn btn-outline-success" onClick={handleLogout} style={{ color: "white" }}>Logout</button>}
								{isPending && <button className="btn btn-outline-success" disabled>Logging out...</button>}
							</li> */}
					{/* </ul> */}
					{/* } */}
				</div>
			</div>
		</nav>
	)
}

export default Navbar