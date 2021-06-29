// via: https://mdxjs.com/getting-started/
import babel from "@babel/core";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import mdx from "@mdx-js/mdx";
import { MDXProvider, mdx as createElement } from "@mdx-js/react";

const transform = code =>
  babel.transform(code, {
    plugins: [
      "@babel/plugin-transform-react-jsx",
      "@babel/plugin-proposal-object-rest-spread",
    ],
  }).code;

export const renderWithReact = async mdxCode => {
  const jsx = await mdx(mdxCode, { skipExport: true });
  const code = transform(jsx);
  const scope = { mdx: createElement };

  const fn = new Function(
    "React",
    ...Object.keys(scope),
    `${code}; return React.createElement(MDXContent)`
  );

  const element = fn(React, ...Object.values(scope));
  const components = {
    /* eslint-disable react/display-name */
    /* eslint-disable react/prop-types */
    h1: ({ children }) =>
      React.createElement("h1", { style: { color: "tomato" } }, children),
    /* eslint-enable react/display-name */
    /* eslint-enable react/prop-types */
  };

  const elementWithProvider = React.createElement(
    MDXProvider,
    { components },
    element
  );

  const results = renderToStaticMarkup(elementWithProvider);
  return results;
};
