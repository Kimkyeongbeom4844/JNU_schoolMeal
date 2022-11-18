import React, { useEffect } from "react";
import { Carousel, OverlayTrigger, Tooltip } from "react-bootstrap";
import produce from "immer";
import { useRecoilState, useResetRecoilState, useRecoilValue } from "recoil";
import { MenuState, DayListState } from "../state/atom";
import LoadEffect from "./LoadEffect";
import { getMenu } from "../api/api";

const MealList = () => {
  const [menu, setMenu] = useRecoilState(MenuState);
  const dayList = useRecoilValue(DayListState);
  const resetMenuState = useResetRecoilState(MenuState);

  useEffect(() => {
    getMenu().then((data) => {
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

  if (menu.length === 0) {
    return <LoadEffect />;
  }

  return (
    <Carousel variant="dark" fade>
      {menu.map((v, i) => (
        <Carousel.Item className="bg-white">
          <OverlayTrigger
            placement="top"
            delay={{ show: 100, hide: 100 }}
            overlay={
              <Tooltip>
                해당 식단은 <b>이번주</b> 기준입니다!
              </Tooltip>
            }
          >
            <h2 className="d-flex justify-content-center fw-bolder">
              {dayList[v.요일]}요일
            </h2>
          </OverlayTrigger>
          <div className="d-flex justify-content-around pb-3">
            <div>
              {v.점심.split(" ").map((v, i) => (
                <h4 className="fw-bold">{v}</h4>
              ))}
            </div>
            <div>
              {v.저녁.split(" ").map((v, i) => (
                <h4 className="fw-bold">{v}</h4>
              ))}
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default MealList;
