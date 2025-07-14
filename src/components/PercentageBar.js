import { useState } from 'react';
import './PercentageBar.css';
import SettingsIcon from './svgs/component/SettingsIcon';
import DeleteIcon from './svgs/component/DeleteIcon';
import ToggleSwitch from './ToggleSwitch';

function PercentageBar({ tasksTotal, tasksCompleted }) {
    // Settings
    const [openSettings, setOpenSettings] = useState(false);
    const [displaySettings, setDisplaySettings] = useState('none');
    const [percentageBar, setPercentageBar] = useState(true);
    const settingsWindowDisplayMode = 'grid';

    // Access the html root variables
    const rootStyles = getComputedStyle(document.documentElement);
    const orange = rootStyles.getPropertyValue('--orange');
    const green = rootStyles.getPropertyValue('--green');

    // Determines the when the percentage bar color changes
    // Correspond to the ratio of completed tasks over total tasks
    const factorChangeColor = 0.75;
    const factorStep = 5;
    const factorNumbers = Array.from({ length: (100 / factorStep) }, (_, i) => (i + 1) * factorStep);

    // Toggle the settings window
    const toggleSettings = (event) => {
        const settingsStatus = event.target.checked;
        settingsStatus ? setDisplaySettings(settingsWindowDisplayMode) : setDisplaySettings('none');
        setOpenSettings(settingsStatus);
    }

    function togglePercentageBar(toggle) {
        setPercentageBar(toggle);
    }

    // Switch colors (smooth change takes place in the css)
    let currentCompletionLineColor = orange;
    if (getCompletionFactor() >= factorChangeColor) currentCompletionLineColor = green;

    // Returns a string of the completed tasks of type integer
    function getCompletionFactor() {
        if (tasksTotal === 0) return 0;
        return (tasksCompleted / tasksTotal);
    }

    // Returns a string of the completed tasks in percentage
    function factorToPercentage(factor = getCompletionFactor()) {
        return (`${factor * 100}%`);
    }

    return (
        <div className="PercentageBar">
            <div className='percentage-bar' style={{ '--completionStatus': factorToPercentage(), '--completionLineColor': currentCompletionLineColor, 'opacity': percentageBar ? '100%' : '0%' }}></div>
            <div className='icon-wrapper'>
                <input name='settings-checkbox' className='settings-checkbox' type='checkbox' checked={openSettings} onChange={toggleSettings} />
                <SettingsIcon />
            </div>

            <div className='settings-wrapper' style={{ 'display': displaySettings }}>
                <div className='settings-window'>
                    <div className='top-section'>
                        <span>Settings</span>
                        <div className='icon-wrapper'>
                            <input name='settings-window-checkbox' className='settings-window-checkbox' type='checkbox' checked={openSettings} onChange={toggleSettings} />
                            <DeleteIcon />
                        </div>
                    </div>
                    <ul className='settings'>
                        <li>
                            <span>Percentage Bar</span>
                            <ToggleSwitch toggleFunction={togglePercentageBar} />
                        </li>
                        <li>
                            <span>Percentage Goal</span>
                            <select className='percentageFactors' name="factors">
                                {factorNumbers.map((num) => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                        </li>
                        <li>
                            <span>Dark Theme</span>
                            <ToggleSwitch />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default PercentageBar;