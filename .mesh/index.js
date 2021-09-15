"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSdk = exports.getMeshSDK = exports.getBuiltMesh = exports.documentsInSDL = exports.getMeshOptions = exports.rawConfig = void 0;
const tslib_1 = require("tslib");
const runtime_1 = require("@graphql-mesh/runtime");
const store_1 = require("@graphql-mesh/store");
const path_1 = require("path");
const transpile_only_1 = (0, tslib_1.__importDefault)(require("ts-node/register/transpile-only"));
const cache_inmemory_lru_1 = (0, tslib_1.__importDefault)(require("@graphql-mesh/cache-inmemory-lru"));
const graphql_1 = (0, tslib_1.__importDefault)(require("@graphql-mesh/graphql"));
const merger_stitching_1 = (0, tslib_1.__importDefault)(require("@graphql-mesh/merger-stitching"));
const schema_graphql_js_1 = (0, tslib_1.__importDefault)(require("./sources/Login/schema.graphql.js"));
const schema_graphql_js_2 = (0, tslib_1.__importDefault)(require("./sources/Rss/schema.graphql.js"));
const importedModules = {
    // @ts-ignore
    ["ts-node/register/transpile-only"]: transpile_only_1.default,
    // @ts-ignore
    ["@graphql-mesh/cache-inmemory-lru"]: cache_inmemory_lru_1.default,
    // @ts-ignore
    ["@graphql-mesh/graphql"]: graphql_1.default,
    // @ts-ignore
    ["@graphql-mesh/merger-stitching"]: merger_stitching_1.default,
    // @ts-ignore
    [".mesh/sources/Login/schema.graphql.js"]: schema_graphql_js_1.default,
    // @ts-ignore
    [".mesh/sources/Rss/schema.graphql.js"]: schema_graphql_js_2.default
};
const baseDir = (0, path_1.join)(__dirname, '..');
const syncImportFn = (moduleId) => {
    const relativeModuleId = ((0, path_1.isAbsolute)(moduleId) ? (0, path_1.relative)(baseDir, moduleId) : moduleId).split('\\').join('/');
    if (!(relativeModuleId in importedModules)) {
        throw new Error(`Cannot find module '${relativeModuleId}'.`);
    }
    return importedModules[relativeModuleId];
};
const importFn = async (moduleId) => syncImportFn(moduleId);
const rootStore = new store_1.MeshStore('.mesh', new store_1.FsStoreStorageAdapter({
    cwd: baseDir,
    importFn,
}), {
    readonly: true,
    validate: false
});
require("ts-node/register/transpile-only");
const cache_inmemory_lru_2 = (0, tslib_1.__importDefault)(require("@graphql-mesh/cache-inmemory-lru"));
const graphql_subscriptions_1 = require("graphql-subscriptions");
const events_1 = require("events");
const utils_1 = require("@graphql-mesh/utils");
const graphql_2 = (0, tslib_1.__importDefault)(require("@graphql-mesh/graphql"));
const merger_stitching_2 = (0, tslib_1.__importDefault)(require("@graphql-mesh/merger-stitching"));
const utils_2 = require("@graphql-mesh/utils");
const additionalResolvers$0 = (0, tslib_1.__importStar)(require("../src/mesh-resolvers.ts"));
exports.rawConfig = { "require": ["ts-node/register/transpile-only"], "additionalResolvers": ["./src/mesh-resolvers.ts"], "sources": [{ "name": "Login", "handler": { "graphql": { "endpoint": "http://localhost:4000/graphql" } } }, { "name": "Rss", "handler": { "graphql": { "endpoint": "http://localhost:4001/graphql" } } }] };
async function getMeshOptions() {
    const cache = new cache_inmemory_lru_2.default({
        ...(exports.rawConfig.cache || {}),
        store: rootStore.child('cache'),
    });
    const eventEmitter = new events_1.EventEmitter({ captureRejections: true });
    eventEmitter.setMaxListeners(Infinity);
    const pubsub = new graphql_subscriptions_1.PubSub({ eventEmitter });
    const sourcesStore = rootStore.child('sources');
    const logger = new utils_1.DefaultLogger('🕸️');
    const sources = [];
    const transforms = [];
    const loginTransforms = [];
    const rssTransforms = [];
    const additionalTypeDefs = [];
    const loginHandler = new graphql_2.default({
        name: exports.rawConfig.sources[0].name,
        config: exports.rawConfig.sources[0].handler.graphql,
        baseDir,
        cache,
        pubsub,
        store: sourcesStore.child(exports.rawConfig.sources[0].name),
        logger: logger.child(exports.rawConfig.sources[0].name),
        importFn
    });
    const rssHandler = new graphql_2.default({
        name: exports.rawConfig.sources[1].name,
        config: exports.rawConfig.sources[1].handler.graphql,
        baseDir,
        cache,
        pubsub,
        store: sourcesStore.child(exports.rawConfig.sources[1].name),
        logger: logger.child(exports.rawConfig.sources[1].name),
        importFn
    });
    sources.push({
        name: 'Login',
        handler: loginHandler,
        transforms: loginTransforms
    });
    sources.push({
        name: 'Rss',
        handler: rssHandler,
        transforms: rssTransforms
    });
    const merger = new merger_stitching_2.default({
        cache,
        pubsub,
        logger: logger.child('StitchingMerger'),
        store: rootStore.child('stitchingMerger')
    });
    const additionalResolversRawConfig = [];
    additionalResolversRawConfig.push(additionalResolvers$0.resolvers || additionalResolvers$0.default || additionalResolvers$0);
    const additionalResolvers = await (0, utils_2.resolveAdditionalResolvers)(baseDir, additionalResolversRawConfig, importFn, pubsub);
    const liveQueryInvalidations = exports.rawConfig.liveQueryInvalidations;
    return {
        sources,
        transforms,
        additionalTypeDefs,
        additionalResolvers,
        cache,
        pubsub,
        merger,
        logger,
        liveQueryInvalidations,
    };
}
exports.getMeshOptions = getMeshOptions;
exports.documentsInSDL = [];
async function getBuiltMesh() {
    const meshConfig = await getMeshOptions();
    return (0, runtime_1.getMesh)(meshConfig);
}
exports.getBuiltMesh = getBuiltMesh;
async function getMeshSDK() {
    const { sdkRequester } = await getBuiltMesh();
    return getSdk(sdkRequester);
}
exports.getMeshSDK = getMeshSDK;
function getSdk(requester) {
    return {};
}
exports.getSdk = getSdk;
