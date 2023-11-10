/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
  serverDependenciesToBundle: [
    "remix-i18next",
    "accept-language-parser",
  ],
  browserNodeBuiltinsPolyfill: {
    modules: {
      path: true,
    },
  },
};
