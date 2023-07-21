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
    const { auth } = UserState();

    if (auth?.user) {
        // Render the route component if the user is authenticated
        return <Route path={path} {...props} />;
    } else {
        // Redirect to the login page if the user is not authenticated
        return <Navigate to="/login" replace />;
    }
}

const Routing = () => {
    const { auth } = UserState();

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:query" element={<SearchResults />} />
            <Route path="/question/:id" element={<AnswerQuestion />} />
            {/* {auth?.user && (
                <Route path="/my_questions" element={<AskedQuestions />} />
            )} */}

            <Route
                path="/my_questions"
                element={
                    !auth?.user ? <Navigate to="/login" /> : <AskedQuestions />
                }
            />

            {auth?.user && (
                <Route
                    path="/my_answered_questions"
                    element={<AnsweredQuestions />}
                />
            )}
            <Route
                path="/ask"
                element={!auth?.user ? <Login /> : <AskQuestion />}
            />
            {/* <Route path="/ask" element={!user ? <Navigate to="/login" /> : <AskQuestion />} /> */}
            <Route
                path="/login"
                element={!auth?.user ? <Login /> : <Navigate to="/" />}
            />
            <Route
                path="/signup"
                element={!auth?.user ? <Signup /> : <Navigate to="/" />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/userdata" element={<Userdata />} />
        </Routes>
    );
};

function App() {
    const { auth } = UserState();

    return (
        <div className="App">
            <Navbar />
            {auth?.user && <OffCanvas />}
            <Routing />
        </div>
    );
}

export default App;
