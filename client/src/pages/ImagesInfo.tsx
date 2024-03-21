import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Input } from 'antd';
import CustomModal from '../components/modal/modal';
import TextArea from 'antd/es/input/TextArea';


interface imageAllData {
  _id: number,
  title: String,
  description: String,
  image: String
}

const ImagesInfo = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState<imageAllData>();

  const [header, setHeader] = useState<string>('');
  const [description, setDescription] = useState<string>('')

  const [file,setFile] = useState<File | Blob | null>();

  const [updateModal, setUpdateModal] = useState<boolean>(false);

  const deleteImage = async () => {
    const response = await axios.get(`http://localhost:8800/images/deleteImage/${id}`);
    if (response.status === 200) {
      setTimeout(() => {
        navigate('/')
      }, 2000);
    }
  }

  const updateImage = async () => {
    const formData : any = new FormData();
    formData.append('title',header);
    formData.append('description',description);
    formData.append('file',file);

    try {
      const response = await axios.post(`http://localhost:8800/images/updateImage/${id}`,formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setTimeout(() => {
        navigate('/')
      }, 2000);
    } catch (error) {
      console.log(error);
      
    }

   
  }

  const onClose = () => {
    setUpdateModal(false);
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setFile(file);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:8800/images/getImage/${id}`);
      setData(response.data);
    }
    fetchData();
  }, [id])

  return (
    <>

      {
        data && (
          <>
            <div>
              <h2>{data?.title}</h2>
              <Button type='primary' onClick={deleteImage}>Delete</Button>
              <Button onClick={() => setUpdateModal(true)}>Update</Button>
            </div>
            <img alt="images" src={require(`../images/${data?.image}`)} />
            <p> {data?.description} </p>
          </>
        )
      }

      {
        updateModal && (
          <CustomModal
          open={updateModal}
          addImage={updateImage}
          onClose={onClose}
          content={
            <>
              <label>Header</label>
              <Input onChange={(e) => setHeader(e.target.value)} />
              <label>Description</label>
              <TextArea onChange={(e) => setDescription(e.target.value)} />
            
              <input type="file" name='file' accept='image/*' onChange={handleFileChange}/>
            </>
          }
          title='Updata Modal'
          />
        )
      }

    </>
  )
}

export default ImagesInfo