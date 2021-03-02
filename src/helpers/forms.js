import moment from 'moment';

export const processFormData = (data, customTimeControl, loggedInUser) => {
    /** Configures form data for sending in an API request */
    if (data.timeControl === 'custom') data.timeControl = customTimeControl;
    data.director = loggedInUser.username;
    data._token = loggedInUser._token;
    const datetimeFields = ['registrationOpen', 'registrationClose', 'startDate'];
    for (let field of datetimeFields) {
        const date = moment(data[field]);
        data[field] = date.utc().format();
    }
    return data;
}