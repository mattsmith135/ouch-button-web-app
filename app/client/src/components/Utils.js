// This file contains utility functions which are used throughout the application

import L from "leaflet";

export const findMostCommonCoordinates = (coordinates) => {
    const groups = [];

    coordinates.forEach(coord => {
        const matchingGroup = groups.find(group => {
            const [groupLat, groupLng] = group[0];
            const distance = L.latLng(coord).distanceTo(L.latLng(groupLat, groupLng));
            return distance < 100;
        });

        if (matchingGroup) {
            matchingGroup[1]++;
        } else {
            groups.push([coord, 1]);
        }
    });

    let mostCommonCoordinate = null;
    let mostCommonFrequency = 0;

    groups.forEach(group => {
        const frequency = group[1];
        if (frequency > mostCommonFrequency) {
            mostCommonFrequency = frequency;
            mostCommonCoordinate = group[0];
        }
    });

    return mostCommonCoordinate;
}

export const getLastWeekDays = () => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 6);

    const lastWeekDays = [];

    for (let i = 0; i < 7; i++) {
        lastWeekDays.push(daysOfWeek[(lastWeek.getDay() + i) % 7]);
    }

    return lastWeekDays;
}

export const getLastWeekDates = () => {
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 6);

    const lastWeekDates = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date(lastWeek);
        date.setDate(lastWeek.getDate() + i);
        lastWeekDates.push(date.toISOString().split('T')[0]);
    }

    return lastWeekDates;
}

export const formatAMPM = (hour) => {
    let ampm = "AM";

    if (hour > 12) {
        hour -= 12;
        ampm = "PM";
    }

    return hour + ampm;
}

export const findHour = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const hour = date.getHours();
    return hour;
}