import React, {Fragment, useEffect, useState} from "react";
import {DefaultRoutes, Header} from "./components/layout";
import {initLocale} from "./utils/locale";
import {getStorage, initSettings} from "./utils";
import {setUserData} from "./redux/actions/userData";
import {handleUserAuth} from "./utils/dataHandlers";


const appInit = async () => {
    //base app initialising
    initLocale();
    initSettings();

    //user check
    const user = getStorage("user");
    if(user) await handleUserAuth(user).then(setUserData);
};

function App() {
    const [isLoading, setLoadingState] = useState(true);

    useEffect(() => {
        appInit().then(() => setLoadingState(false));
    }, []);

    return isLoading
        ? <div>Loading</div>
        : (
            <Fragment>
                <Header />
                <main>
                    <DefaultRoutes />
                </main>
            </Fragment>
        );
}

export default App;
