<template lang="pug">
  main.app__main
    ProgressBar(:percentage="50")
    EndWord(:word="currentLastWordInPoemLine" v-if="!poemComplete")
    UserPoemPreview(:userPoem="userPoem" :writingMode="!poemComplete")
    CurrentLine(v-if="!poemComplete" @onUpdateCurrentLine="updateSyllables" :isValid="userLineIsValid")
    template(v-if="!poemComplete")
      LineNumber(:total="totalNumberOfLines" :linesComplete="linesComplete")
      SyllablesCount(:complete="Number(syllablesComplete)" :total="Number(totalNumberOfSyllables)" :isValid="userLineIsValid")
      EndWordCheck(:matches="endWordMatches")
    StatusMessage(:message="statusMessage")
</template>

<script>
import EndWord from "@/components/EndWord";
import ProgressBar from "@/components/ProgressBar";
import UserPoemPreview from "@/components/UserPoemPreview";
import CurrentLine from "@/components/CurrentLine";
import SyllablesCount from "@/components/SyllablesCount";
import EndWordCheck from "@/components/EndWordCheck";
import LineNumber from "@/components/LineNumber";
import StatusMessage from "@/components/StatusMessage";

import numberOfSyllables from "@/lib/numberOfSyllables";
import lastWordMatches from "@/lib/lastWordMatches";
import lastWord from "@/lib/lastWord";

export default {
  name: "app",
  components: {
    EndWord,
    ProgressBar,
    UserPoemPreview,
    CurrentLine,
    SyllablesCount,
    EndWordCheck,
    LineNumber,
    StatusMessage
  },
  data() {
    return {
      syllablesComplete: 0,
      currentLineNumber: 0,
      currentUserInput: "",
      userPoem: [],
      // here fore mocking
      poem: {
        title: "Early Nightingale",
        author: "John Clare",
        lines: [
          "When first we hear the shy-come nightingales,",
          "They seem to mutter oer their songs in fear,",
          "And, climb we eer so soft the spinney rails,",
          "All stops as if no bird was anywhere.",
          "The kindled bushes with the young leaves thin",
          "Let curious eyes to search a long way in,",
          "Until impatience cannot see or hear",
          "The hidden music; gets but little way",
          "Upon the path--when up the songs begin,",
          "Full loud a moment and then low again.",
          "But when a day or two confirms her stay",
          "Boldly she sings and loud for half the day;",
          "And soon the village brings the woodman's tale",
          "Of having heard the newcome nightingale."
        ],
        linecount: "14"
      }
    };
  },
  computed: {
    previousLineInPoem() {
      return this.currentLineNumber > 0
        ? this.poem.lines[this.currentLineNumber - 1]
        : "";
    },
    previousLineInUserPoem() {
      return this.currentLineNumber > 0
        ? this.userPoem[this.currentLineNumber - 1]
        : "";
    },
    currentLineInPoem() {
      if (this.poemComplete) {
        return "";
      }
      const currentIndex = this.currentLineNumber;
      return this.poem.lines[currentIndex];
    },
    linesComplete() {
      return this.userPoem.length;
    },
    currentLastWordInPoemLine() {
      return lastWord(this.currentLineInPoem);
    },
    totalNumberOfLines() {
      return this.poem.lines.length;
    },
    totalNumberOfSyllables() {
      return numberOfSyllables(this.currentLineInPoem);
    },
    endWordMatches() {
      return lastWordMatches(this.currentLineInPoem, this.currentUserInput);
    },
    userLineIsValid() {
      return (
        this.endWordMatches &&
        this.syllablesComplete == this.totalNumberOfSyllables
      );
    },
    poemComplete() {
      return this.totalNumberOfLines === this.userPoem.length;
    },
    statusMessage() {
      if (this.userLineIsValid && this.poemComplete) {
        return "poem complete. share.";
      } else if (this.userLineIsValid && !this.poemComplete) {
        return "line complete. enter punctuation or return.";
      } else return "not complete";
    }
  },
  methods: {
    updateSyllables({ keycode, currentInput }) {
      if (keycode === 13 && this.userLineIsValid) {
        this.userPoem.push(this.currentUserInput);
        this.currentUserInput = "";
        this.syllablesComplete = 0;
        this.currentLineNumber++;
      } else {
        this.currentUserInput = currentInput;
        this.syllablesComplete = numberOfSyllables(currentInput);
      }
    }
  }
};
</script>

<style lang="scss">
.app__main {
  max-width: 50em;
  margin: 0 auto;
  padding: 0 1em;
}
</style>
