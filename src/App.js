import React, {Fragment, useEffect, useState} from "react";
import {DefaultRoutes, GlobalLoader, Header, Loader, MobileHeader, Modal} from "./components/layout";
import {initLocale} from "./utils/locale";
import {getStorage, initNode, initSettings} from "./utils";
import {logout} from "./redux/actions/userData";
import {handleAssetsRequest} from "./utils/dataHandlers";
import {ApiRequest} from "./utils/requests";
import {setAssets} from "./redux/actions/assets";
import {closeModal, generatePromiseModal} from "./redux/actions";
import {SecondLoginModal} from "./components/helpers/pages/cabinet/secondLoginModal";
import {updateActivePair} from "./redux/actions/activePair";

const loginInit = async () => {
    if(getStorage("user")) {
        await generatePromiseModal(SecondLoginModal).catch(err => {
            logout();
            closeModal();
            console.error(err);
        });
    }
};

const appInit = async () => {
    //base app initialising
    initLocale();
    initSettings();

    updateActivePair(getStorage("active_pair") || "GOLOS_GBG");

    await new ApiRequest().getAssets().then(handleAssetsRequest).then(setAssets);
};

function App() {
    const [isLoading, setLoadingState] = useState(true);
    const [waitingForLogin, setLoginAwaitState] = useState(true);

    useEffect(() => {
        initNode()
            .then(appInit)
            .then(() => setLoadingState(false))
            .then(loginInit)
            .finally(() => setLoginAwaitState(false));
    }, []);

    if(isLoading) return <GlobalLoader />;

    return (
        <Fragment>
            {!waitingForLogin && (
              <Fragment>
                  <Header />
                  <MobileHeader />
                  <main>
                      <DefaultRoutes />
                  </main>
              </Fragment>
            )}
            <Modal />
        </Fragment>
    );
}

export default App;
