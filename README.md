# Welcome to Prsnce 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).
Make sure you have node instealled before trying to run npm install.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```   

You can also run 
   ```bash
    npm run ios
   ```
or
   ```bash
    npm run android
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

### Decision Document

First the most important decision I needed to make was what to name the application. Like any good startup I took a word and removed all the vowels to come up with the trendy looking 'Prsnce'.



## Expo (Managed or Bare?)
- When developing this project, the first decision I made was to use Expo as one of the base packages to help set up my react native project. If this were a production product, this would be one of the first decisions to agree upon with the team, and then we'd need to decide if we want to be a bare or managed expo project. Expo is one of the largest packages used with React Native, and by being managed, we get access to some powerful features like EAS services, which aid in build pipelines and allow us to do over-the-air updates. Since this project for the take-home isn't asking me to use any native modules, staying managed made the most sense to me, as we can always eject later.
## Navigation (Expo Router or React Native Navigation)
- The next decision I had to make was which navigation package to go with. Currently, I would say there are two major react native navigation frameworks: Expo Router and React Native Navigation(RNN). Expo Router, while built on top of RNN, handles navigation closer to how one might expect coming from a React web world. While it can simplify a lot of things, my personal preference is RNN, which is closer to navigation architecture and patterns in the mobile world. Expo Router requires you to lay out your project in a very specific way since it utilizes path route-based navigation patterns, and I like the freedom RNN gives you to lay out the project how you want. It can be a bit more complex to set up in a very advanced project, but a two-page application like this, and with my experience, it felt like the right choice.
## Localization/Theming Packages (Homebrewed)
- Next, I created a hook and some very lightweight context providers that I have utilized in past projects. The `useLocalization.tsx` hook and the `themeContext.tsx`. These are some simple, lightweight packages that I have developed to support reading strings from an i18n en.json file that allows the app to avoid hardcoded copy strings and, if the need ever arises in the future, to localize the application into different languages while enabling me to avoid hard-coded strings in the sample project. I also brought in a fundamental theming setup that mimics what one might expect with a real design system in a production project. Using tokens and different values for spacing, borders, and colors. Since this is just a take-home, I didn't go the extra step of tokenizing my color palette like one might expect in a design system; instead hard-coding the light/dark-mode colors directly in the theme files, but that would be a future improvement done with a designer for sure.
## Store, Service Layer (RTK)
- While I don't think RTK(Redux Toolkit) is the right choice in all cases, in fact I have decided to not use it for a few of the projects I've architected I decided to use it here to show familiarity with what is one of the popular and advanced tools for state management in the React Native world. It also allows me to mock the api calls easily from the two .json sources and showcase clean architecture in terms of data state storage. RTK is a powerful tool that allow the app to utilize better front end architecture with it's Query hooks, and while for this I could have easily use react query to read the data since I'm not storing any local state I imagined that this type application in the future given how complex this application could be would be a good fit for RTK.

- While it's possible that the presence data and the profiles data could be coming from different base urls in production I made the assumption that they were both under the same base URL which following RTK recommendations means you place them all in a single file if you can.

- I also made the decision to presist the data between sessions. RTK will cache any query data per session, but I thought it be a good UX to cache the data between sessions so we can show it, but then when the app relaunches we will fetch it again. This allows us to show the old data while the new data is incoming which is a better more seemless expereince.

## Testing (Jest)
- I didn't do anything crazy with my test choice going with Jest. Unit testing is important and I wanted to show consideration for it. I wrote a few sample tests to cover some things in the Presence Visualization I considered worthy of testing but left a lot untested. If this was a production product I would have made sure to have coverage for like the localization, navigation, service, and store layers. 

## The Visualization of the Data
Truthfully, I got bogged down in the weeds of the frontend here more than I'd have liked to. Originally, I had plans to add multiple days for each possible day and display the data for each day, along with an 'All View' in the end. In the service of time, I ended up just grouping the data by three profiles at a time and allowing the user to cycle through them. The timeline will update so that the data representation starts at the earliest time, and I added a button so that a user can quickly scroll down. I also made the avatars show red for absent and blue for present, but ultimately, there is a lot I left on the table in terms of making a great UX.

I believe this can easily be extended to show the data properly for each time, given a day selection of some sort, but I cut it from the scope. The reason I cut it from the scope was that the data visualization of it all took me much longer than I expected. I looked to see if there was an NPM package that could display this data closer to what I was looking for, but I was unable to find anything. So, deciding to make my element, I immediately ran into issues trying to use flexbox. Regrettably, I ended up going with absolute value calculation. I know it accomplished the task, but I value it and can make things a bit fragile, and would like it if this were a production application to try again with flexbox and a more dynamic layout. 

I didn't want to spend too much more time after getting unstuck from this, so I also ended up cutting the idea to have a 'profile' page where a user could click into an avatar image and see a specific user's status and timeline. That is something with more time I'd like to add.- Lastly, after finally getting unstuck and getting my layout to calculate properly, I was well past the couple of hours I wanted to spend on this, so I didn't have a chance to add accessibility to the application in a more tangible way. I have some text that is too small, and I didn't do any contrast testing, or accesibility labes. That is something I'd also like to follow up on in the future.

I also created a few utility functions to support my layout, which I think probably could be cleaned up and reformatted.

In the end, I am happy with this solution. I think it accomplishes the aims of the original mock and the task, but wish I could have solved this problem using fewer magic numbers and absolutes views to get the layout working correctly. 