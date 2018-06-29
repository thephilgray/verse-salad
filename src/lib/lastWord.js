export default str =>
  str
    .replace(/[^\w\s]|_/g, "")
    .split(" ")
    .pop();
