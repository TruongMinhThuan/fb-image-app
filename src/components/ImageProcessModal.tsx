import { DotChartOutlined } from '@ant-design/icons';
import { Flex, Image, Modal, Skeleton, Space, Spin } from 'antd';
import React, { useEffect } from 'react';
import ImageProcessButtons from './ImageProcessButtons';
import useStore from '../store';
import PuzzleImageGame from './PuzzleImageGameModal';
import TextArea from 'antd/es/input/TextArea';

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
    const {
        ai_image,
        getRandomAIImage,
        togglePuzzle,
        selected_ai_image,
        handleTxt2Img
    } = useStore((state) => state);

    const renderAIImage = () => {

        // let images = props.images;

        if (ai_image.length > 0) {
            return ai_image.map((image, index) => {
                return (
                    <Image
                        key={index}
                        src={image}
                        style={{
                            width: '50%',
                            // justifyContent:'center',
                            // alignItems:'center',
                            // alignSelf:'center',
                        }}
                    />
                )
            })
        }
        return <Spin tip="Loading" size="large" />
    }

    const hanleNavigateToPuzzle = () => {
        // navigate('/puzzle-game', { state: { image_url: ai_image[0] } })
        togglePuzzle(true)
    }
    const [value, setValue] = React.useState<string>()

    useEffect(() => {
        setValue(selected_ai_image.stable_diffusion?.prompt)
    }, [selected_ai_image.id])

    const handleTxt2ImgAiImage = () => {
        let model = selected_ai_image.stable_diffusion

        let custom_prompt = "(masterpiece), (extremely intricate:1.3), (realistic)"

        model.prompt = `${value}, ${custom_prompt}`
        model.negative_prompt = "BadDream, (UnrealisticDream:1.3)"
        model.steps = 24
        model.cfg_scale = 2
        model.seed = -1
        model.height = 512
        model.width = 512
        model.batch_size = 1
        handleTxt2Img(model)
    }

    return (
        <>
            <Modal
                centered
                open={props.isOpen}
                // onOk={props.onOk}
                // onCancel={props.onOk}
                closeIcon={true}
                closable={true}
                maskClosable={false}
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
                onCancel={() => {
                    props.setIsOpen(false)
                }}
            >
                <Flex style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
                    {
                        renderAIImage()
                    }
                </Flex>
                <ImageProcessButtons onRefresh={handleTxt2ImgAiImage} onPlayPuzzle={hanleNavigateToPuzzle} />
                <TextArea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Enter prompt here..."
                    autoSize={{ minRows: 3, maxRows: 5 }}
                    className='flex-1 w-0'
                />
            </Modal>
        </>
    );
};

export default ImageProcessModal;