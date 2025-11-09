export default {
    testEnvironment: "node",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.mjs"],
    transform: {}, // disable Babel transform since we use native ESM
    extensionsToTreatAsEsm: [".js"],

    // make Jest treat .js files as ESM
};
