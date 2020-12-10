
import React, {PureComponent} from 'react';
import {Image, Text, View} from "@tarojs/components";
import {AtActivityIndicator} from 'taro-ui'
import './index.scss';

interface IProps {
    isLoadingMore: boolean,
    customStyle?: string,
    noMore: boolean,
    dataList: Array<any>,
    placeholderImageRes?: string,
    placeholderTitle?: string,
    onReload?: any,
}

interface IState {

}

export default class YZLoadingFooter extends PureComponent<IProps, IState> {
    static defaultProps = {
        dataList: [],
    };

    render(): any {
        const {customStyle, isLoadingMore, noMore, dataList, placeholderImageRes, placeholderTitle} = this.props;
        if (isLoadingMore) {
            return (
                <View className='loading-footer-container' style={`${customStyle}`}>
                    <View className='flex flex-row items-center' >
                        <AtActivityIndicator size={35}></AtActivityIndicator>
                        <Text className='loading-text'>加载中...</Text>
                    </View>
                </View>
            );
        }
        if ((noMore==undefined?true:noMore)&&dataList.length>0) {
            return (
                <View className='loading-footer-container' style={`${customStyle}`}>
                    <Text className='noMore-text'>-- 没有更多内容了 --</Text>
                </View>
            );
        }
        if (!(noMore==undefined?true:noMore)) {
            return (
                <View className='loading-footer-container' style={`${customStyle}`}>
                    <View style='display: flex;flex:1;'>

                    </View>
                </View>
            );
        }
        return null;
    }
}
