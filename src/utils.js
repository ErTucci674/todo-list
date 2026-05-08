// Returns converted date format 'year-month-day' to 'day-month-year'
// Otherwise, if no date has been included, returns a different string
export function dateToString(date) {
    const tmpDate = new Date(date);

    // Check for a valid date input and return the corresponding string        
    if (isNaN(tmpDate.getTime())) return "No due date";
    return tmpDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.');
}

// Words are capitalized according to the string's white spaces
export function capitalizeWords(str) {
    const splittedStr = str.split(/\s/);
    const tempStr = splittedStr.map(word => (word[0].toUpperCase() + word.slice(1))).join(' ');
    return tempStr;
}

// Words are separated according to the capitalized characters in the string
export function separateWords(str) {
    return str.length <= 1 ? str : str.split(/(?=[A-Z])/).join(' ');
}