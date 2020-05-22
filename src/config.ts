import * as R from 'ramda';

function mandatoryEnv(name: string) {
    const value = process.env[`REACT_APP_${name}`];
    if (R.isNil(value) || R.isEmpty(value)) {
        throw new Error(`Mandatory environment variable ${name} doesn't have a value: ${value}!`);
    } else {
        return value;
    }
}

function optionalEnv(name: string) {
    return process.env[`REACT_APP_${name}`];
}

function stringToBool(value: string | undefined): boolean {
    return value === 'true';
}

const HTTPS_ONLY = stringToBool(optionalEnv('HTTPS_ONLY'));

export default {
    NODE_ENV: optionalEnv('NODE_ENV'),
    HTTPS_ONLY,
    CSRF_HEADER_NAME: mandatoryEnv('CSRF_HEADER_NAME'),
    CSRF_COOKIE_NAME: HTTPS_ONLY ? '__Host-csrf' : '_csrf',
    API_URL: mandatoryEnv('API_URL'),
};
