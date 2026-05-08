import { useState, useEffect } from 'react';
import { capitalizeWords, separateWords } from '../utils.js';
import './ArrangeButton.css';
import SortIcon from './svgs/component/SortIcon.js';
import FilterIcon from './svgs/component/FilterIcon.js';

function ArrangeButton({ sortState, sorting, filterState, filterTasks, filter }) {
    const [buttonChecked, setButtonChecked] = useState(false);
    const [dueDateChecked, setDueDateChecked] = useState(false);
    const [importanceChecked, setImportanceChecked] = useState(false);
    const [filterOptions, setFilterOptions] = useState({});

    // Choose the header corresponding to the arrange button type
    let headerText = "";
    if (sortState) {
        headerText = "Sort by";
    } else if (filterState) {
        headerText = "Filter by"
    }

    // The 'sort' system must have just 1 option selected
    // The function checks what type of arrange button it's working with
    // before applying the 'single-option' behaviour
    const handleChange = (event) => {
        const { name, checked } = event.target;

        if (name === "button") {
            setButtonChecked(checked);
        } else {
            if (sortState) {
                if (name === "dueDate") {
                    setDueDateChecked(checked);
                    setImportanceChecked(false)

                    // Reset the 'sorting order' if the checkbox has been unchecked
                    checked ? sorting.sortTasksByDueDate() : sorting.sortReset();
                } else if (name === "importance") {
                    setImportanceChecked(checked);
                    setDueDateChecked(false)

                    // Reset the 'sorting order' if the checkbox has been unchecked
                    checked ? sorting.sortTasksByImportance() : sorting.sortReset();
                }
            }
            else if (filterState) {
                filterTasks(name, checked);
                setFilterOptions({
                    ...filterOptions,
                    [name]: {
                        ...filterOptions[name],
                        value: checked
                    }
                })
            }
        }
    }

    // Close the button's 'options' tab when not 'focused' by the user
    function handleBlur() {
        setButtonChecked(false);
    }

    useEffect(() => {
        if (!filter) return;

        // ".entries" returns a list which is converted back to object with ".fromEntries"
        setFilterOptions(
            Object.fromEntries(
                Object.entries(filter).map(([key, values]) => [
                    key,
                    {
                        text: capitalizeWords(separateWords(key)),
                        value: values.state
                    }
                ])
            )
        )
    }, []);

    return (
        <div className='ArrangeButton icon-wrapper'>
            <input name="button" type='checkbox' checked={buttonChecked} onChange={handleChange} onBlur={handleBlur}></input>
            {sortState ? <SortIcon /> : ""}
            {filterState ? <FilterIcon /> : ""}
            <div className='options' onMouseDown={(e) => e.preventDefault()}>
                <div><b>{headerText}</b></div>
                {sortState && (
                    <>
                        <div className='option'>
                            <span>Due date</span>
                            <input name='dueDate' type='checkbox' checked={dueDateChecked} onChange={handleChange}></input>
                        </div>
                        <div className='option'>
                            <span>Importance</span>
                            <input name='importance' type='checkbox' checked={importanceChecked} onChange={handleChange}></input>
                        </div>
                    </>
                )}
                {filterState && (
                    <>
                        {
                            Object.entries(filterOptions).map(([key, obj]) => (
                                <div className='option' key={key}>
                                    <span>{obj.text}</span>
                                    <input name={key} type='checkbox' checked={obj.value} onChange={handleChange}></input>
                                </div>
                            ))
                        }
                    </>
                )}
            </div>
        </div>
    )
}

export default ArrangeButton;