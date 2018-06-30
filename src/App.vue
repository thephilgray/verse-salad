<template lang="pug">
  main.app__main
    ProgressBar(:percentage="timer")
    EndWord(:word="currentLastWordInPoemLine" v-if="!poemComplete")
    UserPoemPreview(:userPoem="userPoem" :writingMode="!poemComplete")
      template(slot="LinesComplete" v-if="!poemComplete")
        LineNumber(:total="totalNumberOfLines" :linesComplete="linesComplete")
    CurrentLine(v-if="!poemComplete" @onUpdateCurrentLine="updateSyllables" :isValid="userLineIsValid")
      template(slot="LineValidation" v-if="!poemComplete")
        SyllablesCount(:complete="Number(syllablesComplete)" :total="Number(totalNumberOfSyllables)" :isValid="userLineIsValid")
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
      timer: 100,
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
  mounted() {
    this.startTimer();
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
      return (
        this.timer === 0 || this.totalNumberOfLines === this.userPoem.length
      );
    },
    statusMessage() {
      if (this.poemComplete) {
        return "Poem complete. Share";
      } else if (this.userLineIsValid && !this.poemComplete) {
        return "Line complete. Enter punctuation or return.";
      } else
        return `Compose a line ${
          this.totalNumberOfSyllables
        } syllables long and ending with '${this.currentLastWordInPoemLine}'.`;
    }
  },
  methods: {
    updateSyllables({ keycode, currentInput }) {
      if (keycode === 13 && this.userLineIsValid) {
        this.userPoem.push(this.currentUserInput);
        this.currentUserInput = "";
        this.syllablesComplete = 0;
        this.currentLineNumber++;
        this.timer = 100;
      } else {
        this.currentUserInput = currentInput;
        this.syllablesComplete = numberOfSyllables(currentInput);
      }
    },
    startTimer() {
      let that = this;
      function decreaseTimer() {
        if (that.timer <= 1 || that.poemComplete) {
          clearInterval(timer);
        }
        that.timer = that.timer - 1;
      }

      const timer = setInterval(decreaseTimer, 500);
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
