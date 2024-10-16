import config from 'eslint-config-tyler/eslint.config.mjs';

config[0].ignores = ['docs/', 'build/', 'chrome_extension/', '.parcel-cache/'];

export default config;
