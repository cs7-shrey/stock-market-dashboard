export default function isMarketClosed() {
    const now = new Date();

    // Convert current time to IST
    const offsetIST = 5.5 * 60 * 60 * 1000; // IST is UTC + 5:30
    const currentISTTime = new Date(now.getTime() + offsetIST);

    const currentDay = currentISTTime.getUTCDay(); // getUTCDay returns 0 (Sunday) to 6 (Saturday)
    console.log("Current Day: ", currentDay);
    // Check if today is Saturday (6) or Sunday (0)
    const isWeekend = currentDay === 6 || currentDay === 0;

    // Get current hours and minutes in IST
    const hours = currentISTTime.getUTCHours();
    const minutes = currentISTTime.getUTCMinutes();
    console.log("Hours: ", hours, "Minutes: ", minutes);
    // Calculate total minutes from 00:00 for easy comparison
    const currentMinutes = hours * 60 + minutes;

    // Define the time window (7:00 PM to 1:30 AM IST)
    const startTimeMinutes = 19 * 60; // 7:00 PM = 19:00 in minutes
    const endTimeMinutes = 1 * 60 + 30; // 1:30 AM = 01:30 in minutes

    // Check if current time is not between 7:00 PM and 1:30 AM
    const isOutsideTimeRange = currentMinutes < startTimeMinutes && currentMinutes > endTimeMinutes;

    // Return true if it's weekend and time is outside the window
    return isWeekend || isOutsideTimeRange;
}

export function unixTimetoHumanDateTime(input) {
    const unixTime = input;
    const dateObject = new Date(unixTime);

    // Format the date into a human-readable string
    const formattedTime = dateObject.toLocaleString(); // Local date and time string
    const time = dateObject.toTimeString(); // Local time string
    return time.split(' ')[0]
}