import { Card } from 'antd';
import * as React from 'react';

export interface Props {
    image_url: string;
    title: string;
}

export function ProductImageCard(props: Props) {
    return (
        <div>
            <Card
                cover={<img alt={`trending`} src={props.image_url} />}
                onClick={() => {
                    console.log('click');
                }}
            >
                <Card.Meta
                    // title={`Views: ${item.views}`}
                    description={props.title}
                />
            </Card>
        </div>
    );
}
