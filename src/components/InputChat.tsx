import { HStack, Stack, TextArea } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';

interface IInputChat {
  chat: string;
  setChat: (data: string) => void;
  setShowUploadModal: (data: boolean) => void;
  handleAddChat: (data: string) => void;
}

function InputChat(props: IInputChat) {
  const { chat, setChat, setShowUploadModal, handleAddChat } = props;
  return (
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
  );
}

export default InputChat;
