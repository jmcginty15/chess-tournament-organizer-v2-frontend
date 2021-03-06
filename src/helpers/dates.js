export const parseDate = (date) => {
    /** Converts a date object to a displayable string */
    const year = date.getFullYear();
    const month = getMonth(date.getMonth());
    const day = date.getDate();
    const weekDay = getDay(date.getDay());
    const hour = date.getHours();
    const min = date.getMinutes();
    return `${weekDay} ${month} ${day} ${year}, ${parseTime(hour, min)}`;
}

const getMonth = (monthNum) => {
    /** Extracts the month from a date object */
    switch (monthNum) {
        case 0:
            return 'Jan';
        case 1:
            return 'Feb';
        case 2:
            return 'Mar';
        case 3:
            return 'Apr';
        case 4:
            return 'May';
        case 5:
            return 'Jun';
        case 6:
            return 'Jul';
        case 7:
            return 'Aug';
        case 8:
            return 'Sep';
        case 9:
            return 'Oct';
        case 10:
            return 'Nov';
        case 11:
            return 'Dec';
    }
}

const getDay = (dayNum) => {
    /** Extracts the day of the week from a date object */
    switch (dayNum) {
        case 0:
            return 'Sun';
        case 1:
            return 'Mon';
        case 2:
            return 'Tue';
        case 3:
            return 'Wed';
        case 4:
            return 'Thu';
        case 5:
            return 'Fri';
        case 6:
            return 'Sat';
    }
}

const parseTime = (hour, min) => {
    /** Extracts the time from a date object */
    let ampm = null;
    if (hour === 0) {
        hour = 12;
        ampm = 'AM';
    }
    else if (hour > 0 && hour < 12) ampm = 'AM';
    else if (hour === 12) ampm = 'PM';
    else if (hour > 12) {
        hour -= 12;
        ampm = 'PM';
    }

    if (min.toString().length === 1) min = `0${min}`;

    return `${hour}:${min} ${ampm}`;
}