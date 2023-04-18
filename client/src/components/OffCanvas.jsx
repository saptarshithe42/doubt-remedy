import React from "react"
import ProfilePicture from "./ProfilePicture"

// styles
import "./OffCanvas.css"
import { NavLink } from "react-router-dom"

// icons
import { AiOutlineStar } from "react-icons/ai"
import { AiOutlineUpload } from "react-icons/ai"
import { AiOutlineDownload } from "react-icons/ai"
import { AiOutlineHome } from "react-icons/ai"
import {MdVideoLibrary} from "react-icons/md"
import {RiVideoAddLine} from "react-icons/ri"
import {AiOutlineShoppingCart} from "react-icons/ai"
import {AiFillHeart} from "react-icons/ai"
import {RiHistoryFill} from "react-icons/ri"
import {RiDraftLine} from "react-icons/ri"
import {GiMoneyStack} from "react-icons/gi"
import { UserState } from "../context/AuthContext"

function OffCanvas() {

    const { user } = UserState()

    const closeBtnStyle = {
        marginLeft: "auto",
        marginTop: "1rem",
        marginRight: "1rem",
        backgroundColor: "white"
    }

    return (
        <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
            <button type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                style={closeBtnStyle}
            ></button>
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
                    {/* <ProfilePicture
                        src={user.photoURL}
                        displayName={user.displayName}
                    /> */}
                    <ProfilePicture
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS9-73UZFtwlGMya7r7RPUm8N4na0r_TFLj0JUoh8j9W-2OYo&s"
                        username={user.username}
                    />
                    {/* <p>{user.displayName}</p> */}
                </h5>
            </div>

            <div className="offcanvas-body" id="sidebar">
            
                        <NavLink to="/" className="nav-link-item">
                            <AiOutlineHome className="offcanvas-icons" />  Home
                        </NavLink>
                 
                        <NavLink to="/wishlist" className="nav-link-item">
                            <AiFillHeart className="offcanvas-icons" />   Wishlist
                        </NavLink>
                 
                        <NavLink to="/cart" className="nav-link-item">
                            <AiOutlineShoppingCart className="offcanvas-icons" />   Cart
                        </NavLink>
                    
                        <NavLink to="/purchased_courses" className="nav-link-item">
                            <MdVideoLibrary className="offcanvas-icons" />  Purchased Courses
                        </NavLink>

                        <NavLink to="/purchase_history" className="nav-link-item">
                            <RiHistoryFill className="offcanvas-icons" />  Purchase History
                        </NavLink>
                  
                        <NavLink to="/create" className="nav-link-item">
                            <RiVideoAddLine className="offcanvas-icons" />  Create Course
                        </NavLink>
                  
                        <NavLink to="/drafts" className="nav-link-item">
                            <RiDraftLine className="offcanvas-icons" />  Drafts
                        </NavLink>
                   
                        <NavLink to="/published_courses" className="nav-link-item">
                            <AiOutlineUpload className="offcanvas-icons" />  Published Courses
                        </NavLink>

                        <NavLink to="/earnings" className="nav-link-item">
                            <GiMoneyStack className="offcanvas-icons" />  Earnings
                        </NavLink>
             
            </div>
        </div>
    )
}

export default OffCanvas