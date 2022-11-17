import { atom } from "recoil";

export const MenuState = atom({
  key: "MenuState",
  default: [],
});

export const DayListState = atom({
  key: "dayListState",
  default: {
    0: "일",
    1: "월",
    2: "화",
    3: "수",
    4: "목",
    5: "금",
    6: "토",
  },
});
