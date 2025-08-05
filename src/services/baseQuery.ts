import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import presenceData from './fakeApiResponse/presence.json';
import profilesData from './fakeApiResponse/profiles.json';

export type PresenceResponse = {
    [userId: string]:{
        presence_intervals: number[][];
        current_status: "present" | "absent";
    };
}

export type Profile = {
    uid: number;
    created_at: number;
    name: string;
    photo_url: string | null;
    category: string | null;
}

export type ProfileResponse = Profile[];

// Mock data loader
const loadPresenceMockData = (): PresenceResponse => {
    //Normally would avoid as here but for mock data generation this is acceptable
    return presenceData as PresenceResponse;
};

const loadProfileMockData = (): ProfileResponse => {
    //Normally would avoid as here but for mock data generation this is acceptable
    return profilesData as ProfileResponse;
};

export const ubietyBaseApiSlice = createApi({
    reducerPath: 'ubietyBaseApi',
    baseQuery: (fetchBaseQuery({ baseUrl: '/' })), // Not used for mock
    refetchOnMountOrArgChange: true, // Always fetch fresh data on mount
    refetchOnReconnect: true, // Refetch when network reconnects
    endpoints: (builder) => ({
        getPresenceData: builder.query<PresenceResponse, void>({
            queryFn: () => {
                // Simulate API delay
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({ data: loadPresenceMockData() });
                    }, 500); 
                });
            },
            keepUnusedDataFor: 86400, // Keep cached data for 24 hours

        }),
          getProfileData: builder.query<ProfileResponse, void>({
            queryFn: () => {
                // Simulate API delay
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({ data: loadProfileMockData() });
                    }, 500); 
                });
            },
            keepUnusedDataFor: 86400, // Keep cached data for 24 hours
        }),
    }),
})

export const { useGetPresenceDataQuery, useGetProfileDataQuery } = ubietyBaseApiSlice

