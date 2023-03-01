import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import router from "./router";

//icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faUserSecret,
  faUser,
  faCodeBranch,
  faStickyNote,
  faTableList,
  faStar,
  faSun,
  faComment,
  faGear,
  faBell,
  faPlus,
  faClose,
  faMagnifyingGlass,
  faMap,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faUserSecret,
  faUser,
  faCodeBranch,
  faStickyNote,
  faTableList,
  faStar,
  faSun,
  faComment,
  faGear,
  faBell,
  faPlus,
  faClose,
  faMagnifyingGlass,
  faMap
);

createApp(App)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
