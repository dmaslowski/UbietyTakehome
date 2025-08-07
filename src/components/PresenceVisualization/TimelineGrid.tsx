import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../providers/themeContext';
import { Theme } from '@/assets/theme/theme';

interface TimelineGridProps {
  minTimeFloor: number;
  currentTimeStamp: number;
  timeToY: (timestamp: number) => number;
  labelAreaWidth: number;
}

type TimelineData = {
  id: number;
  timestamp: number;
  y: number;
  timeStr: string;
  dateStr: string;
};

const TimelineGrid: React.FC<TimelineGridProps> = ({
  minTimeFloor,
  currentTimeStamp,
  timeToY,
  labelAreaWidth,
}) => {
  const { theme } = useTheme();

  const timelineData = useMemo(() => {
    const timeRange = currentTimeStamp - minTimeFloor;
    const totalHours = Math.ceil(timeRange / (1000 * 60 * 60));
    const hours: TimelineData[] = [];

    for (let i = 0; i <= totalHours; i++) {
      const lineTime = minTimeFloor + (i * 60 * 60 * 1000);
      const date = new Date(lineTime);
      const y = timeToY(lineTime);
      if (i === totalHours) {
        hours.push({
          id: i,
          timestamp: lineTime,
          y: y,
          timeStr: 'Current Time',
          dateStr: '',
        });
      } else {
        hours.push({
          id: i,
          timestamp: lineTime,
          y: y,
          timeStr: date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }),
          dateStr: date.getHours() % 4 === 0 ? date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          }) : '',
        });
      }
    }

    return hours;
  }, [minTimeFloor, currentTimeStamp, timeToY]);

  const renderGridLine = (item: TimelineData) => (
    <View key={`grid-${item.id}`} style={{ ...styles(theme).gridContainer, backgroundColor: theme.color.surface, top: item.y }}>
      <View
        style={{
          ...styles(theme).gridLine,
          left: labelAreaWidth,
          backgroundColor: theme.color.text,
        }}
      />
      <Text
        style={{
          ...styles(theme).timeLabel,
          ...theme.textStyle.caption,
          backgroundColor: theme.color.background,
          width: labelAreaWidth,
          top: -10, // Offset to center the text with the grid line
        }}
      >
        {item.dateStr && `${item.dateStr} `}{item.timeStr}
      </Text>
    </View>
  );

  return (
    <View style={styles(theme).container}>
      {timelineData.map(renderGridLine)}
    </View>
  );
};

const styles = (theme: Theme) => {
  return (
    StyleSheet.create({
      container: {
        position: 'relative',
        flex: 1,
      },
      gridContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 1,
      },
      gridLine: {
        position: 'absolute',
        right: 0,
        height: 1,
      },
      timeLabel: {
        position: 'absolute',
        left: 10,
        paddingHorizontal: theme.spacing.xs,
        borderRadius: theme.borderRadius.sm,
      },
      currentIndicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 1,
      },
    })
  )
}

export default TimelineGrid;
