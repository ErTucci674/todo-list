import { useState, useEffect } from 'react';
import './Tasks.css';
import NewTaskForm from '../NewTaskForm.js';
import Task from '../Task.js';

function Tasks() {
    const tasksStorageName = "tasks";
    const retrievedUserTasks = JSON.parse(localStorage.getItem(tasksStorageName));
    const [tasks, setTasks] = useState([]);

    function setup() {
        // Get the user's tasks if created already
        if (retrievedUserTasks != null) {
            setTasks(retrievedUserTasks);
        }
    }

    function addNewTask(data) {
        // Generate an ID for the new task
        let newId = 0;
        if (tasks.length > 0) {
            newId = tasks[tasks.length - 1].id + 1
        }

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
        if (taskToUpdate.taskDeleteStatus) {
            newUserTasks = tasks.filter((task) => task.id !== taskToUpdate.id);
        } else {
            // Find the correct task and update it
            // Store all of the 'new' tasks in a variable to update the user's storage and app
            newUserTasks = tasks.map((task) => {
                if (task.id === taskToUpdate.id) {
                    task.text = taskToUpdate.taskText;
                    task.dueDate = taskToUpdate.taskDate;
                    task.completionStatus = taskToUpdate.taskCompletionStatus;
                    task.importance = taskToUpdate.taskImportance;
                    task.preference = taskToUpdate.taskPreference;
                }
                return task;
            })
        }

        // Save the new values and reload the new content on the page
        localStorage.setItem(tasksStorageName, JSON.stringify(newUserTasks));
        setTasks(newUserTasks);
    }

    useEffect(() => {
        setup();
    }, [])

    return (
        <div className='Tasks'>
            <NewTaskForm addNewTask={addNewTask} />
            {tasks.map(task => {
                return (
                    <Task key={task.id} task={task} updateTask={updateTask} />
                )
            })}
        </div>
    )
}

export default Tasks;