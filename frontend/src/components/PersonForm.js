import React from "react"

const PersonForm = (props) => {
    return (
        <form onSubmit={props.submit}>
            <div>
                name: 
                <input 
                    value ={props.nameValue} 
                    onChange={props.handleNameChange} />
            </div>
            <div>
                number: 
                <input 
                    value={props.phoneNumberValue} 
                    onChange={props.handlePhoneNumberChange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm