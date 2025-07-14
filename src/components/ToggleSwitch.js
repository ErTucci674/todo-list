import './ToggleSwitch.css';

function ToggleSwitch({ toggleFunction }) {
    // 'Send' the current input to the selected toggleFunction
    const handleChange = (event) => {
        const { checked } = event.target;
        toggleFunction(checked);
    }

    return (
        <div className='ToggleSwitch'>
            <input type='checkbox' onChange={handleChange}></input>
            <div className='switch-style'></div>
        </div>
    )
}

export default ToggleSwitch;