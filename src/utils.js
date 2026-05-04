// Returns converted date format 'year-month-day' to 'day-month-year'
// Otherwise, if no date has been included, returns a different string
export function dateToString(date) {
    const tmpDate = new Date(date);

    // Check for a valid date input and return the corresponding string        
    if (isNaN(tmpDate.getTime())) return "No due date";
    return tmpDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.');
}