import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Logout from "./components/Logout";
import Userdata from "./pages/userdata/Userdata";
import OffCanvas from "./components/OffCanvas";
import { UserState } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import SearchResults from "./pages/search/SearchResults";



const Routing = () => {

	const { user } = UserState();

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/search/:query" element={<SearchResults />} />
			{/* <Route path="/about" element={<About />} /> */}
			{user && <Route path="/about" element={<About />} />}
			{/* <Route path="/about" element={!user ? <Navigate to="/login" /> : <About />} /> */}
			{/* <Route path="/login" element={<Login />} /> */}
			<Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
			<Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/logout" element={<Logout />} />
			<Route path="/userdata" element={<Userdata />} />
		</Routes>
	)
}


function App() {

	const { user } = UserState();

	return (
		<div className="App">
			<Navbar />
			{user && <OffCanvas />}
			<Routing />
		</div>
	);
}

export default App;
