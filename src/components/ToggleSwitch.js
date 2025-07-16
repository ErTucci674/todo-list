import './ToggleSwitch.css';

function ToggleSwitch({ toggleName, checked, toggleFunction }) {
    // 'Send' the current input to the selected toggleFunction
    const handleChange = (event) => {
        const newToggle = event.target.checked;
        toggleFunction(newToggle);
    }

    return (
        <div className='ToggleSwitch'>
            <input name={toggleName} type='checkbox' checked={checked} onChange={handleChange}></input>
            <div className='switch-style'></div>
        </div>
    )
}

export default ToggleSwitch;