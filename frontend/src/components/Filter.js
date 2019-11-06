import React from "react"

const Filter = (props) => {
    return (
        <div>
            filter shown with
            <input 
                value={props.value} 
                onChange={props.handleFilterChange} />
        </div>
    )
}

export default Filter