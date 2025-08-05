import * as React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { useLocalization } from '../../hooks/useLocalization';
import { useTheme } from '../../providers/themeContext';
import PresenceVisualization from '../Presence/PresenceVisualization';

const HomeScreen = () => {
  const { translate } = useLocalization();
  const { theme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.color.background }}>
      <Text style={{ ...theme.textStyle.header, marginBottom: theme.spacing.md, marginTop: theme.spacing.xl, textAlign: 'center' }}>
        {translate("HomeScreen.title")}
      </Text>
      <PresenceVisualization />
    </SafeAreaView>
  );
}

export default HomeScreen

