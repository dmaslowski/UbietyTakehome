import * as React from 'react';
import { ActivityIndicator, SafeAreaView, Text, View, StyleSheet } from 'react-native';
import { useLocalization } from '../../hooks/useLocalization';
import { useTheme } from '../../providers/themeContext';
import PresenceVisualization from '../../components/PresenceVisualization/PresenceVisualization';
import { useGetPresenceDataQuery, useGetProfileDataQuery } from '@/src/services/baseQuery';
import { Theme } from '@/assets/theme/theme';

const HomeScreen = () => {
  const { translate } = useLocalization();
  const { theme } = useTheme();
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

  if (presenceLoading || profilesLoading) {
    return (
      <View style={styles(theme).centeredContainer}>
        <ActivityIndicator size="large" color={theme.color.primary} />
        <Text style={{...theme.textStyle.header}}>
          {translate("HomeScreen.loading")}
        </Text>
      </View>
    );
  }

  if (presenceError || profilesError) {
    return (
      <View style={styles(theme).centeredContainer}>
        <Text style={{ ...theme.textStyle.header }}>
          {translate("HomeScreen.error")}
        </Text>
      </View>
    );
  }

  if (!presenceData || !profilesData) {
    return (
     <View style={styles(theme).centeredContainer}>
        <Text style={{ ...theme.textStyle.header }}>
          {translate("HomeScreen.noData")}
        </Text>
      </View>
    );
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.color.background }}>
      <Text style={{ ...theme.textStyle.header, marginBottom: theme.spacing.md, marginTop: theme.spacing.xl, textAlign: 'center' }}>
        {translate("HomeScreen.title")}
      </Text>
      <PresenceVisualization presenceData={presenceData} profilesData={profilesData}/>
    </SafeAreaView>
  );
}

const styles = (theme: Theme) => {
  return StyleSheet.create({
    centeredContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.color.background,
    }
  })
} 

export default HomeScreen

