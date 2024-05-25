import { Image, Space } from 'antd';
import React from 'react'

// const IMAGE_URL = "https://upload.wikimedia.org/wikipedia/commons/6/63/Icon_Bird_512x512.png";

interface SquareProps {
    num: number;
    handleClick: () => void;
    image_url: string;
}

export default function Square(props: SquareProps) {
    let TILE_SIZE = 171; // Adjusted to fit within 512x512 grid
    if (window.innerWidth < 768) {
        TILE_SIZE = 108;
    }

    const index = props.num - 1;
    const row = Math.floor(index / 3);
    const col = index % 3;
    const backgroundPosition = `-${col * TILE_SIZE}px -${row * TILE_SIZE}px`;
    // responsive TILE_SIZE with screen size
    const tileSize = TILE_SIZE;
    return (
        <Space
            className='square'
            onClick={props.handleClick}
            style={{
                width: tileSize,
                height: tileSize,
                backgroundImage: `url(${props.image_url})`,
                backgroundPosition,
                backgroundSize: `${tileSize * 3}px ${tileSize * 3}px`,
                visibility: props.num === 0 ? 'hidden' : 'visible',
            }}
        >
            {props.num}
        </Space>
    )
}
