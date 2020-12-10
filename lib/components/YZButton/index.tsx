
/**
 * 初衷
 * taro 3.0.14(至少是这个版本中存在这个问题)
 * Button组件在ios存在不占位的情况，并且有很大的阴影区域
 * 所以重新写了一个button组件
 * 暂不清楚是taro还是小程序的问题
 */
import React from "react";
import {ITouchEvent, Text, View} from "@tarojs/components";
import './index.scss';

interface IProps {
    className?: string;
    children?: any;
    type?: 'default' | 'primary',
    onClick?: (event?: ITouchEvent<any>)=>void;
}

function YZButton({className, children, type, onClick}: IProps) {
    return (
        <View
            onClick={onClick}
            className={`yz-button-container ${type=='primary'&&'yz-button-primary-text'} ${className}`}>
            <Text>{children}</Text>
        </View>
    );
}

YZButton.defaultProps = {
    type: 'default'
};

export default YZButton;
