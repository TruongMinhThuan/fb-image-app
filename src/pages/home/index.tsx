import React from 'react';
import { Layout, Menu, Card, Row, Col, Avatar } from 'antd';
import {
  FireOutlined,
  UserOutlined,
  SettingOutlined
} from '@ant-design/icons';

const { Header, Content } = Layout;

const trendingData = [
    {
        title: 'Trending #1 Weekly',
        items: [
            { src: 'https://snafty-manga-dev.s3.ap-northeast-1.amazonaws.com/text-to-img/d8e967a3-542c-47af-8cf2-93926c31d564-2024-02-20_08-19-26_image.jpg', views: 1500 },
            { src: 'https://snafty-manga-dev.s3.ap-northeast-1.amazonaws.com/text-to-img/d8e967a3-542c-47af-8cf2-93926c31d564-2024-02-20_08-19-26_image.jpg', views: 1300 },
            { src: 'https://snafty-manga-dev.s3.ap-northeast-1.amazonaws.com/text-to-img/d8e967a3-542c-47af-8cf2-93926c31d564-2024-02-20_08-19-26_image.jpg', views: 1100 }
        ]
    }
];

const newHotData = [
  { src: 'https://snafty-manga-dev.s3.ap-northeast-1.amazonaws.com/text-to-img/d8e967a3-542c-47af-8cf2-93926c31d564-2024-02-20_08-19-26_image.jpg', title: 'Proud Princess' },
  { src: 'https://snafty-manga-dev.s3.ap-northeast-1.amazonaws.com/text-to-img/d8e967a3-542c-47af-8cf2-93926c31d564-2024-02-20_08-19-26_image.jpg', views: 'Hot', label: 'Bánh mì mua 1 tặng 1' },
  { src: 'https://snafty-manga-dev.s3.ap-northeast-1.amazonaws.com/text-to-img/d8e967a3-542c-47af-8cf2-93926c31d564-2024-02-20_08-19-26_image.jpg', views: 'Hot' }
];

const HomePage = () => {
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
      <Content style={{  marginTop: '16px' }}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card title="Trending">
              <Row gutter={[16, 16]}>
                {trendingData[0].items.map((item, index) => (
                  <Col key={index} span={8}>
                    <Card
                      cover={<img alt={`trending ${index}`} src={item.src} />}
                    >
                        <Avatar size="small" icon={<FireOutlined />} src={item.src} />
                      <Card.Meta
                        title={`Views: ${item.views}`}
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
