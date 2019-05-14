const presets = [
    [
      "@babel/env",
      {
        targets: {
          ie:"8",  
          edge: "17",
          firefox: "60",
          chrome: "67",
          safari: "11.1",
        },
        // useBuiltIns: "usage", 
        // corejs: '3.0.0'
      },
    ],
  ];
const  plugins = 
     ['@babel/transform-runtime']  
  module.exports = { presets };