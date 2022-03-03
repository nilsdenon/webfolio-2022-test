import Image from "next/image";

export default function Post(data) {
  const post = data.post;
  return (
    <>
      <h1>{post.title}</h1>
      <article dangerouslySetInnerHTML={{ __html: post.content }}></article>
      <Image
        src={post.featuredImage.node.sourceUrl}
        alt={post.featuredImage.node.altText}
        width={400}
        height={400}
        layout="responsive"
        loading="lazy"
      />
    </>
  );
}

export async function getStaticProps(context) {
  const res = await fetch("https://api.nilsdenon.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query SinglePost($id: ID!, $idType: PostIdType!) {
          post(id: $id, idType: $idType) {
            title
            slug
            content
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
          }
        }`,
      variables: {
        id: context.params.slug,
        idType: "SLUG",
      },
    }),
  });
  const json = await res.json();
  return {
    props: { post: json.data.post },
  };
}

export async function getStaticPaths() {
  const res = await fetch("https://api.nilsdenon.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query AllPostsQuery {
          posts {
            nodes {
              slug
              content
              title
              featuredImage {
                node {
                  sourceUrl
                }
              }
            }
          }
        }`,
    }),
  });
  const json = await res.json();
  const posts = json.data.posts.nodes;

  const paths = posts.map((post) => ({ params: { slug: post.slug } }));

  return { paths, fallback: false };
}
