module.exports = {
  plugins: [require.resolve("@prettier/plugin-wxml")],
  overrides: [
    {
      files: "*.wxml",
      options: {
        printWidth: 120,
        attributeSort: {
          order: ["^wx:", "^bind", "^catch", "^class$", "^style$", "^data-"],
          separator: "none",
        },
      },
    },
    {
      files: "*.wxss",
      options: {
        cssWhitespace: "strict",
      },
    },
  ],
};
