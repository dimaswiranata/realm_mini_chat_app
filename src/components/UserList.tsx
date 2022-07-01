import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Avatar, HStack, Text } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { User } from '../models/User';
import ContentContainer from './ContentContainer';

interface IUserList {
  users: Realm.Results<User & Realm.Object>;
  navigateToRoomChat: (data: User & Realm.Object) => void;
}

function UserList(props: IUserList) {
  const { users, navigateToRoomChat } = props;

  const getInitials = (name: string) => {
    return name
      .match(/(^\S\S?|\b\S)?/g)!
      .join('')
      .match(/(^\S|\S$)?/g)!
      .join('')
      .toUpperCase();
  };

  return (
    <ContentContainer backgroundColor="white">
      {users.map(user => (
        <TouchableOpacity
          key={user.roomId}
          onPress={() => navigateToRoomChat(user)}>
          <HStack
            justifyContent={'space-between'}
            alignItems={'center'}
            px={6}
            py={3}>
            <HStack alignItems={'center'}>
              <Avatar bg={`#${user.bgAvatar}`}>
                {getInitials(user.name)}
              </Avatar>
              <Text fontSize={'lg'} bold ml={4} w={'70%'} numberOfLines={1}>
                {user.name}
              </Text>
            </HStack>
            <MaterialIcons
              name="arrow-forward-ios"
              size={16}
              color={'gray'}
            />
          </HStack>
        </TouchableOpacity>
      ))}
    </ContentContainer>
  );
}

export default UserList;