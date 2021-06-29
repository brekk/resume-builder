// via: https://mdxjs.com/getting-started/
import { curry } from "ramda";
import babel from "@babel/core";
import React from "react";
import PDF from "@react-pdf/renderer";
import mdx from "@mdx-js/mdx";
import { MDXProvider, mdx as createElement } from "@mdx-js/react";

const { PDFViewer, render, Document, Page, Text, StyleSheet, View } = PDF;

const transform = code =>
  babel.transform(code, {
    plugins: [
      "@babel/plugin-transform-react-jsx",
      "@babel/plugin-proposal-object-rest-spread",
    ],
  }).code;

const styles = StyleSheet.create({
  page: {
    backgroundColor: "red",
    flexDirection: "row",
  },
});

export const renderPDF = curry(async (file, mdxCode) => {
  const jsx = await mdx(mdxCode, { skipExport: true });
  const code = transform(jsx);
  const scope = { mdx: createElement };

  const fn = new Function(
    "React",
    ...Object.keys(scope),
    `${code}; return React.createElement(MDXContent)`
  );

  const element = fn(React, ...Object.values(scope));
  /* eslint-disable react/display-name */
  /* eslint-disable react/prop-types */
  const wrapper = props =>
    React.createElement(
      PDFViewer,
      null,
      React.createElement(
        Document,
        null,
        React.createElement(
          Page,
          { size: "A4", style: styles.page },
          props.children
        )
      )
    );

  const components = {
    h1: ({ children }) =>
      React.createElement("h1", { style: { color: "tomato" } }, children),
    p: View,
    span: Text,
  };
  /* eslint-enable react/display-name */
  /* eslint-enable react/prop-types */

  const elementWithProvider = React.createElement(
    MDXProvider,
    { components, wrapper },
    element
  );

  render(elementWithProvider, file);
});
