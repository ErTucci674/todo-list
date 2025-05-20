import './ArrangeButton.css';
import SortIcon from './svgs/component/SortIcon.js';

function ArrangeButton({ sort, sorting, filter }) {
    return (
        <div className='ArrangeButton icon-wrapper'>
            <input type='checkbox'></input>
            {sort ? <SortIcon /> : ""}
        </div>
    )
}

export default ArrangeButton;