import MapLayout from "@/layouts/MapLayout.vue";
import { createRouter, createWebHistory } from "vue-router";
import "./index.css";
import "/node_modules/focus-visible/dist/focus-visible.min.js";


export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/location/add",
      name: "add_location",
      component: () => import("./components/forms/AddLocation.vue"),
    },
    {
      path: "/location/:location_id",
      name: "location_detail",
      component: MapLayout,
    },
    {
      path: "/location/:location_id/report",
      name: "report_location",
      component: () => import("./components/forms/ReportLocation.vue"),
    },
    {
      path: "/@:lat(-\?\\d\+\.\?\\d\+\?),:lng(-\?\\d\+\.\?\\d\+\?),:zoom(\\d\+)z",
      component: MapLayout,
      name: 'coords'
    },
    {
      path: "/",
      component: MapLayout,
    },
  ],
});