import Taro from '@tarojs/taro';


const DeviceEventEmitter =  {
    addListener: (eventName: string, params: any) => {
        Taro.eventCenter.on(eventName, params);
        return {
            eventType: eventName,
            remove: () => {
                Taro.eventCenter.off('eventName');
            }
        };
    },
    emit: (eventName: string, params?: any) => {
        Taro.eventCenter.trigger(eventName, params);
    }
}


export default DeviceEventEmitter;
