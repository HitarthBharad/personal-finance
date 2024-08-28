import dayjs from "dayjs";

export const checkIfDate = (stringValue: string) => {
    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(stringValue);
};

// inputDate must be in ISO format
export const readableDate = (inputDate: string) => {
    if (checkIfDate(inputDate)) {
        const date = new Date(inputDate);
        return date.toLocaleString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
            timeZone: "UTC"
        });
    }
    return null;
};

export const readableTime12hFmt = (inputTime: string) => {
    if (checkIfDate(inputTime)) {
        const date = new Date(inputTime);
        return date.toLocaleString("en-GB", {
            hourCycle: "h12",
            hour: "numeric",
            minute: "numeric",
            // second: "numeric",
            timeZone: "UTC"
        }).replace('am', 'AM').replace('pm', 'PM');;
    }

    return null;
};

const showReadableDateTime = (utcDate: string) =>
    `${readableDate(utcDate)}, ${readableTime12hFmt(utcDate)}`;

const showReadableDate = (utcDate: string) =>  `${readableDate(utcDate)}`;

export const utcToCompanyTimezoneDate = (utc_date: string, timezoneOffset: number = 0) => {
    if (checkIfDate(utc_date)) {
        const date = new Date(utc_date).toUTCString();
        const companyTimezone = dayjs(date).add(timezoneOffset, "hour").toISOString();
        return showReadableDateTime(companyTimezone)
    }
    return null
}

export const utcToBrowserDate = (utc_date: string, timezoneOffset: number = 0) => {
    if (checkIfDate(utc_date)) {
        const date = new Date(utc_date).toUTCString();
        const companyTimezone = dayjs(date).add(timezoneOffset, "hour").toISOString();
        return showReadableDate(companyTimezone)
    }
    return null
}