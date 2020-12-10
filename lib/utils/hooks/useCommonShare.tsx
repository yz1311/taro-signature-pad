import {useEffect} from "react";
import Taro, {useShareAppMessage} from '@tarojs/taro';


const useCommonShare = (opts?: Taro.ShareAppMessageReturn) => {

  useShareAppMessage(payload => {
    return {
      title: opts.title || '',
      path: opts.path || '',
      imageUrl: opts.imageUrl || undefined
    } as Taro.ShareAppMessageReturn;
  })

  useEffect(()=>{
    Taro.showShareMenu({});
  }, [])
}

export default useCommonShare;
