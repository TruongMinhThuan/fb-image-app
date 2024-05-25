import React, { useState } from 'react';
import { Layout, Menu, Card, Row, Col, Avatar, Flex } from 'antd';
import {
  FireOutlined,
  UserOutlined,
  SettingOutlined
} from '@ant-design/icons';
import ImageProcessModal from '../../components/ImageProcessModal';
import { api } from '../../api';
import useStore from '../../store';
import { TRENDING_DATA } from '../../dummy'
import { useEffect } from 'react';
import { FBMediaAI } from '../../types/fbmedia_type';
import PuzzleImageGame from '../../components/PuzzleImageGameModal';

const { Header, Content } = Layout;

const newHotData = [
  { src: 'https://snafty-manga-dev.s3.ap-northeast-1.amazonaws.com/text-to-img/d8e967a3-542c-47af-8cf2-93926c31d564-2024-02-20_08-19-26_image.jpg', title: 'Proud Princess' },
  { src: 'https://snafty-manga-dev.s3.ap-northeast-1.amazonaws.com/text-to-img/d8e967a3-542c-47af-8cf2-93926c31d564-2024-02-20_08-19-26_image.jpg', views: 'Hot', label: 'Bánh mì mua 1 tặng 1' },
  { src: 'https://snafty-manga-dev.s3.ap-northeast-1.amazonaws.com/text-to-img/d8e967a3-542c-47af-8cf2-93926c31d564-2024-02-20_08-19-26_image.jpg', views: 'Hot' }
];

const HomePage = () => {
  const [isImageProcessModalOpen, setIsImageProcessModalOpen] = useState(false);
  const {
    handleTxt2Img,
    is_processing_image,
    fbmedias,
    is_puzzle_open,
    getFBMediaList,
    ai_image,
    setSelectedAiImage
  } = useStore((state) => state);
  const onClickImageProcess = (item: FBMediaAI) => {
    setIsImageProcessModalOpen(true)
    handleTxt2Img(item)
    setSelectedAiImage(item)
  }

  const [processImage, setProcessImage] = useState<string[]>([]);


  const onCloseProcessModal = () => {
    setIsImageProcessModalOpen(false);
    setProcessImage([])
  }

  useEffect(() => {
    getFBMediaList()
  }, [])

  return (
    <Layout>
      <Content style={{ marginTop: '16px' }}>
        <ImageProcessModal
          isOpen={isImageProcessModalOpen}
          setIsOpen={setIsImageProcessModalOpen}
          images={processImage}
          onOk={onCloseProcessModal}
        />
        <PuzzleImageGame
          image_url={ai_image[0]}
          is_open={is_puzzle_open}
        />
        <Flex wrap >
          <Card >
            <Row gutter={[2, 2]}>
              {fbmedias.map((item, index) => (
                <Col key={index} span={8}  >
                  <div

                    onClick={() => onClickImageProcess(item)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img
                      alt={`trending ${index}`}
                      src={item.image_url}
                      style={{
                        objectFit: 'cover',
                        height: '150px',
                        width: '100%',
                      }}
                    />
                    <span style={{ color: 'gray' }}>{item.title}</span>
                  </div>
                </Col>
              ))}
            </Row>
          </Card>
        </Flex>
        {/* <Col span={24}>
            <Card title="New">
              <Row gutter={[16, 16]}>
                {newHotData.map((item, index) => (
                  <Col key={index} span={8}>
                    <Card
                      cover={<img alt={`new ${index}`} src={item.src} />}
                    >
                      <Card.Meta
                        title={item.title || `Views: ${item.views}`}
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col> */}
      </Content>
    </Layout>
  );
};

export default HomePage;
