# taro-signature-pad
[![npm version](http://img.shields.io/npm/v/@yz1311/taro-signature-pad.svg?style=flat-square)](https://npmjs.org/package/@yz1311/taro-signature-pad "View this project on npm")
[![npm version](http://img.shields.io/npm/dm/@yz1311/taro-signature-pad.svg?style=flat-square)](https://npmjs.org/package/@yz1311/taro-signature-pad "View this project on npm")

taro的手写签名库

只支持taro3小程序，h5没有做兼容处理，只支持Canvas type="2d"

### 安装
```
npm install @yz1311/taro-signature-pad --save
```


### 使用
```
import {SignaturePad} from "@yz1311/taro-signature-pad";

...
//组件默认是100%高宽

<Signature
    className="signature-canvas"
    ref={signatureRef}
/>
```


### 方法

#### isEmpty(): boolean

判断是否签名是空白的

#### fromDataURL(dataUrl, options, callback): void 

还原签名数据

* `dataUrl`: 图片的base64数据
* `options`: 选项
* `callback`: 回调方法

#### toDataURL(type, encoderOptions): string

获取签名数据

默认为png图片，实际调用的canvas的toDataURL函数，参考:

https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toDataURL

#### clear(): void

清空签名数据

#### save(): void

将签名数据转换为png图片并且保存到系统相册


### 截图
![](https://tva1.sinaimg.cn/large/0081Kckwgy1gliuxzjhmsg309s0hsn1i.gif)

