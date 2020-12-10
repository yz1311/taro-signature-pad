import classNames from 'classnames'
import React, {Component} from 'react';
import {Text, Textarea, View} from '@tarojs/components'
import {CommonEvent} from '@tarojs/components/types/common'
import Taro from '@tarojs/taro'
import {AtTextareaProps} from "taro-ui/types/textarea";
import './index.scss';

type ExtendEvent = {
    target: {
        value: string
    }
}

function getMaxLength(
    maxLength: number,
    textOverflowForbidden: boolean
): number {
    if (!textOverflowForbidden) {
        return maxLength + 500
    }
    return maxLength
}

interface IProps extends AtTextareaProps {
    name?: string;
    adjustPosition?: boolean;
    /**
     * 只显示view，点击弹窗输入文字
     */
    viewOnly?: boolean;
    onClick?: ()=>void;
}

const ENV = Taro.getEnv()

export default class YZTextarea extends Component<IProps, any> {
    public static defaultProps: IProps
    public static propTypes: any

    private handleInput = (event: CommonEvent & ExtendEvent): void => {
        this.props.onChange(event.target.value, event)
    }

    private handleFocus = (event: CommonEvent): void => {
        this.props.onFocus && this.props.onFocus(event)
    }

    private handleBlur = (event: CommonEvent): void => {
        this.props.onBlur && this.props.onBlur(event)
    }

    private handleConfirm = (event: CommonEvent): void => {
        this.props.onConfirm && this.props.onConfirm(event)
    }

    private handleLinechange = (event: CommonEvent) => {
        this.props.onLinechange && this.props.onLinechange(event)
    }

    public render(): JSX.Element {
        const {
            name,
            customStyle,
            className,
            value,
            cursorSpacing,
            placeholder,
            placeholderStyle,
            placeholderClass,
            maxLength,
            count,
            disabled,
            autoFocus,
            focus,
            showConfirmBar,
            selectionStart,
            selectionEnd,
            fixed,
            adjustPosition,
            textOverflowForbidden,
            height,
            viewOnly,
            onClick
        } = this.props

        const _maxLength = parseInt(maxLength!.toString())
        const actualMaxLength = getMaxLength(_maxLength, textOverflowForbidden!)
        const textareaStyle = height
            ? `height:${Taro.pxTransform(Number(height))}`
            : ''
        const rootCls = classNames(
            'at-textarea',
            'yz-textarea-container',
            `at-textarea--${ENV}`,
            {
                'at-textarea--error': _maxLength < value.length
            },
            className
        )
        const placeholderCls = classNames('placeholder', placeholderClass)

        return (
            <View className={rootCls} style={customStyle} onClick={!disabled&&onClick}>
                {disabled || viewOnly?
                    <View
                        style={textareaStyle}
                        className="flex flex-grow-1 at-textarea__textarea overflow-x-hidden">
                        <Text className={`textarea-fake-text ${!value&&'placeholder-text'}`}>{value || placeholder}</Text>
                    </View>
                    :
                    <Textarea
                        name={name}
                        className='at-textarea__textarea'
                        style={textareaStyle}
                        placeholderStyle={placeholderStyle}
                        placeholderClass={placeholderCls}
                        cursorSpacing={cursorSpacing}
                        value={value}
                        maxlength={actualMaxLength}
                        placeholder={placeholder}
                        disabled={disabled}
                        autoFocus={autoFocus}
                        focus={focus}
                        showConfirmBar={showConfirmBar}
                        selectionStart={selectionStart}
                        selectionEnd={selectionEnd}
                        fixed={fixed}
                        adjustPosition={adjustPosition}
                        onInput={this.handleInput}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        onConfirm={this.handleConfirm}
                        onLineChange={this.handleLinechange}
                    />
                }
                {count && (
                    <View className='at-textarea__counter'>
                        {value.length}/{_maxLength}
                    </View>
                )}
            </View>
        )
    }
}

YZTextarea.defaultProps = {
    customStyle: '',
    className: '',
    value: '',
    cursorSpacing: 100,
    maxLength: 100,
    placeholder: '',
    disabled: false,
    autoFocus: false,
    focus: false,
    showConfirmBar: false,
    selectionStart: -1,
    selectionEnd: -1,
    count: true,
    fixed: false,
    adjustPosition: false,
    height: '',
    textOverflowForbidden: true,
    onLinechange: () => {},
    onChange: () => {},
    onFocus: () => {},
    onBlur: () => {},
    onConfirm: () => {}
}
