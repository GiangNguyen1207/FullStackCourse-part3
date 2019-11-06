import React from "react"

const Contact = (props) => {
    return (
        <div>
            <li>
                {props.name} {props.phoneNumber} 
                <button onClick={props.deletePerson}>delete</button>
            </li>
        </div>
    
    )
}

export default Contact;