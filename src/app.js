const { algoliasearch, instantsearch } = window;

const searchClient = algoliasearch(
  'JV553J88S0',
  '91fbc373b0dd27356e8336d7a6589a33'
);

const search = instantsearch({
  indexName: 'blog-astro',
  searchClient,
  future: { preserveSharedStateOnUnmount: true },
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: (hit, { html, components }) => html`
        <article>
          <img src=${hit.frontmatter.image.url} alt=${hit.frontmatter.title} />
          <div>
            <h1>
              ${components.Highlight({ hit, attribute: 'frontmatter.title' })}
            </h1>
            <p>
              ${components.Highlight({ hit, attribute: 'frontmatter.pubDate' })}
            </p>
            <p>
              ${components.Highlight({
                hit,
                attribute: 'frontmatter.description',
              })}
            </p>
          </div>
        </article>
      `,
    },
  }),
  instantsearch.widgets.configure({
    hitsPerPage: 8,
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

search.start();
