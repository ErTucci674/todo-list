import './PercentageBar.css';
import SettingsIcon from './svgs/component/SettingsIcon';

function PercentageBar({ tasksTotal, tasksCompleted }) {
    // Access the html root variables
    const rootStyles = getComputedStyle(document.documentElement);
    const orange = rootStyles.getPropertyValue('--orange');
    const green = rootStyles.getPropertyValue('--green');

    // Determines the when the percentage bar color changes
    // Correspond to the ratio of completed tasks over total tasks
    const factorChangeColor = 0.75;

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
            <div className='percentage-bar' style={{ '--completionStatus': factorToPercentage(), '--completionLineColor': currentCompletionLineColor }}></div>
            <div className='icon-wrapper'>
                <SettingsIcon />
            </div>
        </div>
    )
}

export default PercentageBar;