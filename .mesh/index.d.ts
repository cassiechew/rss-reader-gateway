import { GraphQLResolveInfo } from 'graphql';
import { DocumentNode } from 'graphql';
export declare type Maybe<T> = T | null;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export declare type RequireFields<T, K extends keyof T> = {
    [X in Exclude<keyof T, K>]?: T[X];
} & {
    [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};
export declare type Query = {
    login: LoginResponse;
    load: Scalars['String'];
    rss: Array<Array<Scalars['String']>>;
};
export declare type QueryloginArgs = {
    password: Scalars['String'];
    username: Scalars['String'];
};
export declare type QueryloadArgs = {
    feed: Scalars['String'];
};
export declare type QueryrssArgs = {
    user: Scalars['String'];
};
export declare type Mutation = {
    addOrCreateUser: UserResponse;
    addOrCreateFeed: FeedUpdateResponse;
};
export declare type MutationaddOrCreateUserArgs = {
    email: Scalars['String'];
    lastName: Scalars['String'];
    firstName: Scalars['String'];
    password: Scalars['String'];
    username: Scalars['String'];
};
export declare type MutationaddOrCreateFeedArgs = {
    user: Scalars['String'];
    feed: Scalars['String'];
    feedName: Scalars['String'];
};
export declare type LoginResponse = {
    success: Scalars['Boolean'];
    message?: Maybe<Scalars['String']>;
};
export declare type UserResponse = {
    success: Scalars['Boolean'];
    message?: Maybe<Scalars['String']>;
    user?: Maybe<User>;
};
export declare type User = {
    id: Scalars['ID'];
    firstName: Scalars['String'];
    lastName: Scalars['String'];
    email: Scalars['String'];
};
export declare type FeedUpdateResponse = {
    success: Scalars['Boolean'];
    message?: Maybe<Scalars['String']>;
};
export declare type WithIndex<TObject> = TObject & Record<string, any>;
export declare type ResolversObject<TObject> = WithIndex<TObject>;
export declare type ResolverTypeWrapper<T> = Promise<T> | T;
export declare type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export declare type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
    fragment: string;
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export declare type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
    selectionSet: string;
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export declare type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export declare type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs> | StitchingResolver<TResult, TParent, TContext, TArgs>;
export declare type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult;
export declare type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;
export declare type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<{
        [key in TKey]: TResult;
    }, TParent, TContext, TArgs>;
    resolve?: SubscriptionResolveFn<TResult, {
        [key in TKey]: TResult;
    }, TContext, TArgs>;
}
export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}
export declare type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> = SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs> | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;
export declare type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> = ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>) | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;
export declare type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (parent: TParent, context: TContext, info: GraphQLResolveInfo) => Maybe<TTypes> | Promise<Maybe<TTypes>>;
export declare type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;
export declare type NextResolverFn<T> = () => Promise<T>;
export declare type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (next: NextResolverFn<TResult>, parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
/** Mapping between all available schema types and the resolvers types */
export declare type ResolversTypes = ResolversObject<{
    Query: ResolverTypeWrapper<{}>;
    Mutation: ResolverTypeWrapper<{}>;
    LoginResponse: ResolverTypeWrapper<LoginResponse>;
    Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
    String: ResolverTypeWrapper<Scalars['String']>;
    UserResponse: ResolverTypeWrapper<UserResponse>;
    User: ResolverTypeWrapper<User>;
    ID: ResolverTypeWrapper<Scalars['ID']>;
    FeedUpdateResponse: ResolverTypeWrapper<FeedUpdateResponse>;
}>;
/** Mapping between all available schema types and the resolvers parents */
export declare type ResolversParentTypes = ResolversObject<{
    Query: {};
    Mutation: {};
    LoginResponse: LoginResponse;
    Boolean: Scalars['Boolean'];
    String: Scalars['String'];
    UserResponse: UserResponse;
    User: User;
    ID: Scalars['ID'];
    FeedUpdateResponse: FeedUpdateResponse;
}>;
export declare type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
    login?: Resolver<ResolversTypes['LoginResponse'], ParentType, ContextType, RequireFields<QueryloginArgs, 'password' | 'username'>>;
    load?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<QueryloadArgs, 'feed'>>;
    rss?: Resolver<Array<Array<ResolversTypes['String']>>, ParentType, ContextType, RequireFields<QueryrssArgs, 'user'>>;
}>;
export declare type MutationResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
    addOrCreateUser?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationaddOrCreateUserArgs, 'email' | 'lastName' | 'firstName' | 'password' | 'username'>>;
    addOrCreateFeed?: Resolver<ResolversTypes['FeedUpdateResponse'], ParentType, ContextType, RequireFields<MutationaddOrCreateFeedArgs, 'user' | 'feed' | 'feedName'>>;
}>;
export declare type LoginResponseResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['LoginResponse'] = ResolversParentTypes['LoginResponse']> = ResolversObject<{
    success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export declare type UserResponseResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['UserResponse'] = ResolversParentTypes['UserResponse']> = ResolversObject<{
    success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export declare type UserResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export declare type FeedUpdateResponseResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['FeedUpdateResponse'] = ResolversParentTypes['FeedUpdateResponse']> = ResolversObject<{
    success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export declare type Resolvers<ContextType = MeshContext> = ResolversObject<{
    Query?: QueryResolvers<ContextType>;
    Mutation?: MutationResolvers<ContextType>;
    LoginResponse?: LoginResponseResolvers<ContextType>;
    UserResponse?: UserResponseResolvers<ContextType>;
    User?: UserResolvers<ContextType>;
    FeedUpdateResponse?: FeedUpdateResponseResolvers<ContextType>;
}>;
import { MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { InContextSdkMethod } from '@graphql-mesh/types';
export declare type QueryLoginSdk = {
    login: InContextSdkMethod<Query['login'], QueryloginArgs, MeshContext>;
};
export declare type MutationLoginSdk = {
    addOrCreateUser: InContextSdkMethod<Mutation['addOrCreateUser'], MutationaddOrCreateUserArgs, MeshContext>;
};
export declare type SubscriptionLoginSdk = {};
export declare type QueryRssSdk = {
    load: InContextSdkMethod<Query['load'], QueryloadArgs, MeshContext>;
    rss: InContextSdkMethod<Query['rss'], QueryrssArgs, MeshContext>;
};
export declare type MutationRssSdk = {
    addOrCreateFeed: InContextSdkMethod<Mutation['addOrCreateFeed'], MutationaddOrCreateFeedArgs, MeshContext>;
};
export declare type SubscriptionRssSdk = {};
export declare type LoginContext = {
    ["Login"]: {
        Query: QueryLoginSdk;
        Mutation: MutationLoginSdk;
        Subscription: SubscriptionLoginSdk;
    };
};
export declare type RssContext = {
    ["Rss"]: {
        Query: QueryRssSdk;
        Mutation: MutationRssSdk;
        Subscription: SubscriptionRssSdk;
    };
};
export declare type MeshContext = LoginContext & RssContext & BaseMeshContext;
import { GetMeshOptions } from '@graphql-mesh/runtime';
import { YamlConfig } from '@graphql-mesh/types';
import 'ts-node/register/transpile-only';
export declare const rawConfig: YamlConfig.Config;
export declare function getMeshOptions(): GetMeshOptions;
export declare const documentsInSDL: any[];
export declare function getBuiltMesh(): Promise<MeshInstance>;
export declare function getMeshSDK(): Promise<{}>;
export declare type Requester<C = {}> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R>;
export declare function getSdk<C>(requester: Requester<C>): {};
export declare type Sdk = ReturnType<typeof getSdk>;
