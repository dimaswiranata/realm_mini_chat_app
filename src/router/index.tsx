import React from 'react';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserListPage from '../pages/user_list';
import RoomChatPage from '../pages/room_chat';
import { User } from '../models/User';

export type RootStackParamList = {
  '/user-list': undefined;
  '/room-chat': { data: User & Realm.Object };
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

const Router = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator
        initialRouteName="/user-list"
        screenOptions={{ headerShown: false }}
        defaultScreenOptions={{ headerShown: false }}>
        <RootStack.Screen name="/user-list" component={UserListPage} />
        <RootStack.Screen
          name="/room-chat"
          component={RoomChatPage}
          options={{
            title: "test",
            headerShadowVisible: false,
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20
            },
            headerShown: true,
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
