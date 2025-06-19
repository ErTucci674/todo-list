import './PercentageBar.css';
import SettingsIcon from './svgs/component/SettingsIcon';

function PercentageBar() {
    return (
        <div className="PercentageBar">
            <div className='percentage-bar'></div>
            <div className='icon-wrapper'>
                <SettingsIcon />
            </div>
        </div>
    )
}

export default PercentageBar;