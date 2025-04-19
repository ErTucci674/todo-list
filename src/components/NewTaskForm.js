import { useState } from 'react';
import './NewTaskForm.css';

function NewTaskForm({ addNewTask }) {
    // The keys are the same as the HTML IDs
    const [formData, setFormData] = useState({
        newTaskText: '',
        newTaskDate: '',
        newTaskImportance: ''
    });

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
        // TODO: Don't allow the user to leave a blank text
        const adjustedFormData = {
            ...formData,
            newTaskText: formData.newTaskText.trim() || 'Task'
        }

        addNewTask(adjustedFormData);

        // Reset the input values
        setFormData({
            newTaskText: '',
            newTaskDate: '',
            newTaskImportance: ''
        });
    }

    return (
        <div className='NewTaskForm'>
            <div className='newTask-wrapper'>
                <form className="newTask-form" onSubmit={handleSubmit} method='GET'>
                    <div className="top-side">
                        <button type='submit'></button>
                        <input id="newTaskText" type="text" placeholder='Add new task...' value={formData.newTaskText} onChange={handleChange} autoComplete='off' />
                    </div>
                    <div className="bottom-side">
                        <input id='newTaskDate' type='date' value={formData.newTaskDate} onChange={handleChange}></input>
                        <input id='newTaskImportanceUseful' type='radio' name='newTaskImportance' value='useful' checked={formData.newTaskImportance === 'useful'} onChange={handleChange}></input>
                        <input id='newTaskImportanceUrgent' type='radio' name='newTaskImportance' value='urgent' checked={formData.newTaskImportance === 'urgent'} onChange={handleChange}></input>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewTaskForm;