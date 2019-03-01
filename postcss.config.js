module.exports = (ctx) => ({
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {},
    'cssnano': ctx.env === 'production' ? {} : false
  }
});
