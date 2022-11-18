import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { DayListState } from "../state/atom";
import { Container } from "react-bootstrap";
import MealList from "../component/MealList";
import Footer from "../component/Footer";
import { BoldOrange } from "../style/Style";
import LoadEffect from "../component/LoadEffect";
// const MealList = lazy(() => import("../component/MealList"));

const MealPage = () => {
  const [dayList, setDayList] = useRecoilState(DayListState);
  const [today, setToday] = useState(new Date());

  return (
    <>
      <BoldOrange fluid>
        <Container fluid="xl" className="d-flex mb-3 justify-content-between">
          <h1 className="pt-4 pb-5 fw-bold">오늘의 학식🍚</h1>
          <h1 className="pt-4 pb-5 fw-bold">
            {today.getFullYear()}-{today.getMonth() + 1}-{today.getDate()} (
            {dayList[today.getDay()]})
          </h1>
        </Container>
      </BoldOrange>
      <Container fluid="xxl" className="border rounded py-3">
        <div className="d-flex justify-content-around pb-4">
          <div className="flex-shrink-0">
            <h1 className="text-center fw-bolder">점심🕛</h1>
          </div>
          <div className="flex-shrink-0">
            <h1 className="text-center fw-bolder">저녁🕠</h1>
          </div>
        </div>
        <MealList />
      </Container>
      <Footer />
    </>
  );
};

export default MealPage;
