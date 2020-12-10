/**
 * 由于目前无法拆分children，所谓无法动态注入className到children的每个元素中
 * 下面之所以有两个AtTabs，是因为在更新key的时候，会导致下面内容的滚动条置为0，导致滑动到顶部了
 * 第一个AtTabs是占位，第二个AtTabs才是实际作用的
 * 但是有个问题，tab切换的动画没了(只有一个AtTabs也没有动画，可能是设置key的原因)
 *
 * 2020/12/10 用Swiper实现了滑动功能
 */
import {CommonEvent, Swiper, SwiperItem, View} from "@tarojs/components";
import React, {useEffect, useState} from "react";
import {AtTabs} from 'taro-ui';
import {TabItem} from "taro-ui/types/tabs";
import './index.scss';

interface IProps {
    children?: any;
    /**
     * 当前选中的标签索引值，从 0 计数，开发者需要通过 onClick 事件来改变 current，从而切换 tab
     * @default 0
     */
    current: number
    /**
     * 是否开启切换动画
     * @default true
     */
    animated?: boolean
    /**
     * tab 列表
     */
    tabList: TabItem[]
    /**
     * 点击或滑动时触发事件
     */
    onClick: (index: number, event: CommonEvent<any>)=>void;
    /**
     * 是否支持手势滑动切换内容页，
     * 当 tabDirection='vertical'时，
     * 无论是否设置，都不支持手势滑动切换内容页
     */
    swipeable: boolean;
}

function YZTabs({children, current, tabList, animated, onClick, swipeable}:IProps) {
    const [tempKey, setTempKey] = useState(new Date().getTime+'');

    useEffect(()=>{
        //由于AtTabs刷新tabList后，会出现无法点击切换tab的情况，所以需要强制刷新整个AtTabs
        setTempKey(new Date().getTime()+'');
    }, [tabList]);

    return (
        <View className="yz-tabs-container">
            <View className="relative flex flex-column">
                <AtTabs current={0} tabList={tabList} animated={false} onClick={()=>{}}>

                </AtTabs>
                <View className="absolute absolute--fill">
                    <AtTabs key={tempKey} current={current} tabList={tabList} animated={animated} onClick={onClick}>

                    </AtTabs>
                </View>
            </View>
            <View className="flex flex-column flex-grow-1 overflow-y-hidden relative">
                {swipeable ?
                    <Swiper
                        current={current}
                        disableTouch={true}
                        onChange={e => {
                            onClick && onClick(e.detail.current, e);
                        }}
                        className='flex-grow-1 overflow-y-hidden'
                    >
                        {
                            children.map((item, index) => {
                                return (
                                    <SwiperItem key={index}>
                                        {item}
                                    </SwiperItem>
                                );
                            })
                        }
                    </Swiper>
                    :
                    children.map((item, index) => {
                        return (
                            <View
                                className={current==index?'at-tabs-pane__visible':'at-tabs-pane__invisible'}
                                key={index}>
                                {item}
                            </View>
                        );
                    })
                }
            </View>
        </View>
    );
}

YZTabs.defaultProps = {
    current: 0,
    animated: true,
    swipeable: true
};

export default React.memo(YZTabs);
