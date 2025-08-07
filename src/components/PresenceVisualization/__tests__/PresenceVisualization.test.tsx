import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PresenceVisualization from '../PresenceVisualization';
import { PresenceResponse, ProfileResponse } from '@/src/services/baseQuery';

// Mock theme context
jest.mock("@/src/providers/themeContext", () => ({
    useTheme: () => ({
        theme: {
            color: { 
                background: "#F8F8F8", 
                primary: "#007AFF", 
                text: "#111111", 
                surface: "#FFFFFF",
                border: "#E0E0E0",
            },
            spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
            textStyle: {
                bodyBold: { fontSize: 15, fontWeight: "bold", color: "#111111" },
            },
            borderRadius: { sm: 4, md: 8, lg: 16 },
            borderWidth: { sm: 1 },
            size: { md: 48 },
        },
    }),
}));

// Mock child components
jest.mock("@/src/utils/timeCalculations", () => ({
    findMinTimeFromIntervals: jest.fn(() => 1737040000000),
}));


// Simple test data - 6 profiles to test pagination
const mockPresenceData: PresenceResponse = {
    "1": { presence_intervals: [[1737053092803, 1737067430558]], current_status: "present" },
    "2": { presence_intervals: [[1737140164132, 1737151408068]], current_status: "absent" },
    "3": { presence_intervals: [[1737673604520, 1737698399999]], current_status: "present" },
    "4": { presence_intervals: [[1737041817061, 1737047799704]], current_status: "present" },
    "5": { presence_intervals: [[1737049750709, 1737060462671]], current_status: "absent" },
    "6": { presence_intervals: [[1737040051294, 1737061159774]], current_status: "present" },
};

const mockProfilesData: ProfileResponse = [
    { uid: 1, created_at: 1736958708000, name: "User 1", photo_url: null, category: null },
    { uid: 2, created_at: 1736978174000, name: "User 2", photo_url: null, category: null },
    { uid: 3, created_at: 1736978226000, name: "User 3", photo_url: null, category: null },
    { uid: 4, created_at: 1736978248000, name: "User 4", photo_url: null, category: null },
    { uid: 5, created_at: 1736978480000, name: "User 5", photo_url: null, category: null },
    { uid: 6, created_at: 1737144799000, name: "User 6", photo_url: null, category: null },
];

describe('PresenceVisualization Navigation Tests', () => {
    it('should show correct initial page', () => {
        const { getByText } = render(
            <PresenceVisualization 
                presenceData={mockPresenceData} 
                profilesData={mockProfilesData}
                profilesPerPage={3}
            />
        );

        expect(getByText('1 of 2')).toBeTruthy();
    });

    it('should navigate to next page when right arrow is pressed', () => {
        const { getByText } = render(
            <PresenceVisualization 
                presenceData={mockPresenceData} 
                profilesData={mockProfilesData}
                profilesPerPage={3}
            />
        );

        expect(getByText('1 of 2')).toBeTruthy();

        const nextButton = getByText('→');
        fireEvent.press(nextButton);

        expect(getByText('2 of 2')).toBeTruthy();
    });

    it('should navigate back to previous page when left arrow is pressed', () => {
        const { getByText } = render(
            <PresenceVisualization 
                presenceData={mockPresenceData} 
                profilesData={mockProfilesData}
                profilesPerPage={3}
            />
        );

        const nextButton = getByText('→');
        fireEvent.press(nextButton);
        expect(getByText('2 of 2')).toBeTruthy();

        const prevButton = getByText('←');
        fireEvent.press(prevButton);
        expect(getByText('1 of 2')).toBeTruthy();
    });

  
});
