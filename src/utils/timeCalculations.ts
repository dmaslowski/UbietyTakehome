import { PresenceResponse } from "../services/baseQuery";

export const findMinTime = (presences: PresenceResponse, currentTimeStamp: number) => {
    let minTime = currentTimeStamp;
    Object.values(presences).forEach((profile) => {
        profile.presence_intervals.forEach(([enter]) => {
            if (enter < minTime) {
                minTime = enter;
            }
        });
    });
    return minTime;
};


export const findMinTimeFromIntervals = (intervals: number[][], currentTimeStamp: number) => {
    let minTime = currentTimeStamp;
    intervals.forEach(([enter]) => {
        if (enter < minTime) {
            minTime = enter;
        }
    });
    return minTime;
};

// Convert timestamp to Y position - single unified coordinate system
// Bottom of container (y = CONTAINER_HEIGHT) = MIN_TIME_FLOOR
// Top of container (y = 0) = CURRENT_TIME_STAMP
export const timeToY = (timestamp: number, minTimeFloor: number, viewHeight: number) => {
    const timeFromMin = timestamp - minTimeFloor; // Difference from the minimum time
    // Convert milliseconds to minutes
    const minutesFromMin = timeFromMin / (1000 * 60);
    // Calculate Y position: higher timestamps (closer to current time) are higher on the screen
    return viewHeight - minutesFromMin;
};