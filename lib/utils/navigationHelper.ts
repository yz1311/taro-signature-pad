import Taro from '@tarojs/taro'

const generateParams = (params) => {
  const paramArray: string[] = [];
  if (typeof params === 'object') {
    for (const key in params) {
      if (typeof params[key] === 'object') {
        paramArray.push(key + '=' + JSON.stringify(params[key]));
      } else {
        paramArray.push(key + '=' + params[key]);
      }
    }
  }
  let ext = '';
  if (paramArray.length > 0) {
    ext = '?' + paramArray.join('&');
  }
  return ext;
}

export default class NavigationHelper {
  static navigation;

  static navRouters: Array<any>;

  /**
   * 当前是不是最顶层的页面
   * @param routePath  路径
   * @returns {boolean}
   */
  static isTopScreen (routePath) {
    let pages = Taro.getCurrentPages();
    //处理下routePath，如果是/开头的，则去掉
    if(routePath&&routePath[0]=='/') {
      routePath = routePath.substr(1);
    }
    return pages[pages.length-1].route == routePath;
  }

  static goBack () {
    Taro.navigateBack({
      delta: 1
    });
  }

  static navigate (routeName, params?) {
    const ext = generateParams(params);
    console.log(routeName + ext);
    Taro.navigateTo({
      url: routeName + ext
    })
  }

  static push (routeName, params?) {
    NavigationHelper.navigate(routeName, params);
  }

  /**
   * 重置到某个页面，但是不支持tab
   * @param routeName
   * @param params
   */
  static resetTo (routeName, params?) {
    const ext = generateParams(params);
    Taro.redirectTo({
      url: routeName + ext
    });
  }

  /**
   * 只支持tab页面
   * @param routeName
   * @param params
   */
  static switchTab (routeName, params?) {
    const ext = generateParams(params);
    Taro.switchTab({
      url: routeName + ext
    });
  }

  static popN (num) {
    Taro.navigateBack({
      delta: num
    });
  }

  /**
   * 用新的页面替换当前页面
   * @param routeName
   * @param params
   */
  static replace (routeName, params?) {
    const ext = generateParams(params);
    Taro.redirectTo({
      url: routeName + ext
    });
  }

  /**
   * 刷新路由栈中的某一页面的某个方法
   * ps：只支持小程序
   */
  static reloadPage (routeName, methodName = 'reloadData', params?: any, reloadAll = false) {
    if (process.env.TARO_ENV === 'weapp') {
      if (routeName.indexOf('/') === 0) {
        routeName = routeName.substr(1);
      }
      const pages = Taro.getCurrentPages();
      if (reloadAll) {
        pages.forEach((x, index) => {
          pages[index].data[methodName] && pages[index].data[methodName](params);
        });
      } else {
        let targetPageIndex = -1;
        pages.forEach((x, index) => {
          // 实际获取的route不是/开头
          if (x.route === routeName) {
            targetPageIndex = index;
          }
        });
        if (targetPageIndex >= 0) {
          pages[targetPageIndex].data[methodName] && pages[targetPageIndex].data[methodName](params);
        }
      }
    }
  }
}
