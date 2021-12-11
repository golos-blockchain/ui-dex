import React, {Fragment, useEffect, useState} from "react";
import {DefaultRoutes, Header, Modal} from "./components/layout";
import {initLocale} from "./utils/locale";
import {getStorage, initNode, initSettings} from "./utils";
import {setUserData} from "./redux/actions/userData";
import {handleAssetsRequest, handleUserAuth} from "./utils/dataHandlers";
import {ApiRequest} from "./utils/requests";
import {setAssets} from "./redux/actions/assets";

const appInit = async () => {
    //base app initialising
    initLocale();
    initSettings();

    await new ApiRequest().getAssets().then(handleAssetsRequest).then(setAssets);

    //user check
    const user = getStorage("user");
    if(user) await handleUserAuth(user).then(setUserData);
};

function App() {
    const [isLoading, setLoadingState] = useState(true);

    useEffect(() => {
        initNode().then(appInit).then(() => setLoadingState(false));
    }, []);

    return isLoading
        ? <div>Loading</div>
        : (
            <Fragment>
                <Header />
                <main>
                    <DefaultRoutes />
                </main>
                <Modal />
            </Fragment>
        );
}

export default App;
