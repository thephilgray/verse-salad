<template lang="pug">
div(v-if="poem")
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
import Chance from "chance";
const chance = new Chance();

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
      poem: null
    };
  },

  mounted() {
    let fetchedPoems = this.$store.state.fetchedPoems;
    if (!fetchedPoems) {
      this.$store
        .dispatch("fetchPoems")
        .then(() => {
          fetchedPoems = this.$store.state.fetchedPoems.poems;
          this.setRandomPoem(fetchedPoems);
          this.startTimer();
        })
        .catch(e => {
          // handle error
          // eslint-disable-next-line
        console.log(`error, ${e}`);
        });
    } else {
      this.setRandomPoem(fetchedPoems.poems);
      this.startTimer();
    }
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
    setRandomPoem(poems) {
      const randomIndex = chance.integer({
        min: 0,
        max: poems.length - 1
      });
      this.poem = poems[randomIndex];
    },

    updateSyllables({ keycode, currentInput }) {
      if (keycode === 13 && this.userLineIsValid) {
        this.userPoem.push(this.currentUserInput);
        this.currentUserInput = "";
        this.syllablesComplete = 0;
        this.currentLineNumber++;
        this.timer = 100;
      }
      if (keycode === 27) {
        this.timer = 0;
      } else {
        this.currentUserInput = currentInput;
        this.syllablesComplete = numberOfSyllables(currentInput);
      }
    },
    startTimer() {
      const decreaseTimer = () => {
        if (this.timer < 1 || this.poemComplete) {
          clearInterval(timer);
        } else {
          this.timer = this.timer - 1;
        }
      };

      const timer = setInterval(decreaseTimer, 100);
    }
  }
};
</script>
