import React from "react";

import Header from "../parts/Header";

import Sitemap from "../parts/HomePage/Sitemap";
import Footer from "../parts/Footer";
import PageErrorMassage from "../parts/PageErrorMassage";

export default function NotFound() {
  return (
    <>
      <Header theme="black" />

      <PageErrorMassage />

      <Sitemap />
      <Footer />
    </>
  );
}
