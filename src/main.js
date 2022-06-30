import Vue from "vue";
import App from "./App.vue";
import IdeaComponent from "./IdeaComponent.vue";

import HistogramSlider from "vue-histogram-slider";
import "vue-histogram-slider/dist/histogram-slider.css";

Vue.component(HistogramSlider.name, HistogramSlider);

Vue.component(IdeaComponent.name, IdeaComponent);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
