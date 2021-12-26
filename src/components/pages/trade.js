import React, {useEffect} from "react";
import {Route, Switch, useHistory} from "react-router";
import {trade, tradePair, tradeRoot} from "../routing";
import {useClassSetter} from "../../utils";
import {TradePair} from "./tradePair";
import {getActivePair} from "../../redux/actions/activePair";

const TradeRoot = () => {
    const history = useHistory();

    useEffect(() => {
        const activePair = getActivePair();
        history.push(trade.link + activePair);
    }, []);

    return <span />;
};

export const Trade = () => {
    const [baseClass, setClass] = useClassSetter("trade");
    const components = [
        { ...tradeRoot, component: TradeRoot },
        { ...tradePair, component: TradePair },
    ];

    return(
        <div className={baseClass}>
            <div className={setClass("content")}>
                <Switch>
                    {components.map((el, id) => (
                        <Route exact key={id} path={el.link} component={el.component} />
                    ))}
                </Switch>
            </div>
        </div>
    )
}