import React, { useState } from 'react'
import { Button, Input } from 'antd'
import CustomModal from '../components/modal/modal'
import TextArea from 'antd/es/input/TextArea'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateImage = () => {


    const navigate = useNavigate();

    const [openModal, setOpenModal] = useState<boolean>(false);

    const [header, setHeader] = useState<string>('');
    const [description, setDescription] = useState<string>('')

    const [file,setFile] = useState<File | Blob | null>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setFile(file);
    }
  };

  const onClose = () => {
    setOpenModal(false);
  }

  const addImage = async () => {

    const formData : any = new FormData();
    formData.append('title',header);
    formData.append('description',description);
    formData.append('file',file);


    try {
      const response = await axios.post('http://localhost:8800/images/addImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if(response.status === 201) {
        setTimeout(() => {
          setOpenModal(false);
          navigate('/')
        }, 2000);
      }
    } catch (error) {
      console.error('Post isteği başarısız:', error);
    }
  }
    
  return (
    <>
      <h1>PCAT</h1>
      <Button onClick={() => setOpenModal(true)} >ADD PHOTO</Button>
      <CustomModal
      title='Add Photo'
      content={
        <>
          <label>Header</label>
          <Input onChange={(e) => setHeader(e.target.value)} />
          <label>Description</label>
          <TextArea onChange={(e) => setDescription(e.target.value)} />
        
          <input type="file" name='file' accept='image/*' onChange={handleFileChange}/>
        </>
      }
      onClose={onClose}
      open={openModal}
      addImage={addImage}
      />
    </>
  )
}

export default CreateImage