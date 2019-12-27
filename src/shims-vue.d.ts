import Vue from "vue";
import axios, { AxiosInstance } from "axios";


declare module '*.vue' {
  export default Vue
}

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    layout : string,
  }
}

declare module "vue/types/vue" {
  interface Vue {
    $axios : AxiosInstance;
  }
}