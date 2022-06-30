<style scoped>
.Arima {
  font-family: "Arima Madurai", cursive;
}
.Mate {
  font-family: "Mate", "Microsoft YaHei", 微软雅黑, "Microsoft JhengHei",
    华文细黑, STHeiti, MingLiu, "Noto Sans SC", serif;
}
.Raleway {
  font-family: "Raleway", "Microsoft YaHei", 微软雅黑, "Microsoft JhengHei",
    华文细黑, STHeiti, MingLiu, "Noto Sans SC", sans-serif;
}
#leftbar {
  overflow: hidden; /* code added to prevent scroll */
  position: fixed;
}
#content {
  margin-left: 400px;
  height: auto;
  padding: 17px;
  margin-right: 20px;
  padding-bottom: 30px;
  overflow: auto; /* code added */
}
#actualideas {
  font-size: min(26px,1.35rem);
}
@media only screen and (max-width: 800px) {
  #app {
  }
  #leftbar {
    position: relative !important;
  }
  #content {
    margin-left: 0px;
  }
  #leftbar {
    width: 100% !important;
  }
}
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>

<script>
import ideas0 from "./trans.json";

let min = 0;
let max = 800;

// https://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
shuffle(ideas0);

const colors = ["#FBECE6", "#FAEEDF", "#ECF2E5", "#ECF0EA", "#F1EFEC"];
let ideas,
  data,
  u = [],
  offset = 0,
  maxn = 0,
  oc = -1;
function get_text(id) {
  return ideas[id];
}
function fetch_text(num) {
  const result = [];
  while (offset < maxn && --num >= 0) {
    let nc = oc;
    while (nc === oc) nc = Math.floor(Math.random() * 5);
    result.push({ color: colors[nc], text: get_text(offset), id: offset });
    offset++;
    oc = nc;
  }
  return result;
}
function rebuild() {
  ideas = ideas0.filter((e) => e[0].length >= min && e[0].length <= max);
  offset = 0;
  oc = -1;
  maxn = ideas.length;
  data = ideas.map((e) => e[0].length);
  u.length = 0;
  u.push(...fetch_text(40));
}
rebuild();

/*
const data = [];
for (let i = 0; i < 1000; ++i) {
  let s = Math.pow(Math.random(), 1.3) * 500;
  data.push(500 + s * (Math.random() > 0.5 ? 1 : -1));
}*/

function regen(values) {
  const value_min = values.from;
  const value_max = values.to;
  min = value_min;
  max = value_max;
  rebuild();
}

export default {
  name: "App",

  mounted() {
    const ths = this;
    const handleScroll = (e) => {
      if (!ths.$refs) return;
      let element = ths.$refs.scrollComponent;
      if (!element) return;
      //      console.log(element.getBoundingClientRect().bottom, window.innerHeight);
      if (element.getBoundingClientRect().bottom < window.innerHeight + 300) {
        u.push(...fetch_text(7));
      }
    };
    window.addEventListener("scroll", handleScroll);
  },

  data() {
    return {
      data: data,
      ideas0: ideas0,
      ideas: u,
      faq: 0,
      lang: 0,
      regen: regen,
      prettify: function (ts) {
        return ts;
      },
    };
  },
};
</script>

