import React from 'react';
import { Button, FormControl, Input, Modal } from 'native-base';
import * as Yup from 'yup';
import { useFormik } from 'formik';

interface ICreateUserModal {
  showCreateUser: boolean;
  setShowCreateUser: (data: boolean) => void;
  handleAddUser: (data: string) => void;
}

function CreateUserModal(props: ICreateUserModal) {
  const { showCreateUser, setShowCreateUser, handleAddUser } = props;

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required!'),
    }),
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      handleAddUser(values.name);
      setShowCreateUser(false);
      resetForm();
    },
  });

  return (
    <Modal
      isOpen={showCreateUser}
      onClose={() => setShowCreateUser(false)}
      avoidKeyboard
      size="lg">
      <Modal.Content width={'90%'}>
        <Modal.CloseButton />
        <Modal.Header>Create New User</Modal.Header>
        <Modal.Body>
          <FormControl
            isInvalid={
              formik.errors.name && formik.touched.name ? true : false
            }>
            <FormControl.Label>Name</FormControl.Label>
            <Input
              height={'50'}
              type={'text'}
              placeholder={'Jhon Doe'}
              onChangeText={formik.handleChange('name')}
              value={formik.values.name}
            />
            <FormControl.ErrorMessage>
              {formik.errors.name}
            </FormControl.ErrorMessage>
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button onPress={() => formik.handleSubmit()}>Save</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

export default CreateUserModal;
