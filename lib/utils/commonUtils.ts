import ToastUtils from "./toastUtils";
import Taro from '@tarojs/taro';

const CommonUtils = {
    guid: () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    /**
     * 下载并查看文件(针对非图片)
     * @param url
     */
    downloadAndPreviewFile: async (url, filePath?) => {
        if (filePath) {
            await new Promise<Taro.General.CallbackResult>((resolve, reject) => {
                Taro.openDocument({
                    filePath: filePath,
                    success: res => {
                        resolve(res);
                    },
                    fail: res => {
                        reject(new Error('打开文件失败!'));
                    }
                });
            });
        } else {
            ToastUtils.showLoading();
            try {
                let res = await new Promise<Taro.downloadFile.FileSuccessCallbackResult>((resolve, reject) => {
                    Taro.downloadFile({
                        url: url,
                        success: result => {
                            resolve(result);
                        },
                        fail: res => {
                            reject(new Error('下载文件失败!'));
                        }
                    })
                });
                let path = res.tempFilePath;
                await new Promise<Taro.General.CallbackResult>((resolve, reject) => {
                    Taro.openDocument({
                        filePath: path,
                        success: res => {
                            resolve(res);
                        },
                        fail: res => {
                            reject(new Error('打开文件失败!'));
                        }
                    });
                });
                ToastUtils.hideLoading();
            } catch (e) {
                ToastUtils.showToast(e.message);
            } finally {

            }
        }
    }
}


export default CommonUtils
