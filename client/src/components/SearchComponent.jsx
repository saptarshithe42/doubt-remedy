import React from "react"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// styles
import "./SearchComponent.css"

// icons
import { BsSearch } from "react-icons/bs"


function SearchComponent() {

    const [searchWord, setSearchWord] = useState("")

    const navigate = useNavigate()

    let queryString = searchWord.trim()

    const searchRequest = () => {

        navigate(`/search/${queryString}`)

    }


    return (
        <div className="search-component">
            <form className="search-form w-75">
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control searchbar"
                        id="searchbar"
                        aria-describedby="searchbar"
                        onChange={(e) => { setSearchWord((e.target.value)) }}
                        value={searchWord}
                        autoComplete="off"
                        placeholder="Search for any question"
                        required
                    />

                </div>
                {searchWord &&
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={searchRequest}
                        style={{fontSize : "1.3rem"}}
                    >
                    <BsSearch size="1.5rem" /> &nbsp;
                        Search
                    </button>
                }
            </form>

        </div>
    )
}

export default SearchComponent