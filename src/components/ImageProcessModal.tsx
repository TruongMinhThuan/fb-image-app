import { DotChartOutlined } from '@ant-design/icons';
import { Flex, Image, Modal, Skeleton, Space, Spin } from 'antd';
import React from 'react';
import ImageProcessButtons from './ImageProcessButtons';

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


    const renderAIImage = () => {

        let images = props.images;

        if (images.length > 0) {
            return images.map((image, index) => {
                return (
                    <Image
                        key={index}
                        src={"data:image/jpeg;base64," + image}
                    />
                )
            })
        }
        return <Spin tip="Loading" size="large" />
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
                <ImageProcessButtons />
            </Modal>
        </>
    );
};

export default ImageProcessModal;