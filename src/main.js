import { createApp } from "vue";

import "./style.css";

import App from "./App.vue";

//router
import router from "./router";
// store
import { createPinia } from "pinia";
// tooltip
import VueTippy from "vue-tippy";
import "tippy.js/animations/scale.css";
import "tippy.js/dist/tippy.css";

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
  faPen,
  faCheck,
  faTrash,
  faBorderAll,
  faGripLines,
  faComments,
  faSort,
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
  faMap,
  faPen,
  faCheck,
  faTrash,
  faBorderAll,
  faGripLines,
  faComments,
  faSort
);

const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(createPinia())
  .use(router)
  .use(VueTippy, {
    defaultProps: {
      placement: "auto",
      arrow: false,
    },
  })
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
