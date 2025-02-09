export const transInstrument = (instrument: string) => {
  switch (instrument) {
    case "vocal":
      return "보컬";
    case "guitar":
      return "기타";
    case "bass":
      return "베이스";
    case "keyboard":
      return "키보드";
    case "drum":
      return "드럼";
    default:
      return "악기";
  }
};
export const transInstrumentToEng = (instrument: string) => {
  switch (instrument) {
    case "보컬":
      return "vocal";
    case "기타":
      return "guitar";
    case "베이스":
      return "bass";
    case "키보드":
      return "keyboard";
    case "드럼":
      return "drum";
    default:
      return "";
  }
};
