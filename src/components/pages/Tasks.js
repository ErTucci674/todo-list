import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Tasks.css';
import '../svgs/icons.css';
import NewTaskForm from '../NewTaskForm.js';
import Task from '../Task.js';
import ArrangeButton from '../ArrangeButton.js';

function Tasks() {
    const tasksStorageName = "tasks";
    const retrievedUserTasks = JSON.parse(localStorage.getItem(tasksStorageName));
    const [tasks, setTasks] = useState([]);
    const [tempTasks, setTempTasks] = useState([]);

    function addNewTask(data) {
        // Generate an ID for the new task
        let newId = uuidv4();

        // Setup the new task's values
        const newTask = {
            'id': newId,
            'text': data.newTaskText,
            'dueDate': data.newTaskDate,
            'completionStatus': false,
            'importance': data.newTaskImportance,
            'preference': false,
        }

        // Get update 'tasks' with the new 'task' object
        let newUserTasks = [...tasks, newTask];
        localStorage.setItem(tasksStorageName, JSON.stringify(newUserTasks));

        // Update the tasks list
        setTasks(newUserTasks);
    }

    function updateTask(taskToUpdate) {
        let newUserTasks = [...tasks];

        // Remove the item from the list if 'delete' checkbox is active
        if (taskToUpdate.deleteStatus) {
            newUserTasks = tasks.filter((task) => task.id !== taskToUpdate.id);
        } else {
            // Find the correct task and update it
            // Store all of the 'new' tasks in a variable to update the user's storage and app
            newUserTasks = tasks.map((task) => {
                if (task.id === taskToUpdate.id) {
                    task.text = taskToUpdate.text;
                    task.dueDate = taskToUpdate.dueDate;
                    task.completionStatus = taskToUpdate.completionStatus;
                    task.importance = taskToUpdate.importance;
                    task.preference = taskToUpdate.preference;
                }
                return task;
            })
        }

        // Save the new values and reload the new content on the page
        localStorage.setItem(tasksStorageName, JSON.stringify(newUserTasks));
        setTasks(newUserTasks);
    }

    // --- Sorting Functions ---
    // Reset the sorting to the default state
    function sortReset() {
        setTempTasks([...tasks]);
    }

    // Sort tasks by dueDate in ascending order
    function sortTasksByDueDate() {
        // The 'Infinity' value (largest possible value) handles tasks without a 'dueDate'
        // Infinity is not needed but keeps the result 'predictable'
        const sortedTasks = [...tasks].sort((a, b) => new Date(a.dueDate || Infinity) - new Date(b.dueDate || Infinity));
        setTempTasks(sortedTasks);
    }

    const sorting = {
        sortReset,
        sortTasksByDueDate,
    }

    useEffect(() => {
        // Get the user's tasks if created already
        if (retrievedUserTasks != null) {
            setTasks(retrievedUserTasks);
            setTempTasks(retrievedUserTasks);
        }
    }, [])

    return (
        <div className='Tasks'>
            <NewTaskForm addNewTask={addNewTask} />
            <div className='arrange-wrapper'>
                <ArrangeButton sort={true} sorting={sorting} filter={false} />
                <ArrangeButton sort={false} sorting={sorting} filter={true} />
            </div>
            {tempTasks.map(task => {
                return (
                    <Task key={task.id} task={task} updateTask={updateTask} />
                )
            })}
        </div>
    )
}

export default Tasks;