import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faUserSecret,
  faUser,
  faCodeBranch,
} from "@fortawesome/free-solid-svg-icons";
library.add(faUserSecret, faUser, faCodeBranch);

import router from "./router";

createApp(App)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
