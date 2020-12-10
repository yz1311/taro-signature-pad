import Taro from '@tarojs/taro';

export interface AlertButton {
    text?: string;
    onPress?: (value?:any) => void;
    //default为蓝色,cancel为蓝色加粗,destructive为红色
    style?: "default" | "cancel" | "destructive";
    //文字颜色，将会覆盖style的颜色样式
    textColor?: string,
    //文本样式，将会覆盖style的颜色样式
    textStyle?: string
}

interface AlertOptions {
    /** @platform android/ios,默认值:false,(注意,RN的Alert组件，android下该值为true) */
    cancelable?: boolean;
    /** @platform android/ios */
    onDismiss?: () => void;
    /** 点击按钮后自动关闭,默认值:false */
    autoClose?: boolean;
    /** Overlay.PopView的相关属性 */
    overlay?: any;
}

const Alert = {
    alert: (title: string, message?: string, buttons?: AlertButton[], options?: AlertButton) => {
        if(!buttons || buttons.length === 0) {
            console.warn('alert至少要设置一个按钮')
            return;
        }
        if(buttons.length === 1) {
            Taro.showModal({
                title: title || '',
                content: message || '',
                showCancel: false,
                confirmText: buttons[0].text,
                confirmColor: buttons[0].textColor||'',
                success: (res)=>{
                    if(res.cancel) {

                    } else if(res.confirm) {
                        buttons[0].onPress&&buttons[0].onPress();
                    }
                }
            });
            return;
        } else if(buttons.length === 2) {
            Taro.showModal({
                title: title || '',
                content: message || '',
                cancelText: buttons[0].text,
                cancelColor: buttons[0].textColor||'#999999',
                confirmText: buttons[1].text,
                confirmColor: buttons[1].textColor||'',
                success: (res)=>{
                    if(res.cancel) {
                        buttons[0].onPress&&buttons[0].onPress();
                    } else if(res.confirm) {
                        buttons[1].onPress&&buttons[1].onPress();
                    }
                }
            })
        } else {
            console.warn('taro不支持三个及以上的按钮显示');
        }
    }
};

export default Alert;
