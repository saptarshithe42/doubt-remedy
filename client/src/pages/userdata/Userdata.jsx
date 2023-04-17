import React from "react"
import { UserState } from "../../context/AuthContext"

function Userdata() {

    const {user} = UserState();


  return (
    <div>
        {!user && <h1>Hello User</h1>}
        {user && <h1>Hello {user.name}</h1>}

    </div>
  )
}

export default Userdata