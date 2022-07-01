import React, { useRef, useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { Fab, Image, Stack, Text, VStack } from 'native-base';
import { Room } from '../models/Room';
import ContentContainer from './ContentContainer';
import { format } from 'date-fns';
import FeatherIcons from 'react-native-vector-icons/Feather';

interface IChatList {
  roomById: Realm.Results<Room & Realm.Object>;
}

function ChatList(props: IChatList) {
  const { roomById } = props;
  const [showScrollDown, setShowScrollDown] = useState(false);

  const dateFormatted = (date: Date) => {
    return format(date, 'dd MMM, HH:mm');
  };

  const flatList = useRef(null);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Stack>
        <FlatList
          inverted
          data={[...roomById].reverse()}
          ref={flatList}
          onContentSizeChange={() =>
            flatList.current.scrollToOffset({ offset: 0 })
          }
          onScrollBeginDrag={() => setShowScrollDown(true)}
          onScroll={e => {
            if (e.nativeEvent.contentOffset.y < 1) {
              setShowScrollDown(false);
            }
          }}
          renderItem={({ item }) => (
            <VStack p={3}>
              <Stack
                w={'100%'}
                my={2}
                alignItems={item.owner == 'U' ? 'flex-end' : 'flex-start'}>
                <Stack
                  p={3}
                  maxW={'70%'}
                  borderRadius={16}
                  bg={item.owner == 'U' ? 'blue.300' : 'gray.300'}>
                  {item.type == '2' ? (
                    <Image
                      source={{
                        uri: item.message,
                      }}
                      alt="image file"
                      size="2xl"
                      resizeMode={'contain'}
                    />
                  ) : (
                    <Text textAlign={item.owner == 'U' ? 'right' : 'left'}>
                      {item.message}
                    </Text>
                  )}
                  <Text
                    textAlign={item.owner == 'U' ? 'right' : 'left'}
                    bold
                    fontSize={'xs'}
                    mt={1}>
                    {dateFormatted(item.createdAt)}
                  </Text>
                </Stack>
              </Stack>
            </VStack>
          )}
          keyExtractor={item => item._id.toHexString()}
        />
      </Stack>
      <ContentContainer>
        <Stack />
      </ContentContainer>
      {showScrollDown && (
        <Fab
          renderInPortal={false}
          bg={'rgba(52, 52, 52, 0.0)'}
          shadow={-1}
          size="sm"
          bottom={30}
          icon={
            <Stack p={2} bg={'grey'} borderRadius={100}>
              <FeatherIcons name="chevrons-down" size={20} color={'white'} />
            </Stack>
          }
          onPress={() => flatList.current.scrollToOffset({ offset: 0 })}
        />
      )}
    </SafeAreaView>
  );
}

export default ChatList;
