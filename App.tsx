import { NavigationContainer } from "@react-navigation/native";
import { I18nextProvider } from "react-i18next";
import { Provider } from 'react-redux';
import { i18nLocale } from "./assets/localization/i18n/i18nConfig";
import RootStackNavigator from "./src/navigation/RootStackNavigator";
import { ThemeProvider } from "./src/providers/themeContext";
import { store } from "./src/store/reduxStore";


export const App = () => {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <I18nextProvider i18n={i18nLocale}>
          <NavigationContainer>
            <RootStackNavigator />
          </NavigationContainer>
        </I18nextProvider>
      </Provider>
    </ThemeProvider>
  )
}