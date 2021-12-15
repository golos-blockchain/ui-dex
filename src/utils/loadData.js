import {useEffect, useState} from "react";

export const LoadData = (req, throttling) => {
    const [throttleFunc, setThrottleFunc] = useState(false)
    const [data, setData] = useState(false);
    const [isLoading, setLoadingState] = useState(true);
    const [reloadId, setReloadId] = useState(0);

    useEffect(() => {
        async function fetchData() {
            let timeout = "";

            const initRequest = () => req().then(setData).finally(() => {
                if (isLoading) setLoadingState(false);
            });

            if (throttling) {
                throttleFunc && clearTimeout(throttleFunc);
                timeout = setTimeout(initRequest, throttling);
                setThrottleFunc(timeout);
            } else {
                initRequest();
            }
        }

        fetchData();
    }, [reloadId]); // eslint-disable-line react-hooks/exhaustive-deps

    const reloadData = () => {
        setReloadId(reloadId + 1);
    };

    const reloadPage = () => {
        setLoadingState(true);
        reloadData();
    };

    return [data, isLoading, reloadData, reloadPage];
}