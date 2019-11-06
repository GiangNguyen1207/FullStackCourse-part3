import React from "react"
import "./style.css"

const Success = (props) => {
    if (props.message === null) return null
    else
    return (
        <div className="success">
            {props.message}
        </div>
    )
}

export default Success