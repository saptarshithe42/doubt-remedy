import React from "react";
import ProfilePicture from "./ProfilePicture";

// styles
import "./OffCanvas.css";
import { NavLink } from "react-router-dom";

// icons
import { FaQuestionCircle } from "react-icons/fa";
import { BiMessageAltCheck } from "react-icons/bi";
import { AiOutlineUpload } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { GiBrain } from "react-icons/gi";
import { RiVideoAddLine } from "react-icons/ri";
import { AiFillHeart } from "react-icons/ai";
import { RiHistoryFill } from "react-icons/ri";
import { RiDraftLine } from "react-icons/ri";
import { GiMoneyStack } from "react-icons/gi";
import { UserState } from "../context/AuthContext";

function OffCanvas() {
    const { auth } = UserState();

    const closeBtnStyle = {
        marginLeft: "auto",
        marginTop: "1rem",
        marginRight: "1rem",
        backgroundColor: "white",
    };

    return (
        <div
            className="offcanvas offcanvas-start"
            data-bs-scroll="true"
            tabIndex="-1"
            id="offcanvasWithBothOptions"
            aria-labelledby="offcanvasWithBothOptionsLabel"
        >
            <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                style={closeBtnStyle}
            ></button>
            <div className="offcanvas-header">
                <h5
                    className="offcanvas-title"
                    id="offcanvasWithBothOptionsLabel"
                >
                    {/* <ProfilePicture
                        src={user.photoURL}
                        displayName={user.displayName}
                    /> */}
                    <ProfilePicture
                        // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS9-73UZFtwlGMya7r7RPUm8N4na0r_TFLj0JUoh8j9W-2OYo&s"
                        src={auth?.user?.imgUrl}
                        username={auth?.user?.username}
                    />
                    {/* <p>{user.displayName}</p> */}
                </h5>
            </div>

            <div className="offcanvas-body" id="sidebar">
                <NavLink to="/" className="nav-link-item">
                    <AiOutlineHome className="offcanvas-icons" /> Home
                </NavLink>

                <NavLink to="/ask" className="nav-link-item">
                    <GiBrain className="offcanvas-icons" /> Ask a Question
                </NavLink>

                <NavLink to="/my_questions" className="nav-link-item">
                    <FaQuestionCircle className="offcanvas-icons" /> My
                    Questions
                </NavLink>

                <NavLink to="/my_answered_questions" className="nav-link-item">
                    <BiMessageAltCheck className="offcanvas-icons" /> Answered
                    Questions
                </NavLink>
            </div>
        </div>
    );
}

export default OffCanvas;
