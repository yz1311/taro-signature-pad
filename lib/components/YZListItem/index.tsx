import React, {FC} from 'react'
import {Image, Text, View} from "@tarojs/components";
import './index.scss';
import {ITouchEvent} from "@tarojs/components/types/common";


interface IProps {
    className?: string,
    thumb?: string;
    title: string|JSX.Element,
    extraText?: string|JSX.Element,
    extraMultiline?: boolean;
    extraThumb?: string|JSX.Element,
    required?: boolean,
    detail?: JSX.Element,
    onClick?: (e: ITouchEvent) => void,
    note?: string,
    arrow?: 'up' | 'down' | 'right',
    hasBorder?: boolean;
}

const YZListItem: FC<IProps> = ({className,onClick, detail, title,
                                    thumb, extraMultiline,
                                    extraText, extraThumb, note, required, arrow, hasBorder = true})=>{
    return (
        <View className={`yz-list-item at-list__item ${!arrow&&'at-list__item_patch'} ${!hasBorder&&'at-list__item--no-border'} ${className}`} onClick={onClick}>
            <View className='at-list__item-container at-list__item-container_patch'>
                {thumb && (
                    <View className='at-list__item-thumb item-thumb'>
                        <Image
                            className='item-thumb__info'
                            mode='scaleToFill'
                            src={thumb}
                        />
                    </View>
                )}
                <View className='at-list__item-content item-content'>
                    <View className='item-content__info'>
                        <View className={`item-content__info-title ${required && 'at-input__title--required'}`}>{title}</View>
                        {note && <View className='item-content__info-note'>{note}</View>}
                    </View>
                </View>
                <View className='at-list__item-extra item-extra right-container'>
                    {extraText && <View className={`item-extra__info ${extraMultiline&&'item-extra__info__multiline'} ${!arrow&&'item-extra__info_patch'}`}>{extraText}</View>}
                    {detail && detail}
                    {extraThumb && !extraText && (
                        <View className='item-extra__image'>
                            <Image
                                className='item-extra__image-info'
                                mode='aspectFit'
                                src={extraThumb as any}
                            />
                        </View>
                    )}
                    {arrow ? (
                        <View className='item-extra__icon'>
                            <Text
                                className={`at-icon item-extra__icon-arrow at-icon-chevron-${arrow}`}
                            />
                        </View>
                    ) : null}
                </View>
            </View>
        </View>
    );
}

YZListItem.defaultProps = {
    //默认支持多行
    extraMultiline: true
};

export default React.memo(YZListItem);
