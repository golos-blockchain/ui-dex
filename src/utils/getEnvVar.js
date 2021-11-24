export const getEnvVar = (varName) => {
    return process.env && process.env[`REACT_APP_${varName}`];
}