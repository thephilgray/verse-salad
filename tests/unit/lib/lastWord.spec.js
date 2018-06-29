import lastWord from "@/lib/lastWord";

describe("lastWord", () => {
  it("accepts a string as an argument and returns the last word of that string", () => {
    const str = "All stops as if no bird was anywhere.";
    const expected = "anywhere";
    const actual = lastWord(str);
    expect(actual).toBe(expected);
  });
  it("only retuns the last word when the string ends in punctuation", () => {
    const str = "Hail to thee, blithe Spirit!";
    const expected = "Spirit";
    const actual = lastWord(str);
    expect(actual).toBe(expected);
  });
  it("only retuns the last word when the string ends in a whitespace", () => {
    const str = "Hail to thee, blithe Spirit! ";
    const expected = "Spirit";
    const actual = lastWord(str);
    expect(actual).toBe(expected);
  });
});
