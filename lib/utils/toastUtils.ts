/**
 *
 * 模拟器下面一切正常，真机下面就会出现下面的问题
 * 后面的 hideLoading 自动关闭前面的 showToast。
 * 后面的 hideToast 自动关闭前面的 showLoading。
 * 后面的 showLoading 自动关闭前面的 showToast，显示 Loading。
 * 后面的 showToast 自动关闭前面的 showLoading，显示 Toast。
 *
 * 一般情况下，toast关闭loading是正常的情况
 * 但是loading关闭toast不应该，
 * 很多情况下，我们是在finally里面hideLoading的，此时弹出的toast会直接看不到
 *
 * 小程序没有根节点的概念，每个page都是在单独的webview中渲染，所以下面这些办法都没用
 * 1.app.js中添加自定义toast组件，app.js里面的所有东西都是虚拟的，界面方面的都不会渲染
 * 2.在主页面中添加自定义toast组件，虽然可以收到消息执行，但是不会显示，因为每个page都是在
 * 不同的webview中，即使改变层级依旧不可能出现在栈顶的页面中
 */

import Taro from '@tarojs/taro';


export default class ToastUtils {
    /**
     * toast显示的时间，小程序的默认值就是1500
     */
    static toastDuration = 1500;

    static isToastShowing = false;
    static isLoadingShowing = false;

    static showToast (title: string) {
        ToastUtils.isToastShowing = true;
        Taro.showToast({
            title: title,
            icon: 'none',
            duration: ToastUtils.toastDuration,
            complete: ()=>{
                ToastUtils.isToastShowing = false;
            },
        });
    }

    static showSuccessToast (title: string) {
        ToastUtils.isToastShowing = true;
        Taro.showToast({
            title: title,
            icon: 'success',
            duration: ToastUtils.toastDuration,
            complete: ()=>{
                ToastUtils.isToastShowing = false;
            },
        });
    }

    static showLoading (title?: string) {
        ToastUtils.isLoadingShowing = true;
        Taro.showLoading({
            title: title || '',
            complete: () => {
                ToastUtils.isToastShowing = false;
            },
        });
    }

    static hideLoading () {
        if(ToastUtils.isToastShowing) {
            //会有略微的时间差
            setTimeout(()=>{
                Taro.hideLoading();
                ToastUtils.isLoadingShowing = false;
            }, ToastUtils.toastDuration);
        } else {
            Taro.hideLoading();
            ToastUtils.isLoadingShowing = false;
        }
    }
}
