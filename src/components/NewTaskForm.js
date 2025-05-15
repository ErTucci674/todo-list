import { useState } from 'react';
import './NewTaskForm.css';
import PlusIcon from './svgs/component/PlusIcon.js';
import MinusIcon from './svgs/component/MinusIcon.js';
import CalendarIcon from './svgs/component/CalendarIcon.js';
import IcecubeIcon from './svgs/component/IcecubeIcon.js';
import FireIcon from './svgs/component/FireIcon.js';

function NewTaskForm({ addNewTask }) {
    // The keys are the same as the HTML IDs
    const [formData, setFormData] = useState({
        newTaskText: '',
        newTaskDate: '',
        newTaskImportance: ''
    });

    const [isFocused, setIsFocused] = useState(false);

    // When the user clicks the text area, the entire 'form' is shown
    // Hide back the bottom side when the user is not 'focusing' on any of the inputs
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    // Update the 'data' whenever a checkbox or radio is toggled
    const handleChange = (event) => {
        const { id, value, type, checked, name } = event.target;

        if (type === 'radio') {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value
            }))
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [id]: value
            }));
        }
    };

    const handleSubmit = (event) => {
        // Prevent page from reloading
        event.preventDefault();

        // Remove spaces at the beginning and end of the task's text
        // Include a text if omitted by the user
        const adjustedFormData = {
            ...formData,
            newTaskText: formData.newTaskText.trim()
        }

        // Don't allow the user to leave a blank text
        // TODO: show an 'error tab' for an invalid text input
        if (adjustedFormData.newTaskText !== '') {
            addNewTask(adjustedFormData);

            // Reset the input values
            setFormData({
                newTaskText: '',
                newTaskDate: '',
                newTaskImportance: ''
            });
        }
    }

    return (
        <div className='NewTaskForm'>
            <form className="newTask-form" onFocus={handleFocus} onBlur={handleBlur} onSubmit={handleSubmit} method='GET'>
                <section className="newTask-top-side">
                    <div className='icon-wrapper'>
                        <PlusIcon />
                        <button className='newTask-submit-button newTask-button' type='submit'></button>
                    </div>
                    <input id="newTaskText" className='newTask-text' type="text" placeholder='Add new task...' value={formData.newTaskText} onChange={handleChange} autoComplete='off' />
                    <div className='icon-wrapper' style={{ visibility: isFocused ? "visible" : "hidden" }}>
                        <MinusIcon />
                        <button className='newTask-shrink-button newTask-button' type='button' onClick={handleBlur}></button>
                    </div>
                </section>
                <section className={`task-bottom-side newTask-bottom-side ${isFocused ? "task-visible" : ""}`}>
                    <table>
                        <tr>
                            <th>Due Date</th>
                            <th>Importance</th>
                        </tr>
                        <tr>
                            <td>
                                <div className='task-date-wrapper'>
                                    <input id='newTaskDate' className='task-date' type='date' value={formData.newTaskDate} onChange={handleChange}></input>
                                    <CalendarIcon />
                                </div>
                            </td>
                            <td>
                                <div className='importance-options'>
                                    <div className='icon-wrapper'>
                                        <input id='newTaskImportanceUseful' type='radio' name='newTaskImportance' value='useful' checked={formData.newTaskImportance === 'useful'} onChange={handleChange}></input>
                                        <IcecubeIcon />
                                    </div>
                                    <div className='icon-wrapper'>
                                        <input id='newTaskImportanceUrgent' type='radio' name='newTaskImportance' value='urgent' checked={formData.newTaskImportance === 'urgent'} onChange={handleChange}></input>
                                        <FireIcon />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </section>
            </form>
        </div>
    )
}

export default NewTaskForm;