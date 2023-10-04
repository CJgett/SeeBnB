module.exports = {
  pathPrefix: `/SeeBnB_io`,
  siteMetadata: {
    title: `SeeBnB`,
    description: ``,
    author: `@CJgett`,
  },
  flags: {
      DEV_SSR: true 
  },
  plugins: [
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "content",
        path: `${__dirname}/src/content`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-prismjs`]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `seebnb`,
        short_name: `seebnb`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `fullscreen`,
        icon: `src/images/favicon.png`
      }
    },
    `gatsby-plugin-offline`
  ]
};
