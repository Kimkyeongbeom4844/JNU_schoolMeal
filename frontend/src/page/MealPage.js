import React, { useState, useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { MenuState, DayListState } from "../state/atom";
import produce from "immer";
import { Container, Carousel } from "react-bootstrap";
import styled from "styled-components";
import MealList from "../component/MealList";

const BoldOrange = styled(Container)`
  background-color: #f57f17;
`;

const MealPage = () => {
  const [menu, setMenu] = useRecoilState(MenuState);
  const [dayList, setDayList] = useRecoilState(DayListState);
  const resetMenuState = useResetRecoilState(MenuState);
  const [today, setToday] = useState(new Date());

  useEffect(() => {
    fetch(
      `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/html`
    )
      .then((res) => res.json())
      .then((data) => {
        const word = data.trim().replace(/\ /g, "");
        let criterionStart = 0;
        let criterionEnd = 0;
        const arr = [];
        let count = 1;
        while (
          word.indexOf("특식", criterionStart) !== -1 &&
          word.indexOf("양식", criterionEnd) !== -1
        ) {
          const bringMenu = word
            .slice(
              word.indexOf("특식", criterionStart),
              word.indexOf("양식", criterionEnd)
            )
            .replace(/\n/gi, " ")
            .trim()
            .replace(/\  /gi, "$")
            .split("$");
          // console.log(bringMenu[1].split(" "));
          // console.log(bringMenu[2].trim().split(" "));
          arr.push({
            점심: bringMenu[1],
            저녁: bringMenu[2].trim(),
            요일: count,
          });
          count++;
          criterionStart = word.indexOf("특식", criterionStart) + 2;
          criterionEnd = word.indexOf("양식", criterionEnd) + 2;
        }
        // console.log(arr);
        // console.log(new Date().getDay());
        let arr2 = [];
        let arr3 = [];
        arr.map((v, i) => {
          if (v.요일 < new Date().getDay()) {
            arr2.push(v);
          } else {
            arr3.push(v);
          }
        });
        // console.log(arr2, arr3);
        // console.log(arr3.concat(...arr2));
        setMenu(
          produce(menu, (draft) => {
            draft.push(...arr3.concat(...arr2));
          })
        );
      });

    return resetMenuState;
  }, []);

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
    </>
  );
};

export default MealPage;
