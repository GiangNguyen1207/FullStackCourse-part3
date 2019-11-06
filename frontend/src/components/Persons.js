import React from "react"
import Contact from "./Contact"

const Persons = (props) => {
    return (
        <ul>
            {props.persons.map(contact=>
                <Contact 
                    key={contact.id}
                    name={contact.name}
                    phoneNumber= {contact.number}
                    deletePerson={()=>props.deletePerson(contact.id, contact.name)}
                />
        )}
        </ul>
    )
}

export default Persons