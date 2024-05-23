import React, { useState } from 'react';
import { Layout, Menu, Card, Row, Col, Avatar } from 'antd';
import {
  FireOutlined,
  UserOutlined,
  SettingOutlined
} from '@ant-design/icons';
import ImageProcessModal from '../../components/ImageProcessModal';
import { api } from '../../api';

const { Header, Content } = Layout;

const trendingData = [
  {
    title: 'Trending #1 Weekly',
    items: [
      {
        src: 'https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/9b64fd01-a4c5-4ecb-8c8f-cc8167a5c0bb/width=1176,quality=90/26072078-5775692-Portrait%20photo%20of%20muscular%20bearded%20guy%20in%20a%20worn%20mech%20suit,%20((light%20bokeh)),%20intricate,%20(steel%20metal%20[rust]),%20elegant,%20sharp%20foc.jpeg',
        views: 1500,
        prompt: "Portrait photo of muscular bearded guy in a worn mech suit, ((light bokeh)), intricate, (steel metal [rust]), elegant, sharp focus, photo by greg rutkowski, soft lighting, vibrant colors, (masterpiece), ((streets)), (detailed face:1.2), (glowing blue eyes:1.1) <lora:FilmVelvia3:0.4>  <lora:more_details:0.6>",
        negative_prompt: "BadDream, ( UnrealisticDream:1.3)",
      },
      {
        src: 'https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/bfeca0a1-2311-4e2c-bf09-98f6d135c41f/width=1024,quality=90/26072164-1547547180-(8k,%20best%20quality,%20masterpiece_1.2),(best%20quality_1.0),%20(ultra%20highres_1.0),%20watercolor,%20a%20beautiful%20woman,%20shoulder,%20hair%20ribbo.jpeg',
        views: 1500,
        prompt: "(8k, best quality, masterpiece:1.2),(best quality:1.0), (ultra highres:1.0), watercolor, a beautiful woman, shoulder, hair ribbons, by agnes cecile, half body portrait, extremely luminous bright design, pastel colors, (ink:1.3), autumn lights",
        negative_prompt: "BadDream",
      },
      // {
      //   src: 'https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/952fdd5b-ee81-41cd-bce7-3403303ebcbe/width=1544,quality=90/26072347-3944324357-portrait,%20action%20pose,%20slow%20motion,%20(old%20male%20human%20wizard_1.2)%20old%20male%20human%20wizard%20wearing%20yellow%20and%20black%20robes%20(majestic%20e.jpeg',
      //   views: 1500,
      //   prompt: "portrait, action pose, slow motion, (old male human wizard:1.2) old male human wizard wearing yellow and black robes (majestic evoker cloth armor:1.2), (wrinkles, steampunk), (archmage robes, runic patterns:1.2), (insanely detailed, bloom:1.5), (analog:1.2), (high sharpness), (detailed pupils:1.1), (painting:1.1), (digital painting:1), detailed face and eyes, Masterpiece, best quality, (highly detailed photo:1.1), 8k, photorealistic, very long straight white and grey hair, grey streaks, ecstatic, (60-year old Austrian male:1.1), sharp, (older body:1.1), stocky, realistic, real shadow 3d, (highest quality), (concept art, 4k), (wizard labratory in backgound:1.2), by Michelangelo and Alessandro Casagrande and Greg Rutkowski and Sally Mann and jeremy mann and sandra chevrier and maciej kuciara, inspired by (arnold schwarzenegger:1.001) and (Dolph Lundgren:1.001) and (Albert Einstien:1.001)",
      //   negative_prompt: "BadDream, ( UnrealisticDream:1.3)",
      // },
      {
        src: 'https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/33960d5b-c779-4837-941c-bc41f176f0b8/width=1024,quality=90/26072334-3889919804-fashion%20photography%20portrait%20of%20indian%20girl%20with%20blue%20hair,%20in%20lush%20jungle%20with%20flowers,%203d%20render,%20cgi,%20symetrical,%20octane%20rend.jpeg',
        views: 1500,
        prompt: "fashion photography portrait of indian girl with blue hair, in lush jungle with flowers, 3d render, cgi, symetrical, octane render, 35mm, bokeh, 9:16, (intricate details:1.12), hdr, (intricate details, hyperdetailed:1.15), (natural skin texture, hyperrealism, soft light, sharp:1.2), detailed, sunlight passing through foliage, india",
        negative_prompt: "BadDream, ( UnrealisticDream:1.3)",
      },
    ]
  }
];

const newHotData = [
  { src: 'https://snafty-manga-dev.s3.ap-northeast-1.amazonaws.com/text-to-img/d8e967a3-542c-47af-8cf2-93926c31d564-2024-02-20_08-19-26_image.jpg', title: 'Proud Princess' },
  { src: 'https://snafty-manga-dev.s3.ap-northeast-1.amazonaws.com/text-to-img/d8e967a3-542c-47af-8cf2-93926c31d564-2024-02-20_08-19-26_image.jpg', views: 'Hot', label: 'Bánh mì mua 1 tặng 1' },
  { src: 'https://snafty-manga-dev.s3.ap-northeast-1.amazonaws.com/text-to-img/d8e967a3-542c-47af-8cf2-93926c31d564-2024-02-20_08-19-26_image.jpg', views: 'Hot' }
];

const HomePage = () => {
  const [isImageProcessModalOpen, setIsImageProcessModalOpen] = useState(false);
  const onClickImageProcess = (item: any) => {
    console.log('click');
    setIsImageProcessModalOpen(true);
    handleAIImageProcess(item);
  }

  const [processImage, setProcessImage] = useState([]);

  const handleAIImageProcess = async (item: any) => {
    try {
      let txt2imgRequest = {
        "prompt": item.prompt,
        "negative_prompt": item.negative_prompt,
        "steps": 30,
        "cfg_scale": 7,
        "width": 512,
        "height": 512,

      }
      let res = await api.post('/sdapi/v1/txt2img', txt2imgRequest)
      console.log(res.data);
      setProcessImage(res.data["images"]);
      return res.data;
    } catch (error) {
      console.log(error);

    }
  }

  const onCloseProcessModal = () => {
    setIsImageProcessModalOpen(false);
    setProcessImage([])
  }

  return (
    <Layout>
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Avatar size="large" icon={<UserOutlined />} />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1" icon={<FireOutlined />}>Hot</Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>Profile</Menu.Item>
          <Menu.Item key="3" icon={<SettingOutlined />}>Settings</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ marginTop: '16px' }}>
        <ImageProcessModal
          isOpen={isImageProcessModalOpen}
          setIsOpen={setIsImageProcessModalOpen}
          images={processImage}
          onOk={onCloseProcessModal}
        />
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card title="Trending">
              <Row gutter={[16, 16]}>
                {trendingData[0].items.map((item, index) => (
                  <Col key={index} span={8} >
                    <Card
                      cover={<img alt={`trending ${index}`} src={item.src} style={{
                        objectFit:'cover',
                        height: '250px',
                      }} />}
                      onClick={() => onClickImageProcess(item)}
                    >
                      <Card.Meta
                        // title={`Views: ${item.views}`}
                        description={trendingData[0].title}
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>
          <Col span={24}>
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
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default HomePage;
