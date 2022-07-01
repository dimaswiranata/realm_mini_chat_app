import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery, useRealm } from '../models';
import { RootStackParamList } from '../router';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Alert } from 'react-native';
import { Room } from '../models/Room';
import UploadImageModal from '../components/UploadImageModal';
import ChatList from '../components/ChatList';
import InputChat from '../components/InputChat';

const includeExtra = true;

type Props = NativeStackScreenProps<RootStackParamList, '/room-chat'>;

function RoomChatPage({ navigation, route }: Props) {
  const params = route.params;
  const realm = useRealm();
  const result = useQuery(Room);
  const allRoom = useMemo(() => result.sorted('createdAt', false), [result]);
  const roomById = allRoom.filtered(`roomId == "${params.data.roomId}"`);
  const [chat, setChat] = useState<string>('');
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    navigation.setOptions({ title: params.data.name });
  }, []);

  const handleAddReply = useCallback(() => {
    try {
      realm.write(() => {
        const server = realm.create(
          'Room',
          Room.generate(
            'Hi, this is auto generated',
            '1',
            'S',
            params.data.roomId,
          ),
        );
      });
    } catch (e: any) {
      Alert.alert('Error Send Message', e.message);
    }
  }, [realm]);

  const handleAddChat = useCallback(
    (message: string) => {
      if (message == undefined || message.length == 0) {
        return;
      }
      setChat('');
      try {
        realm.write(() => {
          const user = realm.create(
            'Room',
            Room.generate(message, '1', 'U', params.data.roomId),
          );
        });
        handleAddReply();
      } catch (e: any) {
        Alert.alert('Error Creating User', e.message);
      }
    },
    [realm],
  );

  const takePicture = useCallback(type => {
    setShowUploadModal(false);
    if (type === 'capture') {
      launchCamera(
        {
          saveToPhotos: true,
          mediaType: 'photo',
          includeBase64: true,
          quality: 1,
          includeExtra,
        },
        response => {
          if (response.didCancel) {
            console.log(response);
          } else if (response.assets) {
            handleAddImage(response.assets[0].uri!);
          }
        },
      );
    } else {
      launchImageLibrary(
        {
          quality: 1,
          selectionLimit: 0,
          mediaType: 'photo',
          includeBase64: true,
          includeExtra,
        },
        response => {
          if (response.didCancel) {
            console.log(response);
          } else if (response.assets) {
            handleAddImage(response.assets[0].uri!);
          }
        },
      );
    }
  }, []);

  const handleAddImage = useCallback(
    (uri: string) => {
      if (uri == undefined || uri.length == 0) {
        return;
      }
      try {
        realm.write(() => {
          const user = realm.create(
            'Room',
            Room.generate(uri, '2', 'U', params.data.roomId),
          );
        });
        handleAddReply();
      } catch (e: any) {
        Alert.alert('Error upload User', e.message);
      }
    },
    [realm],
  );

  return (
    <>
      <ChatList roomById={roomById} />
      <InputChat
        chat={chat}
        setChat={setChat}
        setShowUploadModal={setShowUploadModal}
        handleAddChat={handleAddChat}
      />
      <UploadImageModal
        showUploadModal={showUploadModal}
        setShowUploadModal={setShowUploadModal}
        takePicture={takePicture}
      />
    </>
  );
}

export default RoomChatPage;
