import React from "react";
import { Document, Page, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "red",
    flexDirection: "row",
  },
});

/* eslint-disable react/prop-types */
const Wrapper = props => (
  <Document>
    <Page size="A4" style={styles.page}>
      {props.children}
    </Page>
  </Document>
);
/* eslint-enable react/prop-types */

export default Wrapper;
