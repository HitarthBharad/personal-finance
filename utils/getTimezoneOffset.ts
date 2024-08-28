// Function to get the browser's timezone offset in hours
const getBrowserTimezoneOffset = () => {
    // Get the timezone offset in minutes
    const offsetInMinutes = new Date().getTimezoneOffset();
    
    // Convert minutes to hours and adjust sign (offsetInMinutes is positive for time zones behind UTC)
    const offsetInHours = -offsetInMinutes / 60;

    return offsetInHours;
};
 export default getBrowserTimezoneOffset;
