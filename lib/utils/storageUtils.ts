import Taro from '@tarojs/taro';

const StorageUtils = {
    // 缓存方法
    save: (key, value) => {
        return new Promise<void>((resolve, reject) => {
            try {
                Taro.setStorageSync(key, value);
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    },
    // 加载缓存
    load: key => {
        return new Promise<any>((resolve, reject) => {
            try {
                let result = Taro.getStorageSync(key);
                resolve(result);
            } catch (e) {
                reject(e);
            }
        });
    },
    // 删除缓存
    remove: key => {
        return new Promise<void>((resolve, reject) => {
            try {
                Taro.removeStorageSync(key);
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }
};

export default StorageUtils;
export const {save, load, remove} = StorageUtils;
