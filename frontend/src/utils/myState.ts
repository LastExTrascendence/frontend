import { atom } from "recoil";

export const myState = atom({
  key: "myState", // 고유한 키
  // default: null, // 기본값, 여기서는 초기 user 정보를 null로 설정
  default: {
    id: "chan",
    status: "Quickly match 1:1 games.",
    profile:
      "https://cdn.intra.42.fr/users/684b78b28e8b79779609c8ed0def0ebe/chanheki.jpg",
  },
});

export default myState;
