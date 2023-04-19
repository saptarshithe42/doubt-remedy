import React from "react"

// styles 
import "./Dropdown.css"

function Dropdown(props) {

    const { name, itemList, setItem } = props;

    return (
        <div>
            <div className="dropdown">
                <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {name}
                </a>

                <ul className="dropdown-menu">
                    {itemList.map((item, index) => {

                        return (
                            <li key={index}>
                                <button className="dropdown-item" onClick={() => {setItem(item)}}>
                                    {item}
                                </button>
                            </li>
                        )

                    })}
                    {/* <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li> */}
                </ul>
            </div>
        </div>
    )
}

export default Dropdown