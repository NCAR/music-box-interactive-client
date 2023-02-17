const React = require("react");

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "webpack5"
  },
  // webpackFinal: async config => {
  //   // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
  //   config.module.rules[0].exclude = [/node_modules\/(?!(gatsby|gatsby-script)\/)/]
  //   // Use correct react-dom depending on React version.
  //   if (parseInt(React.version) <= 18) {
  //     config.externals = ["react-dom/client"];
  //   }
  //   // Remove core-js to prevent issues with Storybook
  //   config.module.rules[0].exclude= [/core-js/]
  //   // Use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
  //   config.module.rules[0].use[0].options.plugins.push(
  //     require.resolve("babel-plugin-remove-graphql-queries")
  //   )
  //   config.resolve.mainFields=["browser", "module", "main"]
  //   return config
  webpackFinal: async config => {
    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/]

    // Use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
    config.module.rules[0].use[0].loader = require.resolve("babel-loader")

    // Use @babel/preset-react for JSX and env (instead of staged presets)
    config.module.rules[0].use[0].options.presets = [
      require.resolve("@babel/preset-react"),
      require.resolve("@babel/preset-env"),
    ]

    config.module.rules[0].use[0].options.plugins = [
      // Use @babel/plugin-proposal-class-properties for class arrow functions
      require.resolve("@babel/plugin-proposal-class-properties"),

      // Use babel-plugin-remove-graphql-queries to remove graphql queries from components when rendering in Storybook
      // While still rendering content from useStaticQuery in development mode
      [
        require.resolve("babel-plugin-remove-graphql-queries"),
        {
          stage: config.mode === `development` ? "develop-html" : "build-html",
          staticQueryDir: "page-data/sq/d",
        },
      ],
    ]

    return config
  },
}