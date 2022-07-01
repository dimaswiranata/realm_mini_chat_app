import React from 'react';
import { HStack, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface IHeaderAddUser {
  setShowCreateUser: (data: boolean) => void;
}

function HeaderAddUser(props: IHeaderAddUser) {
  const { setShowCreateUser } = props;

  return (
    <HStack
      justifyContent={'space-between'}
      alignItems={'center'}
      px={6}
      py={3}
      bg={'white'}>
      <Text fontSize="2xl" bold>
        Mini Chat
      </Text>
      <TouchableOpacity onPress={() => setShowCreateUser(true)}>
        <MaterialIcons name="add" size={26} color={'#000000'} />
      </TouchableOpacity>
    </HStack>
  );
}

export default HeaderAddUser;
