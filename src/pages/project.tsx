import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useQuery, useRealm } from '../models';
import { RootStackParamList } from '../router';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ContentContainer from '../components/ContentContainer';
import {
  Button,
  HStack,
  Image,
  Modal,
  Stack,
  Text,
  TextArea,
  VStack,
} from 'native-base';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Alert, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import { Room } from '../models/Room';

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
  const messageEndRef = useRef(null);

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

  const dateFormatted = (date: Date) => {
    return format(date, 'dd MMM, HH:mm');
  };

  return (
    <>
      <ContentContainer backgroundColor="white">
        <VStack p={3}>
          {roomById.map(room => (
            <Stack
              key={room._id.toHexString()}
              w={'100%'}
              my={2}
              alignItems={room.owner == 'U' ? 'flex-end' : 'flex-start'}>
              <Stack
                p={3}
                maxW={'70%'}
                borderRadius={16}
                bg={room.owner == 'U' ? 'blue.300' : 'gray.300'}>
                {room.type == '2' ? (
                  <Image
                    source={{
                      uri: room.message,
                    }}
                    alt="image file"
                    size="2xl"
                    resizeMode={"contain"}
                  />
                ) : (
                  <Text textAlign={room.owner == 'U' ? 'right' : 'left'}>
                    {room.message}
                  </Text>
                )}
                <Text
                  textAlign={room.owner == 'U' ? 'right' : 'left'}
                  bold
                  fontSize={'xs'}
                  mt={1}>
                  {dateFormatted(room.createdAt)}
                </Text>
              </Stack>
            </Stack>
          ))}
        </VStack>
      </ContentContainer>
      <HStack
        p={3}
        bg={'white'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <TextArea
          w={'80%'}
          px={5}
          alignContent={'center'}
          h={'100%'}
          numberOfLines={4}
          type={'text'}
          borderRadius={100}
          borderWidth={0}
          bgColor={'#E5E4E2'}
          placeholder={'Type text here...'}
          onChangeText={value => setChat(value)}
          value={chat}
          textAlignVertical={'center'}
          fontSize={16}
          autoCompleteType={undefined}
          rightElement={
            <TouchableOpacity onPress={() => setShowUploadModal(true)}>
              <Stack px={4}>
                <EntypoIcon name="image-inverted" size={24} color={'#808080'} />
              </Stack>
            </TouchableOpacity>
          }
        />
        <TouchableOpacity onPress={() => handleAddChat(chat)}>
          <Stack
            p={3}
            bg={'blue.500'}
            borderRadius={100}
            justifyContent={'center'}>
            <Ionicons name="send" size={24} color={'white'} />
          </Stack>
        </TouchableOpacity>
      </HStack>
      <Stack ref={messageEndRef} />
      {/* Pick Photo Modal */}
      <Modal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Upload File</Modal.Header>
          <Modal.Body>
            <VStack space={4}>
              <Button onPress={() => takePicture('capture')}>
                Take a Picture
              </Button>
              <Button onPress={() => takePicture('library')}>Pick Image</Button>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
}

export default RoomChatPage;
