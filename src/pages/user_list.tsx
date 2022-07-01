import React, { useCallback, useMemo, useState } from 'react';
import { RootStackParamList } from '../router';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert } from 'react-native';
import { User } from '../models/User';
import { useQuery, useRealm } from '../models';
import HeaderAddUser from '../components/HeaderAddUser';
import CreateUserModal from '../components/CreateUserModal';
import UserList from '../components/UserList';

type Props = NativeStackScreenProps<RootStackParamList, '/user-list'>;

function UserListPage({ navigation }: Props) {
  const realm = useRealm();
  const result = useQuery(User);
  const users = useMemo(() => result.sorted('createdAt', true), [result]);
  const [showCreateUser, setShowCreateUser] = useState(false);

  const handleAddUser = useCallback(
    (name: string) => {
      if (!name) {
        return;
      }
      try {
        realm.write(() => {
          const users = realm.create('User', User.generate(name));
        });
        Alert.alert(`Success Creating ${name}`);
      } catch (e: any) {
        Alert.alert('Error Creating User', e.message);
      }
    },
    [realm],
  );

  const navigateToRoomChat = (user: User & Realm.Object) => {
    navigation.navigate('/room-chat', { data: user });
  };

  return (
    <>
      <HeaderAddUser
        setShowCreateUser={setShowCreateUser}
      />
      <UserList
        users={users}
        navigateToRoomChat={navigateToRoomChat}
      />
      <CreateUserModal
        showCreateUser={showCreateUser}
        setShowCreateUser={setShowCreateUser}
        handleAddUser={handleAddUser}
      />
    </>
  );
}

export default UserListPage;
