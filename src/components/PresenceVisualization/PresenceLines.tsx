import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../providers/themeContext';
import { PresenceResponse } from '@/src/services/baseQuery';

interface PresenceLinesProps {
  presenceData: PresenceResponse;
  profileIds: string[];
  minTimeFloor: number;
  currentTimeStamp: number;
  profileWidth: number;
  lineWidth: number;
  labelAreaWidth: number;
  timeToY: (timestamp: number) => number;
}

const PresenceLines: React.FC<PresenceLinesProps> = ({
  presenceData,
  profileIds,
  profileWidth,
  lineWidth,
  labelAreaWidth,
  timeToY,
}) => {
  const { theme } = useTheme();

  const renderPresenceLines = (profileId: string, xPosition: number) => {
    const profile = presenceData[profileId];
    if (!profile) return null;

    return profile.presence_intervals.map(([enter, exit]: number[], index: number) => {
      const startY = timeToY(enter);
      const endY = timeToY(exit);
      const lineHeight = Math.abs(startY - endY);

      return (
        <View
          key={`${profileId}-${index}`}
          style={{
             ...styles.presenceLine,
              left: labelAreaWidth + xPosition + (profileWidth - lineWidth) / 2,
              top: Math.min(startY, endY),
              height: lineHeight,
              width: lineWidth,
              backgroundColor: theme.color.primary,
          }}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      {profileIds.map((profileId, index) => 
        renderPresenceLines(profileId, index * profileWidth)
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  presenceLine: {
    position: 'absolute',
  },
});

export default PresenceLines;
