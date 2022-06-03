import React from "react";
import algoliasearch from "algoliasearch";
import { Hits, InstantSearch, SearchBox } from "react-instantsearch-hooks-web";
import { GetStaticProps } from "next/types";
import debounce from "lodash.debounce";

const Search: React.FC<any> = ({ applicationId, searchApiKey }) => {
  const client = algoliasearch(applicationId, searchApiKey);

  return (
    <InstantSearch searchClient={client} indexName="skillrs">
      <SearchBox
        queryHook={debounce((query: string, hook: (value: string) => void) => {
          if (query.length < 3) {
            return;
          }
          hook(query);
        }, 500)}
      />
      <Hits />
    </InstantSearch>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { ALGOLIA_APPLICATION_ID, ALGOLIA_SEARCH_API_KEY } = process.env;
  return {
    props: {
      applicationId: ALGOLIA_APPLICATION_ID,
      searchApiKey: ALGOLIA_SEARCH_API_KEY,
    },
    revalidate: 420, // revalidate every 7 minutes
  };
};

export default Search;
