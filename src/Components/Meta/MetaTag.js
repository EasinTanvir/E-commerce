import React from "react";
import { Helmet } from "react-helmet";

const MetaTag = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};
MetaTag.defaultProps = {
  title: "Welcome to Proshop",
  description: "We sell the best product for cheap price",
  keywords: "electronics, mobile",
};

export default MetaTag;
