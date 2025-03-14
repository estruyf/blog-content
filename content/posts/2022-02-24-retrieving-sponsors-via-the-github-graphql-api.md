---
title: "#DevHack: Fetching sponsors via the GitHub GraphQL API"
date: "2022-02-24T11:36:20.956Z"
draft: false
type: "post"
description: "In this article Elio explains how you can retrieve your sponsors for your open-source projects via the GitHub GraphQL API."
lastmod: "2022-02-24T11:36:20.956Z"
tags:
  - "Development"
  - "GitHub"
  - "GraphQL"
  - "API"
categories: []
slug: "/devhack-fetching-sponsors-github-graphql-api/"
keywords:
  - "graphql"
preview: "/social/c4a58b26-3251-4762-ab44-54abd70be4c1.png"
comments: true
---

To automate the roll-up of sponsors for [Front Matter](https://frontmatter.codes) on the website. I started to look through the GitHub Rest API documentation to check it could receive this kind of information. Unfortunately, the Rest API does not provide you with this information, so I went to where the cool kids go these days, GraphQL. The [GitHub GraphQL API]( https://docs.github.com/en/graphql) delivers you more precise and flexible queries and is your go-to place these days.

{{< blockquote type="info" text="The best part of the GitHub GraphQL is a [GraphQL Explorer]( https://docs.github.com/en/graphql/overview/explorer) available, allowing you to try out your queries." >}}

GraphQL Explorer is excellent when you have never worked with the API. Via the explorer, I found the correct query to use.

## Authentication

To retrieve your sponsors, you first need to have an OAuth Token. For this, you can create a personal access token. You can follow the steps in "[Creating a personal access token]( https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)" documentation.

{{< blockquote type="important" text="Make sure you select `read:user` and `read:email` to retrieve the sponsor information." >}}

## Fetching the GraphQL data

The GraphQL query for retrieving your sponsors looks as follows:
 
```graphql
query SponsorQuery {
  viewer {
    sponsors(first: 100) {
      edges {
        node {
          ... on User {
            id
            name
            url
            avatarUrl
          }
        }
      }
    }
  }
}
```

On the Front Matter website, I retrieve this information via my custom API, which performs a POST request to the `https://api.github.com/graphql` API.

The code looks as follows:

```typescript
const response = await fetch(`https://api.github.com/graphql`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `token ${process.env.GITHUB_AUTH}`
  },
  body: JSON.stringify({
    query: `query SponsorQuery {
      viewer {
        sponsors(first: 100) {
          edges {
            node {
              ... on User {
                id
                name
                url
                avatarUrl
              }
            }
          }
        }
      }
    }`
  })
});

if (response && response.ok) {
  const data = await response.json();
  // Start working with the data
}
```

{{< blockquote type="info" text="If you want, you can check out the API code for the website. You can see the [sponsor API](https://github.com/FrontMatter/web-documentation-nextjs/blob/main/pages/api/sponsors.ts) file." >}}
