import React, { useState } from 'react';
import { Alert, Button, Image, Modal, Skeleton, Spin } from 'antd';

interface ModalProps {
    title?: string;
    centered?: boolean;
    isOpen?: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onOk?: () => void;
    onCancel?: () => void;
    width?: number;
    images: string[];
}

const ImageProcessModal: React.FC<ModalProps> = (props) => {
    // const [open, setOpen] = useState(false);


    return (
        <>
            <Modal
                centered
                open={props.isOpen}
                onOk={props.onOk}
            // onCancel={() => props.setIsOpen(false)}
            >
                <div style={{justifyContent:'center',alignItems:'center'}} >
                    {
                        props.images?.length > 0 ?
                            <Image
                                // width={200}
                                src={"data:image/jpeg;base64," + props.images[0]}
                            /> :
                            <Skeleton.Avatar
                                active={true}
                                size={'large'}
                                shape={'square'}
                                style={{ minWidth: 200, minHeight: 200 }}
                            />


                    }


                </div>
            </Modal>
        </>
    );
};

export default ImageProcessModal;