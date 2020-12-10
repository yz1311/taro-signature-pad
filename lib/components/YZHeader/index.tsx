import Taro from "@tarojs/taro";
import React, {FC} from 'react'
import {View} from "@tarojs/components";
import './index.scss';
import {AtNavBar} from 'taro-ui';
import NavigationHelper from '../../utils/navigationHelper';
import {AtNavBarProps} from "taro-ui/types/nav-bar";


interface IProps extends Omit<AtNavBarProps, 'title'> {
    className?: string;
    title: string | React.ReactElement;
    leftIconType?: string;
}

const statusBarHeight = Taro.getSystemInfoSync().statusBarHeight;

const YZHeader: FC<IProps> = ({className, title, leftIconType, ...rest})=>{
    return (
        <View className={`flex-column yz-header-container ${className}`}>
            <View style={`background-color: transparent; height: ${statusBarHeight}px;`} />
            <View className={`${leftIconType?'yz-header-content-container':'yz-header-content-container__inactive'}`}>
                <AtNavBar
                    color="white"
                    {...(rest||{})}
                    title={title as any}
                    leftIconType={leftIconType}
                    onClickLeftIcon={()=>{
                        if(leftIconType) {
                            NavigationHelper.goBack();
                        }
                    }}
                />
            </View>
        </View>
    );
}

YZHeader.defaultProps = {
    leftIconType: 'chevron-left'
};

export default React.memo(YZHeader);
