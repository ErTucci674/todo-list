import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Tasks.css';
import '../svgs/icons.css';
import PercentageBar from '../PercentageBar.js';
import NewTaskForm from '../NewTaskForm.js';
import Task from '../Task.js';
import ArrangeButton from '../ArrangeButton.js';

function Tasks() {
    const tasksStorageName = "tasks";
    const retrievedUserTasks = JSON.parse(localStorage.getItem(tasksStorageName));
    const [tasks, setTasks] = useState([]);
    const [tempTasks, setTempTasks] = useState([]);
    const [tasksTotal, setTasksTotal] = useState(0);
    const [tasksCompleted, setTasksCompleted] = useState(0);
    const [sort, setSort] = useState({
        dueDate: false,
        importance: false
    });

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
        updateTasks(newUserTasks);

        // Update the total number of tasks
        setTasksTotal(tasksTotal + 1);
    }

    function updateTask(taskToUpdate) {
        let newUserTasks = [...tasks];

        // Remove the item from the list if 'delete' checkbox is active
        if (taskToUpdate.deleteStatus) {
            newUserTasks = tasks.filter((task) => task.id !== taskToUpdate.id);

            // Update the number of completed tasks if necessary
            // Update the total number of tasks
            if (taskToUpdate.completionStatus) setTasksCompleted(tasksCompleted - 1);
            setTasksTotal(tasksTotal - 1);
        } else {
            // Find the correct task and update it
            // Store all of the 'new' tasks in a variable to update the user's storage and app
            newUserTasks = tasks.map((task) => {
                if (task.id === taskToUpdate.id) {
                    // Checks if task completion status changes
                    if (tasks.completionStatus !== taskToUpdate.completionStatus) {
                        taskToUpdate.completionStatus ? setTasksCompleted(tasksCompleted + 1) : setTasksCompleted(tasksCompleted - 1);
                    }

                    // Updates the current task
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
        updateTasks(newUserTasks);
    }

    // --- Sorting Functions ---
    // Reset the sorting to the default state
    function sortReset() {
        setTempTasks([...tasks]);
        setSort({
            dueDate: false,
            importance: false
        })
    }

    // Sort tasks by dueDate in ascending order
    function sortTasksByDueDate(currentTasks = [...tasks]) {
        // The 'Infinity' value (largest possible value) handles tasks without a 'dueDate'
        // Infinity is not needed but keeps the result 'predictable'
        const sortedTasks = currentTasks.sort((a, b) => new Date(a.dueDate || Infinity) - new Date(b.dueDate || Infinity));
        setTempTasks(sortedTasks);
        setSort({
            dueDate: true,
            importance: false
        })
    }

    // Sort taks by importance level in descending order
    function sortTasksByImportance(currentTasks = [...tasks]) {
        const sortedTasks = currentTasks.sort((a, b) => parseInt(b.importance, 10) - parseInt(a.importance, 10));
        setTempTasks(sortedTasks);
        setSort({
            dueDate: false,
            importance: true
        })
    }

    // Updates the 'main' tasks and re-loads the ones illustrated on the page
    function updateTasks(newUserTasks) {
        setTasks(newUserTasks);
        setTempTasks(newUserTasks);
        sortFilter(newUserTasks);
    }

    const sorting = {
        sortReset,
        sortTasksByDueDate,
        sortTasksByImportance
    }

    // Checks which 'sort' and 'filter' options have been selected
    // Adjusts the illustrated tasks accordingly
    function sortFilter(currentTasks) {
        // Check for sorting
        if (sort.dueDate) {
            sortTasksByDueDate(currentTasks)
        }
        else if (sort.importance) {
            sortTasksByImportance(currentTasks);
        }
    }

    useEffect(() => {
        // Get the user's tasks if created already
        if (retrievedUserTasks != null) {
            setTasks(retrievedUserTasks);
            setTempTasks(retrievedUserTasks);
            setTasksTotal(retrievedUserTasks.length);
            setTasksCompleted(retrievedUserTasks.filter(task => task.completionStatus === true).length);
        }
    }, [])

    return (
        <div className='Tasks'>
            <PercentageBar tasksTotal={tasksTotal} tasksCompleted={tasksCompleted} />
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