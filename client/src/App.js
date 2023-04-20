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
import AskQuestion from "./pages/ask_question/AskQuestion";
import AnswerQuestion from "./pages/answer_question/AnswerQuestion";
import AskedQuestions from "./pages/asked_questions/AskedQuestions";
import AnsweredQuestions from "./pages/answered_questions/AnsweredQuestions";

function PrivateRoute({ path, ...props }) {
  const { user } = UserState();

  if (user) {
    // Render the route component if the user is authenticated
    return <Route path={path} {...props} />;
  } else {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/login" replace />;
  }
}

  



const Routing = () => {

	const { user } = UserState();

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/search/:query" element={<SearchResults />} />
			<Route path="/question/:id" element={<AnswerQuestion />} />
			{user && <Route path="/my_questions" element={<AskedQuestions />} />}
			{user && <Route path="/my_answered_questions" element={<AnsweredQuestions />} />}
			{/* <Route path="/question/:id" element={<PrivateRoute element={<AnswerQuestion />} />} /> */}

			{/* <Route path="/about" element={<About />} /> */}
			{/* {user && <Route path="/about" element={<About />} />} */}
			{/* <PrivateRoute path="/about" element={<About />} /> */}
			{/* <Route path="/about" element={!user ? <Navigate to="/login" /> : <About />} /> */}
			<Route path="/ask" element={<AskQuestion />} />
			{/* <Route path="/ask" element={!user ? <Navigate to="/login" /> : <AskQuestion />} /> */}
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
