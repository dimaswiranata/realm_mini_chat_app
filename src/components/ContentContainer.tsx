import React from 'react';
import { SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface IContentContainer {
  children: React.ReactNode;
  backgroundColor?: string;
  ref?: any;
}

function ContentContainer({ children, backgroundColor, ref }: IContentContainer) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ flex: 1 }}
        ref={ref}>
        {children}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default ContentContainer;