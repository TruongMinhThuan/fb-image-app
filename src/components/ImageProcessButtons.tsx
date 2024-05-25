import React, { useState } from 'react';
import { DownloadOutlined, FacebookFilled, PlayCircleOutlined, RedoOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Radio } from 'antd';
import type { ConfigProviderProps } from 'antd';
import useStore from '../store';

type SizeType = ConfigProviderProps['componentSize'];

interface ImageProcessButtonsProps {
  size?: SizeType;
  onRefresh?: () => void;
  onShare?: () => void;
  onDownload?: () => void;
  onPlayPuzzle?: () => void;
}

const ImageProcessButtons: React.FC<ImageProcessButtonsProps> = (props) => {
  const [size, setSize] = useState<SizeType>('middle'); // default is 'middle'

  const { setAiImage } = useStore((state) => state);


  return (
    <Flex gap={2} style={{ margin: 6 }}>
      <Button onClick={props.onRefresh} style={{ flex: 1 }} type="primary" icon={<RedoOutlined />} size={size}>
      </Button>
      <Button onClick={props.onShare} style={{ flex: 1 }} type="primary" icon={<FacebookFilled />} size={size}>
      </Button>
      <Button onClick={props.onDownload} style={{ flex: 1 }} type="primary" icon={<DownloadOutlined />} size={size} />
      <Button onClick={props.onPlayPuzzle} style={{ flex: 1 }} type="primary" icon={<PlayCircleOutlined />} size={size}>
      </Button>
    </Flex>
  );
};

export default ImageProcessButtons;