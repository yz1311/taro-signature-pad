import React, {useEffect, useState} from "react";

export enum MountedDelays {
    SHORTER = 200,
    SHORT = 500,
    MEDIUM = 1000,
    LONG = 2000,
    LONGER = 3000
}

function useMounted(delay: (MountedDelays | number) = MountedDelays.LONG, callback?) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setTimeout(()=>{
            setMounted(true);
            callback&&callback();
        }, delay);
    }, []);

    return mounted;
}

export default useMounted;
