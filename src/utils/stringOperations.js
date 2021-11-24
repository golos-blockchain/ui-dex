const stringBuilder = (joiner) => (base) => (...rest) => [base, ...rest].join(joiner);

export const translateStr = stringBuilder('.');
export const classStr = stringBuilder('__');
export const classEffect = stringBuilder('--');
export const urlStr = stringBuilder('/');

export const useClassSetter = (baseClass) => [baseClass, classStr(baseClass), classEffect(baseClass)];

export const i18nGlobal = translateStr("global");