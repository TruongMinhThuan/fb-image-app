import { DotChartOutlined } from '@ant-design/icons';
import { Flex, Image, Modal, Skeleton, Space, Spin } from 'antd';
import React from 'react';
import ImageProcessButtons from './ImageProcessButtons';
import useStore from '../store';

interface ModalProps {
    title?: string;
    centered?: boolean;
    isOpen?: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onOk?: () => void;
    onCancel?: () => void;
    width?: number;
    images: string[];
    onRefresh?: () => void;
}

const ImageProcessModal: React.FC<ModalProps> = (props) => {
    // const [open, setOpen] = useState(false);
    const { ai_image, handleTxt2Img } = useStore((state) => state);

    const renderAIImage = () => {

        // let images = props.images;

        if (ai_image.length > 0) {
            return ai_image.map((image, index) => {
                return (
                    <Image
                        key={index}
                        src={image}
                    />
                )
            })
        }
        return <Spin tip="Loading" size="large" />
    }

    const refreshImage = () => {

    }

    return (
        <>
            <Modal
                centered
                open={props.isOpen}
                onOk={props.onOk}
                onCancel={props.onOk}
                closeIcon={false}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                okButtonProps={{
                    style: {
                        display: 'none',
                    },
                }}
                cancelButtonProps={{
                    style: {
                        display: 'none',
                    },
                }}
            >
                <Flex gap="small" style={{ justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
                    {
                        renderAIImage()
                    }
                </Flex>
                <ImageProcessButtons onRefresh={handleTxt2Img} />
            </Modal>
        </>
    );
};

export default ImageProcessModal;