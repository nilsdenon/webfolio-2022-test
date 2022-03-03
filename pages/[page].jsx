export const Page = (data) => {
  return <h1>Page</h1>;
};

export default Page;

export async function getStaticProps() {
  const res = await fetch("https://api.nilsdenon.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query AllPagesQuery {
          pages {
            nodes {
              id
              title
              slug
              content
            }
          }
        }`,
    }),
  });
  const json = await res.json();
  return {
    props: { pages: json.data.pages },
  };
}
