import lastWord from "./lastWord";
export default function(machineLine, userLine) {
  return lastWord(machineLine) === lastWord(userLine);
}
