import React from 'react'
import classes from './Select.module.css'

const Select = props => {

    const htmlFor = `${props.label}-${Math.random()}`
    const options = props.options.map((option,index) =>  {
        return (
            <option value={option.value} key={option.value+index} >
                {option.text}
            </option>
        )
    });


    return (
        <div className={classes.Select}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <select name={props.label} id={htmlFor} onChange={props.onChange}>
                {options}
            </select>

        </div>
    )
}

export default Select