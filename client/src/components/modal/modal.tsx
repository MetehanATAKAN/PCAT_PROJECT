import React, { useState } from 'react';
import { Modal, Button } from 'antd';

interface Props {
  onClose: () => void;
  title: string;
  content: React.ReactNode;
  open:boolean;
  addImage:() => void;
}

const CustomModal: React.FC<Props> = ({ onClose, title, content,open,addImage }) => {
  return (
    <Modal
      title={title}
      open={open}
      onCancel={onClose}
      footer={[
        <>
        <Button key="back" onClick={onClose}>
          Close
        </Button>
        <Button type='primary' onClick={addImage}>
          Addd
        </Button>
        </>
      ]}
    >
      {content}
    </Modal>
  );
};

export default CustomModal;
