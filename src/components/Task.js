import { useState, useEffect } from 'react';
import './Task.css';
import ReorderIcon from './svgs/component/ReorderIcon.js';
import CheckIcon from './svgs/component/CheckIcon.js';
import CalendarIcon from './svgs/component/CalendarIcon.js';
import IcecubeIcon from './svgs/component/IcecubeIcon.js';
import FireIcon from './svgs/component/FireIcon.js';
import PreferenceIcon from './svgs/component/PreferenceIcon.js';
import EditIcon from './svgs/component/EditIcon.js';
import DeleteIcon from './svgs/component/DeleteIcon.js';

function Task({ task, updateTask }) {
    // The keys are the same as the HTML IDs
    const [taskData, setTaskData] = useState({
        id: task.id,
        text: task.text,
        dueDate: task.dueDate,
        completionStatus: task.completionStatus,
        importance: task.importance,
        preference: task.preference,
        deleteStatus: false
    });

    const [edit, setEdit] = useState(false);

    // The icon of the corresponding Task's importance changes independently from the currently selected importance when in edit mode
    // It changes only when the user saves the edits
    const [importance, setImportance] = useState(taskData.importance);

    // Toggle the Task edit mode
    // Avoids User making changes by mistake
    const toggleEdit = (event) => {
        const editStatus = event.target.checked;

        // Save the new data if edit mode is disabled
        if (!editStatus) {
            // Don't allow the user to leave a blank text
            if (taskData.text.trim() === '') taskData.text = task.text.slice();

            // Make sure spaces at the beginning and end of the task's text are removed
            const adjustedTaskData = {
                ...taskData,
                text: taskData.text.trim()
            }

            // TODO: show an 'error tab' for an invalid text input
            updateTask(adjustedTaskData);
            setTaskData(adjustedTaskData);

            // Update the Task's importance illustrated icon (not the selectable input)
            setImportance(adjustedTaskData.importance);
        }

        setEdit(editStatus);
    }

    const handleChange = (event) => {
        const { value, type, checked, name } = event.target;

        // Setup a temporary storage for the data
        let newTaskData = { ...taskData };

        // Update the corresponding parametre with the new value
        // TODO: deletion/removal animation before checking the 'delete' checkbox
        // Completion status, Preference, Delete Status
        if (type === 'checkbox') {
            newTaskData = {
                ...newTaskData,
                [name]: checked
            };
        } else if (type === 'radio') {
            newTaskData = {
                ...newTaskData,
                importance: value
            };
            // Text, Date
        } else {
            newTaskData = {
                ...newTaskData,
                [name]: value
            };
        }

        setTaskData(newTaskData);
        getTaskDate();

        // Update the values on the main page when 'preference' is selected
        if (name === 'preference' || name === 'deleteStatus') updateTask(newTaskData);
    }

    // Returns converted date format 'year-month-day' to 'day-month-year'
    // Otherwise, if no date has been included, returns a different string
    function getTaskDate() {
        const date = new Date(task.dueDate);

        // Check for a valid date input and return the corresponding string        
        if (isNaN(date.getTime())) return "No due date";
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.');
    }

    // Keep local state in sync when the parent updates the task prop
    useEffect(() => {
        setTaskData({
            id: task.id,
            text: task.text,
            dueDate: task.dueDate,
            completionStatus: task.completionStatus,
            importance: task.importance,
            preference: task.preference,
            deleteStatus: false
        });
        setImportance(task.importance);
    }, [task]);

    return (
        <div className='Task'>
            <div className='date-wrapper'>
                <p>{getTaskDate()}</p>
                <div className='line'></div>
            </div>
            <div className='task-wrapper'>
                <div className='icon-wrapper reorder-icon-wrapper'>
                    <ReorderIcon />
                </div>
                <div className='main'>
                    <section className="top-side">
                        <div className='icon-wrapper check-icon-wrapper'>
                            <input name='completionStatus' className='check-input' type='checkbox' checked={taskData.completionStatus} onChange={handleChange}></input>
                            <CheckIcon />
                        </div>
                        <input name='text' style={{ cursor: edit ? "pointer" : "default" }} type='text' value={taskData.text} onChange={handleChange} autoComplete='off' disabled={!edit}></input>
                        <div className='icon-wrapper preference-icon-wrapper'>
                            <input name='preference' type='checkbox' checked={taskData.preference} onChange={handleChange}></input>
                            <PreferenceIcon />
                        </div>
                        {importance !== "" && (
                            <div className='icon-wrapper'>
                                {importance === "0" ? <IcecubeIcon /> : <FireIcon />}
                            </div>
                        )}
                        <div className='icon-wrapper edit-icon-wrapper'>
                            <input type='checkbox' checked={edit} onChange={toggleEdit}></input>
                            {edit ? <CheckIcon /> : <EditIcon />}
                        </div>
                    </section>
                    <section className={`task-bottom-side ${edit ? "task-visible" : ""}`}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Due Date</th>
                                    <th>Importance</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className='task-date-wrapper'>
                                            <input name='dueDate' className='task-date' type='date' value={taskData.dueDate} onChange={handleChange}></input>
                                            <CalendarIcon />
                                        </div>
                                    </td>
                                    <td>
                                        <div className='importance-options'>
                                            <div className='icon-wrapper'>
                                                <input type='radio' value={"0"} checked={taskData.importance === "0"} onChange={handleChange}></input>
                                                <IcecubeIcon />
                                            </div>
                                            <div className='icon-wrapper'>
                                                <input type='radio' value={"1"} checked={taskData.importance === "1"} onChange={handleChange}></input>
                                                <FireIcon />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                </div>
                <div className='icon-wrapper delete-icon-wrapper'>
                    <input name='deleteStatus' type='checkbox' checked={taskData.deleteStatus} onChange={handleChange}></input>
                    <DeleteIcon />
                </div>
            </div>
        </div>
    )
}

export default Task;