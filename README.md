# Buddy Front

## Presentation

This project is the front part of the Buddy App. It's a mobile app developped as the end of year school project.

Local Buddies add experiences (events) they want to share with Nomad Buddies (travellers).

Nomad Buddies can show their interests in participating to experiences.


## Stack

This project is developped with React Native and Expo.

## Requirements

You need a local server. You need expo.

You need to download the Buddy API and launch it:

    symfony serve

    http://127.0.0.1:8000/api


## Launching the front 

### Install all packages 
    
    npm install

    npm install react-native-paper react-native-paper-tabs react-native-pager-view

If you have an issue with versions, you can always run:

    expo doctor --fix-dependencies

### Start the project

    expo start
 
Dev tools will open on:

    localhost:19002

If you run it in the web version, you'll see the app at:

    localhost:19006
