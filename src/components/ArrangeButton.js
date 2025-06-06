import { useState } from 'react';
import './ArrangeButton.css';
import SortIcon from './svgs/component/SortIcon.js';
import FilterIcon from './svgs/component/FilterIcon.js';

function ArrangeButton({ sort, sorting, filter }) {
    const [buttonChecked, setButtonChecked] = useState(false);
    const [dueDateChecked, setDueDateChecked] = useState(false);
    const [importanceChecked, setImportanceChecked] = useState(false);

    // Choose the header corresponding to the arrange button type
    let headerText = "";
    if (sort) {
        headerText = "Sort by";
    } else if (filter) {
        headerText = "Filter by"
    }

    // The 'sort' system must have just 1 option selected
    // The function checks what type of arrange button it's working with
    // before applying the 'single-option' behaviour
    const handleChange = (event) => {
        const { name, checked } = event.target;

        if (name === "button") {
            setButtonChecked(checked);
        } else if (name === "dueDate") {
            setDueDateChecked(checked);
            if (sort) {
                setImportanceChecked(false)
                // Reset the 'sorting order' if the checkbox has been unchecked
                if (checked) {
                    sorting.sortTasksByDueDate();
                }
                else {
                    sorting.sortReset();
                }
            }
        } else if (name === "importance") {
            setImportanceChecked(checked);
            if (sort) {
                setDueDateChecked(false)
            }
        }
    }

    // Close the button's 'options' tab when not 'focused' by the user
    function handleBlur() {
        setButtonChecked(false);
    }

    return (
        <div className='ArrangeButton icon-wrapper'>
            <input name="button" type='checkbox' checked={buttonChecked} onChange={handleChange} onBlur={handleBlur}></input>
            {sort ? <SortIcon /> : ""}
            {filter ? <FilterIcon /> : ""}
            <div className='options' onMouseDown={(e) => e.preventDefault()}>
                <div><b>{headerText}</b></div>
                <div className='option'>
                    <span>Due date</span>
                    <input name='dueDate' type='checkbox' checked={dueDateChecked} onChange={handleChange}></input>
                </div>
                <div className='option'>
                    <span>Importance</span>
                    <input name='importance' type='checkbox' checked={importanceChecked} onChange={handleChange}></input>
                </div>
            </div>
        </div>
    )
}

export default ArrangeButton;