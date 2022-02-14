import { GatsbyConfig } from "gatsby";
import path from "path"

const gatsbyConfig: GatsbyConfig = {
  siteMetadata: {
    title: ``,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `dune`,
        // `${__dirname}/data` not working
        path: `./data`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.resolve(`src/images`),
      },
    },
  ]
}

export default gatsbyConfig