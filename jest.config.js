module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  globalSetup: "jest-preset-angular/global-setup",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|mjs|js)$": "jest-preset-angular",
  },
  moduleFileExtensions: ["ts", "js", "json", "mjs"],
  transformIgnorePatterns: ["node_modules/(?!.*\\.mjs$)", "\\.html$"],
  // moduleNameMapper: {
  //   "^@src/(.*)$": "<rootDir>/src/$1",
  //   "\\.(css|scss)$": "identity-obj-proxy",
  // },
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
    "\\.html$": "jest-transform-stub", // Add this line to mock HTML files
  },
};
// module.exports = {
//   preset: "jest-preset-angular",
//   setupFilesAfterEnv: ["/project/workspace/setup-jest.ts"],
//   testPathIgnorePatterns: ["/node_modules/", "/dist/"],
//   globals: {
//     "ts-jest": {
//       tsconfig: "tsconfig.spec.json",
//     },
//   },
//   transform: {
//     '^.+\\.(ts|js)$': ['ts-jest', {
//       tsconfig: 'tsconfig.spec.json',
//       stringifyContentPathRegex: '\\.html$',  // This was previously in globals
//     }],
//   },
//   transformIgnorePatterns: ["node_modules/(?!.*\\.mjs$)", "\\.html$"],
//   moduleNameMapper: {
//     "\\.(css|scss)$": "identity-obj-proxy",
//   },
// };
