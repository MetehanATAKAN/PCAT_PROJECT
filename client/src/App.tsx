import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;


type imageAllData = {
  _id:number,
  title: String,
  description: String,
  image: String
}

const App: React.FC = () => {


  const [allData, setAllData] = useState<imageAllData[]>([]);

  

  const getAllImages = async () => {
    try {
      const response = await axios.get('http://localhost:8800/images/getAllImages');
      const result = await response.data;
      setAllData(result);
    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    getAllImages();
  }, [])


  return (
    <div className="App">
      <div>PCAT</div>
      <Link to={'/create-image'}>create image</Link>
      <div className='images-info'>
      {
          allData.map((item,index) =>(
           <Link to={`${item._id}`}>
            <Card
            hoverable
            cover={<img alt="images" src={require(`./images/${item.image}`)} />}
          >
            <Meta title={item.title} description={item.description} />
          </Card>
           </Link>
          ))
        }
      </div>
     
      {/* <div className='images-info'>
        {
          allData?.map((item, index) => (
            <div className="card" key={index}>
             <div className='image'><img alt={'test'} src={require(`./images/${item.image}`)} width={'250px'} height={'250px'}/></div> 
              <div className="container">
                <h4><b>{item.title}</b></h4>
                <p>{item.description}</p>
              </div>
            </div>

          ))
        }
      </div> */}
    </div>
  );
}

export default App;
