import React from "react";
import { Carousel } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { MenuState, DayListState } from "../state/atom";

const MealList = () => {
  const [menu, setMenu] = useRecoilState(MenuState);
  const [dayList, setDayList] = useRecoilState(DayListState);

  return (
    <Carousel variant="dark" fade>
      {menu.map((v, i) => (
        <Carousel.Item className="bg-white">
          <h2 className="d-flex justify-content-center pb-4">
            {dayList[v.요일]}요일
          </h2>
          <div className="d-flex justify-content-evenly">
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
