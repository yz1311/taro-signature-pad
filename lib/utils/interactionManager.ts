

const InteractionManager = {
    runAfterInteractions: (task?: ()=>void) => {
        setTimeout(()=>{
            task&&task();
        }, 150);
    },
    /**
     * 延迟执行任务
     * @param task 要执行的任务
     * @param time 延迟时间，默认为2500ms
     */
    delay: (task?: ()=>void, time = 2500) => {
        setTimeout(()=>{
            task&&task();
        }, time);
    }
};


export default InteractionManager;
