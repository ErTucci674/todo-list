import { useState } from 'react';
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
        taskText: task.text,
        taskDate: task.dueDate,
        taskCompletionStatus: task.completionStatus,
        taskImportance: task.importance,
        taskPreference: task.preference,
        taskDeleteStatus: false
    });

    const [edit, setEdit] = useState(true);

    // Toggle the Task edit mode
    // Avoids User making changes by mistake
    const toggleEdit = (event) => {
        const editStatus = event.target.checked;

        // Save the new data if edit mode is disabled
        if (!editStatus) {
            // Make sure spaces at the beginning and end of the task's text are removed
            const adjustedTaskData = {
                ...taskData,
                taskText: taskData.taskText.trim()
            }

            // Don't allow the user to leave a blank text
            // TODO: show an 'error tab' for an invalid text input
            if (adjustedTaskData.taskText !== '') {
                updateTask(adjustedTaskData);
                setTaskData(adjustedTaskData);
            }
        };

        setEdit(editStatus);
    }

    const handleChange = (event) => {
        const { id, value, type, checked, name } = event.target;

        // Setup a temporary storage for the data
        let newTaskData = { ...taskData };

        // Update the corresponding parametre with the new value
        // TODO: deletion/removal animation before checking the 'delete' checkbox
        if (type === 'checkbox') {
            newTaskData = {
                ...newTaskData,
                [id]: checked
            };
            // Update the values on the main page
            updateTask(newTaskData);
        } else if (type === 'radio') {
            newTaskData = {
                ...newTaskData,
                [name]: value,
            }
        } else {
            newTaskData = {
                ...newTaskData,
                [id]: value
            };
        }

        setTaskData(newTaskData);
    }

    return (
        <div className='Task'>
            <div className='icon-wrapper reorder-icon-wrapper'>
                <ReorderIcon />
            </div>
            <div className='main'>
                <section className="top-side">
                    <div className='icon-wrapper check-icon-wrapper'>
                        <input id='taskCompletionStatus' className='check-input' type='checkbox' checked={taskData.taskCompletionStatus} onChange={handleChange}></input>
                        <CheckIcon />
                    </div>
                    <input id='taskText' type='text' value={taskData.taskText} onChange={handleChange} autoComplete='off' disabled={!edit}></input>
                    <div className='icon-wrapper preference-icon-wrapper'>
                        <input id='taskPreference' type='checkbox' checked={taskData.taskPreference} onChange={handleChange}></input>
                        <PreferenceIcon />
                    </div>
                    <div className='icon-wrapper'>
                        {taskData.taskImportance === "useful" ? <IcecubeIcon /> : <FireIcon />}
                    </div>
                    <div className='icon-wrapper edit-icon-wrapper'>
                        <input id='editCheckbox' type='checkbox' checked={edit} onChange={toggleEdit}></input>
                        {edit ? <CheckIcon /> : <EditIcon />}
                    </div>
                </section>
                <section className={`task-bottom-side ${edit ? "task-visible" : ""}`}>
                    <table>
                        <tr>
                            <th>Due Date</th>
                            <th>Importance</th>
                        </tr>
                        <tr>
                            <td>
                                <div className='task-date-wrapper'>
                                    <input id='taskDate' className='task-date' type='date' value={taskData.taskDate} onChange={handleChange}></input>
                                    <CalendarIcon />
                                </div>
                            </td>
                            <td>
                                <div className='importance-options'>
                                    <div className='icon-wrapper'>
                                        <input id='taskImportanceUseful' type='radio' name='taskImportance' value='useful' checked={taskData.taskImportance === 'useful'} onChange={handleChange}></input>
                                        <IcecubeIcon />
                                    </div>
                                    <div className='icon-wrapper'>
                                        <input id='taskImportanceUrgent' type='radio' name='taskImportance' value='urgent' checked={taskData.taskImportance === 'urgent'} onChange={handleChange}></input>
                                        <FireIcon />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </section>
            </div>
            <div className='icon-wrapper delete-icon-wrapper'>
                <input id='taskDeleteStatus' type='checkbox' checked={taskData.taskDeleteStatus} onChange={handleChange}></input>
                <DeleteIcon />
            </div>
        </div>
    )
}

export default Task;