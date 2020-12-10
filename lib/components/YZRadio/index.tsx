/**
 * 官方的列表是采用全列表渲染的
 * 如果数据量较多，很影响渲染
 * 现在改为VirtualList实现，性能极大优化
 */
import React, {PureComponent, useEffect} from 'react';
import { Text, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import {AtRadioProps, RadioOption} from "taro-ui/types/radio";
import VirtualList from '@tarojs/components/virtual-list';
import './index.scss';

interface IProps extends AtRadioProps<any>{
    customStyle?: string;
    className?: string;
    /**
     * 列表的高度，单位为px，需要自己转换
     * 默认为330px
     */
    height?: number;
}

export default class Index extends PureComponent<IProps, any> {
    public static defaultProps: AtRadioProps<any>
    public static propTypes: any

    handleClick = (option: RadioOption<any>, event: CommonEvent) => {
        if (option.disabled) return;
        this.props.onClick&&this.props.onClick(option.value, event);
    }

    public render(): JSX.Element {
        const { customStyle, className, options, value, height } = this.props;
        return (
            <View className={`yz-radio ${className}`} style={customStyle}>
                <VirtualList
                    height={height || 330} /* 列表的高度 */
                    //@ts-ignore
                    width='100%' /* 列表的宽度 */
                    itemData={options} /* 渲染列表的数据 */
                    itemCount={options.length} /*  渲染列表的长度 */
                    itemSize={50} /* 列表单项的高度  */
                >
                    {
                        React.memo(({index, style, data}: {index: number; style: any; data: Array<any>;})=>{
                            const option = data[index];
                            return (
                                <RadioItem
                                    //必须要设置这个参数
                                    style={style}
                                    disabled={option.disabled}
                                    label={option.label}
                                    desc={option.desc}
                                    value={option.value}
                                    checked={value === option.value}
                                    handleClick={this.handleClick}
                                />
                            );
                        })
                    }
                </VirtualList>
            </View>
        )
    }
}


function RadioItem({disabled, label, value, desc, checked, style, handleClick}) {
    return (
        <View
            onClick={(e)=>handleClick({
                disabled,
                label,
                desc,
                value
            } as RadioOption<any>, e)}
            style={style}
            className="yz-radio__option"
        >
            <View className={`yz-radio__option-wrap ${disabled && 'yz-radio__option-wrap--disabled'}`}>
                <View className='yz-radio__option-wrap__title'>{label}</View>
                <View
                    className={`yz-radio__option-wrap__icon ${checked&&'yz-radio__option-wrap__icon--checked'}`}
                >
                    <Text className='at-icon at-icon-check'></Text>
                </View>
            </View>
        </View>
    );
}


Index.defaultProps = {
    customStyle: '',
    className: '',
    value: '',
    options: [],
    onClick: () => {}
}
