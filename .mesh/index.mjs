import { getMesh } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { join, relative, isAbsolute, dirname } from 'path';
import { fileURLToPath } from 'url';
import ExternalModule_0 from 'ts-node/register/transpile-only';
import ExternalModule_1 from '@graphql-mesh/cache-inmemory-lru';
import ExternalModule_2 from '@graphql-mesh/graphql';
import ExternalModule_3 from '@graphql-mesh/merger-stitching';
import ExternalModule_4 from './sources/Login/schema.graphql.js';
import ExternalModule_5 from './sources/Rss/schema.graphql.js';
const importedModules = {
    // @ts-ignore
    ["ts-node/register/transpile-only"]: ExternalModule_0,
    // @ts-ignore
    ["@graphql-mesh/cache-inmemory-lru"]: ExternalModule_1,
    // @ts-ignore
    ["@graphql-mesh/graphql"]: ExternalModule_2,
    // @ts-ignore
    ["@graphql-mesh/merger-stitching"]: ExternalModule_3,
    // @ts-ignore
    [".mesh/sources/Login/schema.graphql.js"]: ExternalModule_4,
    // @ts-ignore
    [".mesh/sources/Rss/schema.graphql.js"]: ExternalModule_5
};
const baseDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const syncImportFn = (moduleId) => {
    const relativeModuleId = (isAbsolute(moduleId) ? relative(baseDir, moduleId) : moduleId).split('\\').join('/');
    if (!(relativeModuleId in importedModules)) {
        throw new Error(`Cannot find module '${relativeModuleId}'.`);
    }
    return importedModules[relativeModuleId];
};
const importFn = async (moduleId) => syncImportFn(moduleId);
const rootStore = new MeshStore('.mesh', new FsStoreStorageAdapter({
    cwd: baseDir,
    importFn,
}), {
    readonly: true,
    validate: false
});
import 'ts-node/register/transpile-only';
import MeshCache from '@graphql-mesh/cache-inmemory-lru';
import { PubSub } from 'graphql-subscriptions';
import { EventEmitter } from 'events';
import { DefaultLogger } from '@graphql-mesh/utils';
import GraphqlHandler from '@graphql-mesh/graphql';
import StitchingMerger from '@graphql-mesh/merger-stitching';
import { resolveAdditionalResolvers } from '@graphql-mesh/utils';
import * as additionalResolvers$0 from '../src/mesh-resolvers.ts';
export const rawConfig = { "require": ["ts-node/register/transpile-only"], "additionalResolvers": ["./src/mesh-resolvers.ts"], "sources": [{ "name": "Login", "handler": { "graphql": { "endpoint": "http://localhost:4000/graphql" } } }, { "name": "Rss", "handler": { "graphql": { "endpoint": "http://localhost:4001/graphql" } } }] };
export async function getMeshOptions() {
    const cache = new MeshCache({
        ...(rawConfig.cache || {}),
        store: rootStore.child('cache'),
    });
    const eventEmitter = new EventEmitter({ captureRejections: true });
    eventEmitter.setMaxListeners(Infinity);
    const pubsub = new PubSub({ eventEmitter });
    const sourcesStore = rootStore.child('sources');
    const logger = new DefaultLogger('🕸️');
    const sources = [];
    const transforms = [];
    const loginTransforms = [];
    const rssTransforms = [];
    const additionalTypeDefs = [];
    const loginHandler = new GraphqlHandler({
        name: rawConfig.sources[0].name,
        config: rawConfig.sources[0].handler.graphql,
        baseDir,
        cache,
        pubsub,
        store: sourcesStore.child(rawConfig.sources[0].name),
        logger: logger.child(rawConfig.sources[0].name),
        importFn
    });
    const rssHandler = new GraphqlHandler({
        name: rawConfig.sources[1].name,
        config: rawConfig.sources[1].handler.graphql,
        baseDir,
        cache,
        pubsub,
        store: sourcesStore.child(rawConfig.sources[1].name),
        logger: logger.child(rawConfig.sources[1].name),
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
    const merger = new StitchingMerger({
        cache,
        pubsub,
        logger: logger.child('StitchingMerger'),
        store: rootStore.child('stitchingMerger')
    });
    const additionalResolversRawConfig = [];
    additionalResolversRawConfig.push(additionalResolvers$0.resolvers || additionalResolvers$0.default || additionalResolvers$0);
    const additionalResolvers = await resolveAdditionalResolvers(baseDir, additionalResolversRawConfig, importFn, pubsub);
    const liveQueryInvalidations = rawConfig.liveQueryInvalidations;
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
export const documentsInSDL = /*#__PURE__*/ [];
export async function getBuiltMesh() {
    const meshConfig = await getMeshOptions();
    return getMesh(meshConfig);
}
export async function getMeshSDK() {
    const { sdkRequester } = await getBuiltMesh();
    return getSdk(sdkRequester);
}
export function getSdk(requester) {
    return {};
}
