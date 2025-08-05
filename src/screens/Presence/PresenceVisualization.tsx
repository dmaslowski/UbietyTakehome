import React from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../../providers/themeContext';
import { useGetPresenceDataQuery, useGetProfileDataQuery } from '../../services/baseQuery';
import { findMinTime } from '@/src/utils/timeCalculations';
import TimelineGrid from '../../components/TimelineGrid';

const HOUR_SPACING = 60; // 60pts per hour (1pt per minute)
const PROFILE_WIDTH = 120; // Width allocated for each profile
const LINE_WIDTH = 2; // Width of presence lines
const LABEL_AREA_WIDTH = 160; // Width reserved for time labels
const CURRENT_TIME_STAMP = 1737698399999;

const PresenceVisualization = () => {
    const { theme } = useTheme();

    // RTK Query hooks
    const {
        data: presenceData,
        isLoading: presenceLoading,
        error: presenceError
    } = useGetPresenceDataQuery();

    const {
        data: profilesData,
        isLoading: profilesLoading,
        error: profilesError
    } = useGetProfileDataQuery();

    // Show loading state while either query is loading
    if (presenceLoading || profilesLoading) {
        return (
            <View style={[styles.container, styles.centerContent, { backgroundColor: theme.color.background }]}>
                <ActivityIndicator size="large" color={theme.color.primary} />
                <Text style={[styles.loadingText, { color: theme.color.text, marginTop: theme.spacing.md }]}>
                    Loading presence data...
                </Text>
            </View>
        );
    }

    // Show error state if either query failed
    if (presenceError || profilesError) {
        return (
            <View style={[styles.container, styles.centerContent, { backgroundColor: theme.color.background }]}>
                <Text style={[styles.errorText, { color: theme.color.error }]}>
                    Error loading data. Please try again.
                </Text>
            </View>
        );
    }

    // Return early if data is not available
    if (!presenceData || !profilesData) {
        return (
            <View style={[styles.container, styles.centerContent, { backgroundColor: theme.color.background }]}>
                <Text style={[styles.errorText, { color: theme.color.text }]}>
                    No data available.
                </Text>
            </View>
        );
    }

    // Create a map of profiles for easy lookup
    const profileMap = profilesData.reduce<Record<number, string>>((acc, profile) => {
        acc[profile.uid] = profile.name;
        return acc;
    }, {});

    // Find the minimum time across all intervals
    const MIN_TIME = findMinTime(presenceData, CURRENT_TIME_STAMP);

    // Calculate the floor hour for the minimum time (this will be our bottom reference)
    const minDate = new Date(MIN_TIME);
    const MIN_TIME_FLOOR = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate(), minDate.getHours(), 0, 0, 0).getTime();

    // Calculate total time range and container height
    const TIME_RANGE = CURRENT_TIME_STAMP - MIN_TIME_FLOOR;
    const TIME_RANGE_HOURS = TIME_RANGE / (1000 * 60 * 60);
    const TIMELINE_HEIGHT = Math.ceil(TIME_RANGE_HOURS) * HOUR_SPACING; // Pure timeline height
    const CONTAINER_HEIGHT = TIMELINE_HEIGHT; // Timeline + padding

    // Convert timestamp to Y position - single unified coordinate system
    // Bottom of container (y = CONTAINER_HEIGHT) = MIN_TIME_FLOOR
    // Top of container (y = 0) = CURRENT_TIME_STAMP
    const timeToY = (timestamp: number) => {
        const timeFromMin = timestamp - MIN_TIME_FLOOR;
        const minutesFromMin = timeFromMin / (1000 * 60);
        return CONTAINER_HEIGHT - minutesFromMin;
    };

    // Render presence lines for a profile
    const renderPresenceLines = (profileId: string, xPosition: number) => {
        const profile = (presenceData as any)[profileId];
        if (!profile) return null;

        return profile.presence_intervals.map(([enter, exit]: number[], index: number) => {
            const startY = timeToY(enter);
            const endY = timeToY(exit);
            const lineHeight = Math.abs(startY - endY);

            return (
                <View
                    key={index}
                    style={[
                        styles.presenceLine,
                        {
                            left: LABEL_AREA_WIDTH + xPosition + (PROFILE_WIDTH - LINE_WIDTH) / 2,
                            top: Math.min(startY, endY),
                            height: lineHeight,
                            width: LINE_WIDTH,
                            backgroundColor: profile.current_status === 'present' ? theme.color.primary : theme.color.error,
                        }
                    ]}
                />
            );
        });
    }; const profileIds = Object.keys(presenceData);
    const totalWidth = LABEL_AREA_WIDTH + (profileIds.length * PROFILE_WIDTH);

    return (
        <View style={[styles.container, { backgroundColor: theme.color.background }]}>
            <ScrollView
                showsVerticalScrollIndicator={true}
                style={styles.scrollView}
            >
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={true}
                    style={styles.horizontalScrollView}
                >
                    <View style={[styles.chartContainer, { width: totalWidth, height: CONTAINER_HEIGHT + 100 }]}>
                        {/* Profile names at the very top */}
                        <View style={[styles.profileNamesContainer, { marginTop: theme.spacing.md, marginLeft: LABEL_AREA_WIDTH }]}>
                            {profileIds.map((profileId, index) => (
                                <View key={`name-${profileId}`} style={[styles.profileNameWrapper, { width: PROFILE_WIDTH }]}>
                                    <Text
                                        style={[
                                            styles.profileName,
                                            {
                                                color: theme.color.text,
                                                fontSize: theme.textStyle.body.fontSize,
                                            }
                                        ]}
                                    >
                                        {profileMap[parseInt(profileId)] || `Profile ${profileId}`}
                                    </Text>
                                </View>
                            ))}
                        </View>
                        <View style={[styles.combinedVisualizationContainer, { marginTop: theme.spacing.lg, height: CONTAINER_HEIGHT }]}>
                            <TimelineGrid
                                minTimeFloor={MIN_TIME_FLOOR}
                                currentTimeStamp={CURRENT_TIME_STAMP}
                                timeToY={timeToY}
                                labelAreaWidth={LABEL_AREA_WIDTH}
                            />
                            {profileIds.map((profileId, index) =>
                                renderPresenceLines(profileId, index * PROFILE_WIDTH)
                            )}
                        </View>
                    </View>
                </ScrollView>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 16,
        fontWeight: '500',
    },
    errorText: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
    scrollView: {
        flex: 1,
    },
    horizontalScrollView: {
        flex: 1,
    },
    chartContainer: {
        position: 'relative',
        paddingTop: 20,
    },
    profileNamesContainer: {
        flexDirection: 'row',
        minHeight: 30,
        alignItems: 'flex-start',
    },
    profileNameWrapper: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingVertical: 4,
    },
    combinedVisualizationContainer: {
        position: 'relative',
        flex: 1,
    },
    presenceContainer: {
        position: 'relative',
        flex: 1,
    },
    presenceLine: {
        position: 'absolute',
    },
    profileName: {
        textAlign: 'left',
        fontWeight: '600',
        paddingHorizontal: 4,
        flexWrap: 'wrap',
        lineHeight: 16,
    },
});

export default PresenceVisualization;
