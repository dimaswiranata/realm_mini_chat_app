import React from 'react';
import { NativeBaseProvider } from 'native-base';
import Router from './src/router';
import { RealmProvider } from "./src/models/index";
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

export default function App() {
  if (!RealmProvider) {
    return null;
  }
  return (
    <RealmProvider>
      <NativeBaseProvider>
        <Router />
      </NativeBaseProvider>
    </RealmProvider>
  );
}