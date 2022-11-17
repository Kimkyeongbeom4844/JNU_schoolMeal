import React, { useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { MenuState } from "../state/atom";
import produce from "immer";
import { Container } from "react-bootstrap";

const dayList = {
  0: "월요일",
  1: "화요일",
  2: "수요일",
  3: "목요일",
  4: "금요일",
  5: "토요일",
  6: "일요일",
};

const MealPage = () => {
  const [menu, setMenu] = useRecoilState(MenuState);
  const resetMenuState = useResetRecoilState(MenuState);
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
          console.log(...arr);
          count++;
          criterionStart = word.indexOf("특식", criterionStart) + 2;
          criterionEnd = word.indexOf("양식", criterionEnd) + 2;
        }
        setMenu(
          produce(menu, (draft) => {
            draft.push(...arr);
          })
        );
      });

    return resetMenuState;
  }, []);

  return (
    <Container fluid="xl">
      <div className="d-flex justify-content-around">
        <div className="flex-shrink-0">
          <h1 className="text-center">점심</h1>
          <ul>
            {menu.map((v, i) => (
              <>
                <hr />
                {v.점심.split(" ").map((v, i) => (
                  <>
                    <li>{v}</li>
                  </>
                ))}
              </>
            ))}
          </ul>
        </div>
        <div className="flex-shrink-0">
          <h1>저녁</h1>
          <ul>
            {menu.map((v, i) => (
              <>
                <hr />
                {v.저녁.split(" ").map((v, i) => (
                  <>
                    <li>{v}</li>
                  </>
                ))}
              </>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default MealPage;
