import {useEffect, useState} from 'react'
import Taro from '@tarojs/taro'

interface INavInfo {
    statusBarHeight: number
    titleBarHeight: number
    titelBarWidth: number
    appHeaderHeight: number
    marginSides: number
    capsuleWidth: number
    capsuleHeight:number
    capsuleLeft: number
    contentHeight: number
    screenHeight: number
    windowHeight: number
    pixelRatio: number
}

function useNavInfo(): INavInfo {
    const [navInfo, setNavInfo] = useState({
        statusBarHeight: 0,
        titleBarHeight: 0,
        titelBarWidth: 0,
        appHeaderHeight: 0,
        marginSides: 0,
        capsuleWidth: 0,
        capsuleHeight: 0,
        capsuleLeft: 0,
        contentHeight: 0,
        screenHeight: 0,
        windowHeight: 0,
        pixelRatio: 1
    })

    useEffect(() => {
        const { statusBarHeight, screenWidth, screenHeight, windowHeight, pixelRatio } = Taro.getSystemInfoSync()
        // 获取胶囊信息
        const { width, height, left, top, right } = Taro.getMenuButtonBoundingClientRect()
        // 计算标题栏高度
        const titleBarHeight = height + (top - statusBarHeight) * 2
        // 计算导航栏高度
        const appHeaderHeight = statusBarHeight + titleBarHeight
        //边距，两边的
        const marginSides = screenWidth - right
        //标题宽度
        const titelBarWidth = screenWidth - width - marginSides * 3
        //去掉导航栏，屏幕剩余的高度
        const contentHeight = screenHeight - appHeaderHeight

        setNavInfo({
            statusBarHeight: statusBarHeight, //状态栏高度
            titleBarHeight: titleBarHeight,  //标题栏高度
            titelBarWidth: titelBarWidth,  //标题栏宽度
            appHeaderHeight: appHeaderHeight, //整个导航栏高度
            marginSides: marginSides, //侧边距
            capsuleWidth: width, //胶囊宽度
            capsuleHeight: height, //胶囊高度
            capsuleLeft: left,
            contentHeight: contentHeight,
            screenHeight: screenHeight,
            windowHeight: windowHeight,
            pixelRatio: pixelRatio
        })
    }, [])

    return navInfo
}


export default useNavInfo
