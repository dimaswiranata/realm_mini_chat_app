import React from 'react';
import { Button, Modal, VStack } from 'native-base';

interface IUploadImageModal {
  showUploadModal: boolean;
  setShowUploadModal: (data: boolean) => void;
  takePicture: (data: string) => void;
}

function UploadImageModal(props: IUploadImageModal) {
  const { showUploadModal, setShowUploadModal, takePicture } = props;

  return (
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
  );
}

export default UploadImageModal;
