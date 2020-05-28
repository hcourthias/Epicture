# Epicture

## Getting Started

### Technology used

Our Epitcure is written in Javascript using React-Native to work on mobile platforms. The advantages of using React-Native are that we can target both Android and iOS. Javascript is simpler, more flexible and simply better on small apps which asks for no special performance. Javascript also has many different libraries which can be used to boost development, and are very easy to install and use in a project. Furthermore, we wanted to discover Cross Platform development, as we have a background in native app development.

## Installation

Before cloning the repository and installing the app you will need a few tools.
 - [NodeJS](https://nodejs.org/en/)
 - Expo (```npm install expo-cli --global```)

Once the repository cloned you will need to install the different dependencies using ```npm run ci```.
To build the project we will use the expo build server, this means you will have to login to expo with ```expo login```, you may now build with ```expo build:android``` for building an android app, or ```expo build:ios``` for an iOS app.

If you want to work on the app, you can use ```expo start``` and then choose your prefered emulator to view the app while working.

## Testing

Some elements of the app are unit tested, you can run theses tests with ```npm run test:unit```.

## Architecture

The Development Architecture we use are reusable elements, and separation of view and API logic.

## Evalutation

For the Manual evaluation, we have prepared an Expo account which can be used.
Username: tam-epitcure
Password: qwerty31

Once logged in, you can now access the last [build](https://expo.io/builds/65c66ec0-2162-4e85-87a5-2fd66e2ffbb4). You can also access the [project page](https://expo.io/@tam-epicture/epicture).
