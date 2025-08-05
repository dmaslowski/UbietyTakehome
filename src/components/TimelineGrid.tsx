import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../providers/themeContext';

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
      const lineTime = minTimeFloor + (i * 60 * 60 * 1000); //
      const date = new Date(lineTime);
      const y = timeToY(lineTime);
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
    
    return hours;
  }, [minTimeFloor, currentTimeStamp, timeToY]);

  const renderGridLine = (item: TimelineData) => (
    <View key={`grid-${item.id}`} style={[styles.gridContainer, { top: item.y }]}>
      <View 
        style={[
          styles.gridLine, 
          { 
            left: labelAreaWidth,
            backgroundColor: theme.color.text + '30',
          }
        ]} 
      />
      <Text
        style={[
          styles.timeLabel,
          {
            color: theme.color.text,
            backgroundColor: theme.color.surface,
          }
        ]}
      >
        {item.dateStr && `${item.dateStr} `}{item.timeStr}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {timelineData.map(renderGridLine)}
    </View>
  );
};

const styles = StyleSheet.create({
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
    width: 140,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    fontSize: 10,
    fontWeight: '500',
  },
});

export default TimelineGrid;
