import React from "react";
import Helmet from "react-helmet";

const description =
  "Visualizer for the Branch and Bound algorithm, used to solve the Traveling Salesman Problem.";

export const SEO = ({ subtitle }) => {
  return (
    <Helmet
      title={`SeeBnB`}
      htmlAttributes={{ lang: "en" }}
    >
      <meta name="description" content={description} />

      <meta
        property="og:title"
        content={`Branch and Bound Visualizer`}
      />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
};
