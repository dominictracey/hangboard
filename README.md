## Hangboard

![hangboard](https://github.com/dominictracey/react-native-hangboard/blob/master/images/hb1.png)

Hangboard is the premier mobile app for rockclimbers to manage their fingerboard (hangboard) workouts. All climbers quickly reach a plateau in their abilities where they are
limited by finger strength and a regimen of workouts with a hangboard is the generally accepted way of making gains in this area. [The Rock Climber's Training Manual](https://rockclimberstrainingmanual.com/tools-for-rock-climbing-training/rock-prodigy-training-center/) is the seminal work on the subject and has detailed instructions
on the process.

A core tenet of a successful hangboard program is rigorous record-keeping. Traditionally climbers have used a stopwatch (or stopwatch app like Tabata) and either paper or spreadsheets. This app provides a single interface for planning, executing and analyzing your hangboard journey.

The crucial aspect of executing a hangboard exercise is *adding or removing weight* such that we *train to failure*. Hangboard manages this personal data all within a single
intuitive interface, obviating the need for switching apps on your phone or tablet, or using pen and paper to track changes.

## Status

August 26, 2017 v0.3.2:
- Working, stable versions in App Store (TestFlight only) and Play Store
- Configurable sounds with react-native-sound
- Visual map of trango RP board
- Names of grips congruent with TRCTM (as close as I could grok them)
- 100 or so jest tests

August 1, 2017:
- Basic project structure established using pepperoni-app-kit
- react-native, redux and react-navigation architecture
- AsyncStorage for persisting local data.
- Jest unit testing
- Immutable.js
- Basic stopwatch capability
- Workout phases (warmup, [exercise, rest, recover]..., complete)
- Data model/store shape
  - boards: various manufacturer's hangboards (currently only the Trango Rock Prodigy included)
  - sets: time on/off and recovery profiles (e.g. 10 seconds on, 5 seconds off x 6, 3 minute recovery)
  - programs: includes Rock Prodigy beginner, intermediate and advanced configs
  - workouts: includes user's current weight adjustments for each grip
  - session: current state information for underway workout

## Getting started

```
$ git clone https://github.com/dominictracey/hangboard
$ npm install
$react-native link
```

##### Start the application in iOS simulator
```
$ react-native run-ios
```

##### Start the application in Android simulator
(If using the stock emulator, the emulator must be running)
```
$ react-native run-android
```

##### Run unit tests
*current issue with react-native-sound (8/27/17)
```
$ npm test
```

##### Run tests every time code changes
```
$ npm run test:watch
```

##### Generate code coverage report
```
$ npm run coverage
```

Read the **[Testing guide](docs/TESTING.md)** for more information about writing tests.

## Debugging

For standard debugging select *Debug JS Remotely* from the React Native Development context menu (To open the context menu, press *CMD+D* in iOS or *D+D* in Android). This will open a new Chrome tab under [http://localhost:8081/debugger-ui](http://localhost:8081/debugger-ui) and prints all actions to the console.

For advanced debugging under **macOS** we suggest using the standalone [React Native Debugger](https://github.com/jhen0409/react-native-debugger), which is based on the official debugger of React Native.
It includes the React Inspector and Redux DevTools so you can inspect React views and get a detailed history of the Redux state.

You can install it via [brew](https://brew.sh/) and run it as a standalone app:
```
$ brew update && brew cask install react-native-debugger
```
> Note: Make sure you close all active chrome debugger tabs and then restart the debugger from the React Native Development context menu.

## Deployment

Read the **[Deployment guide](docs/DEPLOYMENT.md)** to learn how to deploy the application to test devices, app stores, and how to use Code Push to push updates to your users immediately.

## Contributing

If you find any problems, please [open an issue](https://github.com/futurice/pepperoni-app-kit/issues/new) or submit a fix as a pull request.

We welcome new features, but for large changes let's discuss first to make sure the changes can be accepted and integrated smoothly.

## License

[MIT License](LICENSE)

## Credits

This project was initially motivated by [Snowflake](https://github.com/bartonhammond/snowflake), a React Native boilerplate by Barton Hammond. It shares some features and design principles for Pepperoni, but it wasn't the right fit for our needs. At this time Snowflake is more mature, so if you like Pepperoni but didn't agree with something we are doing, you should check it out to see if it's a good fit for your app.
