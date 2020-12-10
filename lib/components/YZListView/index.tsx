/**
 * YangZhao 2020/04/26
 * 列表组件，分为两部分
 * 1.如果item有固定的高度/宽度(横向时)，则使用virtual-list渲染
 * 2.否则，还使用传统的方式
 *
 * 另外添加了上拉加载更多的功能
 *
 * VirtualList必须要设置固定高度,不支持flex
 */
import React, {Component, ReactElement, useEffect, useRef, useState} from 'react'
import {ScrollView, View} from "@tarojs/components";
import YZLoadingFooter from "../YZLoadingFooter";
import './index.scss';


interface IProps {
    children?: any;
    wrapperClassName?: string,
    wrapperStyle?: string,
    listClassName?: string,
    listStyle?: string,
    contentClassName?: string,
    contentStyle?: string,
    noMore: boolean,
    itemData: Array<any>;
    itemCount?: number,
    isLoadingMore: boolean,
    onReachEnd: () => void,
    onRefresh: () => void,
    ListHeaderComponent?: Function | ReactElement | Component,
    renderItem: ({item, index}: {item: any, index: number}) => void;
}

function YZListView (props: IProps) {
    const {renderItem, wrapperClassName, listClassName, listStyle,
        wrapperStyle, itemData, isLoadingMore,
        contentClassName, contentStyle,
        ListHeaderComponent,
        onRefresh, noMore, onReachEnd} = props;
    const [refresherEnabled, setRefresherEnabled] = useState(true);

    const isLoadingMoreRef = useRef<boolean>(isLoadingMore);

    useEffect(()=>{
        if(isLoadingMoreRef.current !== isLoadingMore && !isLoadingMore) {
            setRefresherEnabled(true);
        }
        isLoadingMoreRef.current = isLoadingMore;
    }, [isLoadingMore]);

    return (
        <View className={`yz-list-view ${wrapperClassName}`} style={wrapperStyle}>
            <ScrollView className={`list-scroll-view ${listClassName}`}
                        style={listStyle}
                        refresherEnabled={refresherEnabled}
                        refresherThreshold={80}
                        refresherDefaultStyle="black"
                        refresherBackground="transparent"
                        refresherTriggered={isLoadingMore}
                        onRefresherRefresh={()=>{
                            //下拉会触发该方法，但是设置refresherTriggered也会触发该方法
                            if(isLoadingMore) {
                                return;
                            }
                            onRefresh&&onRefresh();
                        }}
                        onRefresherPulling={()=>{

                        }}
                        scrollY={true} onScrollToLower={()=>{
                if(!noMore&&!isLoadingMore) {
                    //必须要禁用，否则加载下一页数据的时候，页面会跳一下
                    setRefresherEnabled(false);
                    onReachEnd&&onReachEnd();
                }
            }}
            >
                <View className={`yz-list-view__content ${contentClassName}`} style={contentStyle} >
                    {typeof ListHeaderComponent == 'function' ?
                        ListHeaderComponent()
                        :
                        ListHeaderComponent
                    }
                    {
                        itemData.map((item,index)=>{
                            return renderItem&&renderItem({
                                item,
                                index
                            });
                        })
                    }
                    <YZLoadingFooter noMore={noMore} dataList={itemData} isLoadingMore={isLoadingMore} />
                </View>
            </ScrollView>
        </View>
    );
};


//@ts-ignore
YZListView.defaultProps =  {
    // ...(VirtualList.defaultProps || {}),
    noMore: false,
    itemCount: 0,
    isLoadingMore: false,
    onReachEnd: null,
};

export default React.memo(YZListView);
