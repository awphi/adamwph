<template>
  <div
    class="console-root"
    tabindex="0"
    @focus="commandFocused = true"
    @blur="commandFocused = false"
    @keydown="commandKeyDown"
  >
    <div class="console-bar unselectable">
      <h3 class="console-bar-text">guest - bash</h3>
      <div class="console-bar-btn-box">
        <div class="console-bar-btn" color="green" />
        <div class="console-bar-btn" color="yellow" />
        <div class="console-bar-btn" color="red" />
      </div>
    </div>
    <div class="console-body" ref="consoleBody">
      <p class="line" v-for="item in lines" :key="item.index">
        {{ item }}
      </p>
      <!-- prettier-ignore -->
      <p id="command" class="line" ref="command"><span id="command-title">adamw.ph:$ </span>{{ command }}<span id="underscore" v-if="commandFocused">_</span></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Console",
  data: function () {
    return {
      command: "",
      commandFocused: true,
      lines: [
        "line1",
        "LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOONG",
      ],
    };
  },
  methods: {
    addLine: function (l) {
      this.lines.push(l);
      console.log(this.$refs.scrollHeight);
      this.$refs.consoleBody.scrollTo(0, this.$refs.consoleBody.scrollHeight);
    },
    sendCommand: function () {
      this.addLine(this.command);
      this.command = "";
    },
    commandKeyDown: function (e) {
      if (e.keyCode === 13) {
        this.sendCommand();
      } else if (e.keyCode === 8) {
        this.command = this.command.slice(0, -1);
      } else if (e.key.length === 1) {
        this.command += e.key;
      }
    },
    focusCommand: function () {
      console.log("ff");
      this.$refs.command.focus();
    },
  },
  mounted() {
    this.focusCommand();
  },
};
</script>

<style scoped>
h3 {
  margin-bottom: 0.1rem;
  font-size: 1.4rem;
  color: var(--cl-header-grey);
}

.console-root {
  --cl-header-grey: #222222;
  --cl-btn-green: #75dc80;
  --cl-btn-yellow: #e4f28f;
  --cl-btn-red: #e23b3b;
  --cl-text-less-white: #b4b4b4;
  --cl-text-white: #d5d5d5;
  --cl-text-green: #6ec167;

  outline: none;
  filter: drop-shadow(2px 4px 4px rgba(0, 0, 0, 0.25));
}

.console-bar {
  background-color: #afafaf;
  border: 1px #5a5a5a solid;
  border-radius: 0.5rem 0.5rem 0 0;
  display: flex;
  align-items: center;
  text-align: center;
}

.console-bar-btn[color="green"] {
  background-color: var(--cl-btn-green);
}

.console-bar-btn[color="yellow"] {
  background-color: var(--cl-btn-yellow);
}

.console-bar-btn[color="red"] {
  background-color: var(--cl-btn-red);
}

.console-bar-btn {
  border-radius: 20rem;
  height: 20px;
  width: 20px;
  margin: 0 0.2rem 0 0.2rem;
  background: #171717;
}

.console-bar-btn-box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: absolute;
  right: 0;
  margin-right: 0.25rem;
}

.console-bar-text {
  flex: 1;
}

.console-body {
  width: max(60vw, 360px);
  min-height: max(30vw, 200px);
  background-color: #171717;
  border-radius: 0 0 0.5rem 0.5rem;
  padding: 0.15rem 0.5rem 0.25rem 0.5rem;
  overflow-y: scroll;
}

p {
  color: var(--cl-text-less-white);
  font-size: 1.2rem;
}

.line {
  word-break: break-all;
}

#command-title {
  color: var(--cl-text-white);
}

#command {
  color: var(--cl-text-green);
  caret-color: transparent;
}

#underscore {
  color: var(--cl-text-green);
  animation-name: blink;
  animation-iteration-count: infinite;
  animation-timing-function: steps(2, start);
  animation-duration: 1s;
}

@keyframes blink {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
