import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject} from "@apollo/client";

let apolloClient: ApolloClient<NormalizedCacheObject>;
const isBrowser = typeof window === 'undefined';

function createApolloClient() {
    try {
        return new ApolloClient({
            ssrMode: !isBrowser,
            link: new HttpLink({
                // uri: "/api/graphql/",
                uri: "http://localhost:4000",
            }),
            cache: new InMemoryCache({
                typePolicies: {
                    Project: {
                        keyFields: ["name"],
                    },
                },
            }),
        });
    } catch (error) {
        console.error("fail to create apollo client", error)
    }
}

export const initializeApollo = (
    initialState: NormalizedCacheObject | null = null
): ApolloClient<NormalizedCacheObject> => {
    const _apolloClient = apolloClient ?? createApolloClient();

    if (initialState) {
        _apolloClient.cache.restore(initialState);
    }
    if (!isBrowser) return _apolloClient;
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
};

export const useApollo = (
    initialState: NormalizedCacheObject
): ApolloClient<NormalizedCacheObject> => {
    const store = useMemo(() => initializeApollo(initialState), [initialState]);
    return store;
};
