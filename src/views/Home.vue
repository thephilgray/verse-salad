<template lang="pug">
div
    ProgressBar(:percentage="timer" v-if="!poemComplete")
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
import axios from "axios";
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
        title: "Grasshoppers",
        author: "John Clare",
        lines: [
          "Grasshoppers go in many a thumming spring",
          "And now to stalks of tasseled sow-grass cling,",
          "That shakes and swees awhile, but still keeps straight;",
          "While arching oxeye doubles with his weight.",
          "Next on the cat-tail-grass with farther bound",
          "He springs, that bends until they touch the ground."
        ],
        linecount: "6"
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
