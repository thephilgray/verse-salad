export default str =>
  str
    .replace(/[^\w\s]|_/g, "")
    .split(" ")
    .filter(word => /[\w]/g.test(word))
    .pop();
