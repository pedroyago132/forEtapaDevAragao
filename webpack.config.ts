module.exports = {
    // ... outras configurações do Webpack ...
  
    resolve: {
      fallback: {
        "util": require.resolve("util/"),
      },
    },
  
    // ... outras configurações do Webpack ...
  };