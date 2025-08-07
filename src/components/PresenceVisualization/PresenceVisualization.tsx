import React, { useRef, useState, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../providers/themeContext';
import { PresenceResponse, ProfileResponse, Profile } from '../../services/baseQuery';
import TimelineGrid from './TimelineGrid';
import PresenceLines from './PresenceLines';
import { findMinTimeFromIntervals } from '@/src/utils/timeCalculations';
import { Theme } from '@/assets/theme/theme';
import Avatar from '../Avatar';
import FloatingButton from '../FloatingButton';

const HOUR_SPACING = 60; // 60pts per hour (1pt per minute)
const PROFILE_WIDTH = 80; // Width allocated for each profile - reduced for better fit
const LINE_WIDTH = 2; // Width of presence lines
const LABEL_AREA_WIDTH = 100; // Width reserved for time labels
const CURRENT_TIME_STAMP = 1737698399999;
const PRESENSE_HEIGHT_OFFSET = 120; // Extra height to accommodate presence lines and padding

type PresenceVizualizationProps = {
    presenceData: PresenceResponse;
    profilesData: ProfileResponse;
    profilesPerPage?: number; 
};

const PresenceVisualization = (props: PresenceVizualizationProps) => {
    const { presenceData, profilesData, profilesPerPage = 3 } = props;
    const { theme } = useTheme();
    const scrollViewRef = useRef<ScrollView>(null);
    const [currentPage, setCurrentPage] = useState(0);
  
    const profileMap = profilesData.reduce<Record<number, Profile>>((acc, profile) => {
        acc[profile.uid] = profile;
        return acc;
    }, {});

    const allProfileIds = Object.keys(presenceData);
    const totalPages = Math.ceil(allProfileIds.length / profilesPerPage);
    const currentPageData = useMemo(() => {
        const startIndex = currentPage * profilesPerPage;
        const endIndex = startIndex + profilesPerPage;
        const profileIds = allProfileIds.slice(startIndex, endIndex);
        const filteredPresenceData: PresenceResponse = Object.fromEntries(
            profileIds.map(profileId => [profileId, presenceData[profileId]])
        );

        return {
            profileIds,
            presenceData: filteredPresenceData
        };
    }, [allProfileIds, currentPage, profilesPerPage, presenceData]);
    const { profileIds: currentProfileIds, presenceData: currentPresenceData } = currentPageData;

    const goToPrevPage = () => {
        setCurrentPage(prev => prev - 1);
    };
    const goToNextPage = () => {
        setCurrentPage(prev => prev + 1);
    };

    const scrollToBottom = () => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    };

    const allIntervals: number[][] = Object.values(currentPresenceData).flatMap(profile => profile.presence_intervals);
    const MIN_TIME = findMinTimeFromIntervals(allIntervals, CURRENT_TIME_STAMP);

    // Calculate the floor hour for the minimum time (this will be our bottom reference for the container)
    const minDate = new Date(MIN_TIME);
    const MIN_TIME_FLOOR = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate(), minDate.getHours(), 0, 0, 0).getTime();

    // Calculate total time range and container height. 
    const TIME_RANGE = CURRENT_TIME_STAMP - MIN_TIME_FLOOR;
    const TIME_RANGE_HOURS = TIME_RANGE / (1000 * 60 * 60);
    const TIMELINE_HEIGHT = Math.ceil(TIME_RANGE_HOURS) * HOUR_SPACING; // Pure timeline height

    // Convert timestamp to Y position - single unified coordinate system
    // Bottom of container (y = CONTAINER_HEIGHT) = MIN_TIME_FLOOR
    // Top of container (y = 0) = CURRENT_TIME_STAMP
    const timeToY = (timestamp: number,) => {
        const timeFromMin = timestamp - MIN_TIME_FLOOR;
        const minutesFromMin = timeFromMin / (1000 * 60);
        return TIMELINE_HEIGHT - minutesFromMin;
    };

    const totalWidth = LABEL_AREA_WIDTH + (currentProfileIds.length * PROFILE_WIDTH);

    return (
        <View style={{ flex: 1, backgroundColor: theme.color.background }}>
            <View style={styles(theme).navigationContainer}>
                <TouchableOpacity
                    style={{...styles(theme).navButton, opacity: currentPage === 0 ? 0.5 : 1 }}
                    onPress={goToPrevPage}
                    disabled={currentPage === 0}
                >
                    <Text style={{...theme.textStyle.bodyBold}}>←</Text>
                </TouchableOpacity>
                <View style={styles(theme).pageIndicator}>
                    <Text style={styles(theme).pageText}>
                        {currentPage + 1} of {totalPages}
                    </Text>
                </View>
                <TouchableOpacity
                    style={[styles(theme).navButton, { opacity: currentPage === totalPages - 1 ? 0.5 : 1 }]}
                    onPress={goToNextPage}
                    disabled={currentPage === totalPages - 1}
                >
                    <Text style={theme.textStyle.bodyBold}>→</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles(theme).profileNamesContainer, { marginTop: theme.spacing.md, marginLeft: LABEL_AREA_WIDTH, marginBottom: theme.spacing.md }]}>
                {currentProfileIds.map((profileId) => (
                    <View key={`name-${profileId}`} style={[styles(theme).profileNameWrapper, { width: PROFILE_WIDTH }]}>
                        <Avatar
                            imageUrl={profileMap[Number(profileId)].photo_url || ''}
                            present={currentPresenceData[profileId]?.current_status === 'present'}
                        />
                        <Text style={{...theme.textStyle.caption, textAlign: 'center', marginTop: theme.spacing.xs}}>
                            {profileMap[Number(profileId)].name || `User ${profileId}`}
                        </Text>
                    </View>
                ))}
            </View>

            <ScrollView
                ref={scrollViewRef}
                showsVerticalScrollIndicator={true}
                style={{ flex: 1 }}
            >
                <View style={{ ...styles(theme).chartContainer, width: totalWidth, height: TIMELINE_HEIGHT + PRESENSE_HEIGHT_OFFSET }}>
                    <View style={{ ...styles(theme).combinedVisualizationContainer, marginTop: theme.spacing.lg, height: TIMELINE_HEIGHT }}>
                        <TimelineGrid
                            minTimeFloor={MIN_TIME_FLOOR}
                            currentTimeStamp={CURRENT_TIME_STAMP}
                            timeToY={timeToY}
                            labelAreaWidth={LABEL_AREA_WIDTH}
                        />
                        <PresenceLines
                            presenceData={currentPresenceData}
                            profileIds={currentProfileIds}
                            minTimeFloor={MIN_TIME_FLOOR}
                            currentTimeStamp={CURRENT_TIME_STAMP}
                            profileWidth={PROFILE_WIDTH}
                            lineWidth={LINE_WIDTH}
                            labelAreaWidth={LABEL_AREA_WIDTH}
                            timeToY={timeToY}
                        />
                    </View>
                </View>
            </ScrollView>
            <FloatingButton onPress={scrollToBottom} />
        </View>
    );
};

const styles = (theme: Theme) => {
    return StyleSheet.create({
        chartContainer: {
            paddingTop: theme.spacing.xl,
        },
        navigationContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: theme.spacing.lg,
            paddingVertical: theme.spacing.md,
            backgroundColor: theme.color.surface,
            borderBottomWidth: theme.borderWidth.sm,
            borderBottomColor: theme.color.border,
        },
        navButton: {
            width: theme.size.md,
            height: theme.size.md,
            borderRadius: theme.borderRadius.md,
            backgroundColor: theme.color.primary,
            justifyContent: 'center',
            alignItems: 'center',
        },
        pageIndicator: {
            alignItems: 'center',
        },
        pageText: {
            ...theme.textStyle.bodyBold,
            color: theme.color.text,
        },
        profileNamesContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        profileNameWrapper: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: theme.spacing.xs,
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
        floatingButton: {
            position: 'absolute',
            bottom: theme.spacing.xl,
            right: theme.spacing.xl,
            width: theme.size.md,
            height: theme.size.md,
            borderRadius: theme.borderRadius.md,
            backgroundColor: theme.color.primary,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: theme.color.shadow,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: theme.borderRadius.sm,
            elevation: 5,
        },
    })
}

export default PresenceVisualization;
