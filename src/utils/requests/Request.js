import golos from "golos-lib-js";

export default class Request{
    type = "";

    request = (opName, ...params) => (
        this.type && golos[this.type][opName](...params)
    );

    asyncRequest = (opName, ...params) => (
        this.type && new Promise((response, reject) => {
            golos[this.type][opName](...params, (err, res) => {
                return err
                    ? reject(err)
                    : response(res);
            });
        })
    )
}