import './ArrangeButton.css';
import SortIcon from './svgs/component/SortIcon.js';

function ArrangeButton({ sort, sorting, filter }) {
    return (
        <div className='ArrangeButton icon-wrapper'>
            <input type='checkbox'></input>
            {sort ? <SortIcon /> : ""}
            <div className='options'>
                <div><b>Filter by</b></div>
                <div className='option'>
                    <span>Due date</span>
                    <input type='checkbox'></input>
                </div>
                <div className='option'>
                    <span>Importance</span>
                    <input type='checkbox'></input>
                </div>
            </div>
        </div>
    )
}

export default ArrangeButton;