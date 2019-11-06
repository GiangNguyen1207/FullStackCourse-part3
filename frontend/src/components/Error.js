import React from "react"
import "./style.css"

const Error = (props) => {
    if (props.message === null) return null
    return (
        <div className="error">
            {props.message}
        </div>
    )
}

export default Error