<template>
  <div id="app">
    <div
      id="leftbar"
      style="
        background-color: #FDF6E3;
        width: 400px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      "
    >
      <div style="margin: 40px 0" 
          class="noselect">
        <div
          style="font-size: 50px; font-weight: 700; text-align: center; letter-spacing: 1.5px"
          class="Arima"
        >
          CPIdeas
        </div>
        <div
          style="
            font-size: 24px;
            text-align: center;
            margin-top: 10px;
            color: #5C5953;
          "
          class="Raleway"
          v-html="
            !lang
              ? 'Out of ideas for the upcoming<br>programming contest? Check<br>out these AI-generated ideas!'
              : '新题没 idea 了？家人们，<br>试试 AI 生成的这些 idea 吧。'
          "
        ></div>
        <div
          style="
            font-size: 26px;
            text-align: center;
            margin-top: 35px;
            margin-bottom: 20px;
            color: #2E2D29;
          "
          class="Raleway"
          v-html="!lang ? 'Length of ideas to use' : '选用 idea 的英文长度范围'"
        ></div>
        <HistogramSlider
          style="margin: auto"
          :width="300"
          :bar-height="100"
          :data="data"
          :prettify="prettify"
          :drag-interval="false"
          :force-edges="true"
          :colors="['#4facfe', '#00f2fe']"
          :min="0"
          :max="800"
          :grid-text-color="'#5C5953'"
          ref="slider"
          @finish="regen"
        />
      </div>
      <div
        style="margin: 40px auto; font-size: 20px; text-underline-offset: 2px;
        display: flex; justify-content: center; align-items: center; flex-direction: column"
        class="Raleway"
      >
        <div
          style="
            margin-bottom: 15px;
            text-align: center;
            vertical-align: bottom;
            font-size: 25px;
          "
          class="Raleway noselect"
        >
          <span
            :style="{ cursor: 'pointer', color: lang ? '#737067' : 'black' }"
            @click="lang = 0"
            >English</span
          > / <span
            :style="{ cursor: 'pointer', color: (!lang) ? '#737067' : 'black'}"
            @click="lang = 1"
            >简体中文</span
          >
        </div>
        <u
          style="cursor: pointer; color: #737067"
          @click="faq ^= 1"
          class="noselect"
          v-html="lang ? '说明 & 帮助' : 'About & FAQ'"
        ></u>
      </div>
    </div>
    <div
      id="content"
      style="font-size: 26px"
      class="Mate"
      ref="scrollComponent"
    >
      <div
        id="faq"
        :style="{ padding: '30px', display: faq ? 'block' : 'none' }"
      >
        <span
          v-html="
            lang
              ? '注意：你所看到的文字由 GPT-3 在指导下生成。GPT-3 是 OpenAI 的大规模预训练语言生成模型。输出可能包含有争议性和有冒犯性的内容，读者应该审慎地对待本项目的输出。'
              : 'Disclaimer: The text is generated in part with GPT-3, OpenAI\’s large-scale language-generation model. The output may contain inapproprimate contents and should be treated with care.'
          "
        ></span>
        <br /><br />
        Q:
        <span
          v-html="
            lang ? '这些 idea 是如何生成的？' : 'How are the ideas generated?'
          "
        ></span
        ><br />
        A:
        <span
          v-html="
            lang
              ? '我从 AtCoder 爬取了题目内容，使用这些题目微调了语言生成模型 GPT-3，并使用 DeepL 翻译成了中文。这个网站并不会实时调用模型，而仅仅用于显示生成的这些 idea。当前网站上存有 ' +
                ideas0.length +
                ' 条 idea，我也会不断加入新的 idea（咕咕咕）。'
              : 'As you can tell from the characters, I collected problems from AtCoder. These problems are then used to fine-tune GPT-3, a large-scale language-generation model. This website only displays generated ideas - they\'re not generated in real time. There are currently ' +
                ideas0.length +
                ' generated ideas and I might add more later on.'
          "
        ></span
        ><br /><br />
        Q:
        <span
          v-html="
            lang
              ? '我真的能用这些 idea 造题吗？'
              : 'Is it safe to use these ideas to make my own problems?'
          "
        ></span
        ><br />
        A:
        <span
          v-html="
            lang
              ? '和 CoPilot 一样，模型有可能会复读已有的题目，也有一定的版权风险。你应该自己判断这些 idea 的优劣并谨慎地选择。在把题目投出去之前，建议使用各种语言搜索自己的题目以防重题。'
              : 'The situation is similar to CoPilot. Although unlikely, the model could possibly echo problems in the training set or other existing problems. I would say, use them fairly and do your own judgement. As always, you should search if a similar problem exists before actually purposing some problem.'
          "
        ></span
        ><br /><br /><br />
        <span
          v-html="
            lang
              ? '造题快乐！如果有什么建议或想要吐槽的地方欢迎在<a href=&quot;https://codeforces.com/blog/entry/104374&quot;>这里</a>评论。'
              : 'Have fun making problems! Comment <a href=&quot;https://codeforces.com/blog/entry/104374&quot;>here</a> if you have any concerns/suggestions!'
          "
        ></span
        ><br /><br />
        <span style="line-height: 45px; vertical-align: bottom">
          @fjzzq2002</span
        >&nbsp;
        <a href="https://github.com/fjzzq2002">
          <img
            src="./icons/github.png"
            style="width: 30px; padding-bottom: 4px" /></a
        >&nbsp;
        <a href="https://codeforces.com/profile/TLE"
          ><img
            src="./icons/codeforcesp.png"
            style="width: 38px; padding-bottom: 3px" /></a
        >&nbsp;
        <a href="https://atcoder.jp/users/fjzzq2002">
          <img src="./icons/atcoder.png" style="width: 34px" /></a
        ><br />
        <span
          style="font-size: 20px; color: gray"
          v-html="
            lang
              ? '（再点一次 说明&帮助 来关闭本说明……）'
              : '(click About & FAQ again to close this...)'
          "
        >
        </span>
      </div>
      <div id="actualideas" :style="{ display: faq ? 'none' : 'block' }">
        <idea-component
          v-for="idea in ideas"
          :idea="idea"
          :lang="lang"
          :key="idea.id"
        />
      </div>
    </div>
  </div>
</template>