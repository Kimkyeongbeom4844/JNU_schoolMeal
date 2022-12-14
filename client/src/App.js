import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MealPage from "./page/MealPage";
import NotFound from "./page/NotFound";
import { RecoilRoot } from "recoil";
import { GlobalStyle } from "./style/Style";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <RecoilRoot>
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<MealPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </RecoilRoot>
      </BrowserRouter>
    </>
  );
};

export default App;
