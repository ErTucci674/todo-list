// Returns a string of the current date in the univeral format
export function getCurrentDate() {
    const newDate = new Date();
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let day = newDate.getDate();

    // 2 digits format
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    return `${year}-${month}-${day}`;
}

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