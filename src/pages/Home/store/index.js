import { hookstate } from "@hookstate/core";


const initValueHomeState = {
  fileNames: [],
  fileUrls: []
};

const homeStore = hookstate(initValueHomeState);

export default homeStore
