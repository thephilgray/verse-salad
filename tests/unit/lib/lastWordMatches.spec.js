import Chance from "chance";

import lastWordMatches from "@/lib/lastWordMatches";

const chance = new Chance();

describe("lastWord", () => {
  it("accepts two strings and returns true if they are the same", () => {
    const str1 = "test";
    const str2 = "test";
    const expected = true;
    const actual = lastWordMatches(str1, str2);
    expect(actual).toBe(expected);
  });
  it("returns false if the strings are not the same", () => {
    const str1 = chance.string();
    const str2 = chance.string();
    const expected = false;
    const actual = lastWordMatches(str1, str2);
    expect(actual).toBe(expected);
  });
});
