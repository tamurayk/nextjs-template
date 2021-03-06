module.exports = {
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      corejs: 3,
    }],
    ['@babel/preset-typescript', {
      isTSX: true,
      allExtensions: true
    }],
    '@babel/preset-react'
  ],
  plugins: [
    ["@babel/plugin-proposal-class-properties", {"loose": true}],
    ["babel-plugin-styled-components", { "ssr": true, "displayName": true, "preprocess": false }],
    [
      "module-resolver",
      {
        "alias": {
          "~": "./src/"
        }
      }
    ]
  ],
  babelrc: false,
}
