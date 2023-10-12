export const range = (start, end) => {
  return [...Array(end).keys()].map((el) => el + start);
}; //Zamienic array [6] -> [1,2,3,4,5,6]
