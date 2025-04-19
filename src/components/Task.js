import { useState } from 'react';
import './Task.css';

// TODO: Trig the task to be edited

// Date input can be modified with such code:
// <input type="date" disabled />
// The 'disabled' can be removed with: inputId.removeAttribute("disabled")
// Remember to remove 'background' and 'border' for the input to show just the text

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

    const [edit, setEdit] = useState(false);

    // Toggle the Task edit mode
    // Avoids User making changes by mistake
    const toggleEdit = (event) => {
        const editStatus = event.target.checked;

        // Save the new data if edit mode is disabled
        if (!editStatus) {
            // Make sure spaces at the beginning and end of the task's text are removed
            // Include a text if omitted by the user
            // TODO: Don't allow the user to leave a blank text
            const adjustedTaskData = {
                ...taskData,
                taskText: taskData.taskText.trim() || 'Text'
            }
            updateTask(adjustedTaskData);
            setTaskData(adjustedTaskData);
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
            <div className='task-wrapper'>
                <div className="top-side">
                    <input id='taskCompletionStatus' type='checkbox' checked={taskData.taskCompletionStatus} onChange={handleChange}></input>
                    <input id='taskText' type='text' value={taskData.taskText} onChange={handleChange} autoComplete='off' disabled={!edit}></input>
                    <input id='taskPreference' type='checkbox' checked={taskData.taskPreference} onChange={handleChange}></input>
                    <input id='editCheckbox' type='checkbox' checked={edit} onChange={toggleEdit}></input>
                    <input id='taskDeleteStatus' type='checkbox' checked={taskData.taskDeleteStatus} onChange={handleChange}></input>
                </div>
                <div className='bottom-side'>
                    <input id='taskDate' type='date' value={taskData.taskDate} onChange={handleChange} disabled={!edit}></input>
                    {/* Show just the selected 'importance level' if not in edit mode */}
                    {edit || taskData.taskImportance === 'useful' ? (
                        <input id='taskImportanceUseful' type='radio' name='taskImportance' value={'useful'} checked={taskData.taskImportance === 'useful'} onChange={handleChange} disabled={!edit}></input>
                    ) : null}
                    {edit || taskData.taskImportance === 'urgent' ? (
                        <input id='taskImportanceUrgent' type='radio' name='taskImportance' value={'urgent'} checked={taskData.taskImportance === 'urgent'} onChange={handleChange} disabled={!edit}></input>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default Task;