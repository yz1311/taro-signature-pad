import React, {PureComponent, CSSProperties} from "react";
import classNames from 'classnames'
import {CommonEventFunction, Text, View} from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import './index.scss';
import { handleTouchScroll } from 'taro-ui/lib/common/utils'

interface AtComponent {
    className?: string | string[] | { [key: string]: boolean }

    customStyle?: string | CSSProperties
}


export interface YZFloatLayoutProps extends AtComponent {
    /**
     * 控制是否出现在页面上
     * @default false
     */
    isOpened: boolean
    /**
     * 元素的标题
     */
    title?: string
    /**
     * 元素被关闭时候触发的事件
     */
    onClose?: CommonEventFunction
}

export interface YZFloatLayoutState {
    _isOpened: boolean
}

export default class YZFloatLayout extends PureComponent<
    YZFloatLayoutProps,
    YZFloatLayoutState
    > {
    public static defaultProps: YZFloatLayoutProps
    public static propTypes: any;

    public constructor(props: YZFloatLayoutProps) {
        super(props)

        const { isOpened } = props
        this.state = {
            _isOpened: isOpened
        }
    }

    public static getDerivedStateFromProps(props: YZFloatLayoutProps, state: YZFloatLayoutState) {
        if(props.isOpened !== state._isOpened) {
            return {
                _isOpened: props.isOpened
            };
        }
    }

    public componentDidUpdate(prevProps: Readonly<YZFloatLayoutProps>, prevState: Readonly<YZFloatLayoutState>, snapshot?: any) {
        if(this.props.isOpened !== prevProps.isOpened) {
            handleTouchScroll(this.props.isOpened)
        }
    }

    private handleClose = () => {
        if (typeof this.props.onClose === 'function') {
            // @ts-ignore // TODO: Fix typings
            this.props.onClose()
        }
    }

    private close = (): void => {
        this.setState(
            {
                _isOpened: false
            },
            this.handleClose
        )
    }

    private handleTouchMove = (e: CommonEvent): void => {
        e.stopPropagation()
    }

    render() {
        const { _isOpened } = this.state
        const {
            title,
        } = this.props

        const rootClass = classNames(
            'at-float-layout',
            {
                'at-float-layout--active': _isOpened
            },
            this.props.className
        )

        return (
            <View className={rootClass} onTouchMove={this.handleTouchMove}>
                <View onClick={this.close} className='at-float-layout__overlay' />
                <View className='at-float-layout__container layout'>
                    {title ? (
                        <View className='layout-header'>
                            <Text className='layout-header__title'>{title}</Text>
                            <View className='layout-header__btn-close' onClick={this.close} />
                        </View>
                    ) : null}
                    <View className='layout-body'>
                        {this.props.children}
                    </View>
                </View>
            </View>
        )
    }
}

YZFloatLayout.defaultProps = {
    title: '',
    isOpened: false,
    onClose: () => {},
}
