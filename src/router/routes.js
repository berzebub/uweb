const routes = [
  {
    path: "/not-support",
    component: () => import("pages/notSupport.vue"),
    name: "not-support"
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/global-value-chains",
        component: () => import("pages/globalValueChains"),
        name: "globalValueChains"

      },
      {
        path: "/regional-integration",
        component: () => import("pages/regionalIntegration"),
        name: "regionalIntegration"

      },
      {
        path: "",
        component: () => import("pages/welcome.vue"),
        name: "landing-page"
      },
      {
        path: "/home",
        component: () => import("pages/home.vue"),
        name: "home"
      },
      {
        path: "/involvement",
        component: () => import("pages/involvement.vue"),
        name: "involvement"
      },
      {
        path: "/about",
        component: () => import("pages/about.vue"),
        name: "about"
      },
      {
        path: "/termOfUse",
        component: () => import("pages/termofuse.vue"),
        name: "termofuse"
      },
      {
        path: "/exports",
        component: () => import("pages/exports.vue"),
        name: "exports"
      },
      {
        path: "/download",
        component: () => import("pages/downloaddata.vue"),
        name: "downloaddata"
      },
      {
        path: "/countrybriefs",
        component: () => import("pages/countrybriefs.vue"),
        name: "countrybriefs"
      },
      {
        path: "/getStarted",
        component: () => import("pages/getStarted.vue"),
        name: "getStarted"
      },
      {
        path: "/structure-of-value-added",
        component: () => import("pages/structureOfValueAdded.vue"),
        name: "structureOfValueAdded"
      },
      {
        path: "/participation-in-gvcs",
        component: () => import("pages/participationInGvcs.vue"),
        name: "participationInGvcs"
      },
      {
        path: "/backward-linkages-by-region",
        component: () => import("pages/backwardLinkagesByRegion.vue"),
        name: "backwardLinkagesRegion"
      },
      {
        path: "/backward-linkages-by-sector",
        component: () => import("pages/backwardLinkagesBySector.vue"),
        name: "backwardLinkagesSector"
      },
      {
        path: "/forward-linkages-by-region",
        component: () => import("pages/forwardLinkagesByRegion.vue"),
        name: "forwardLinkagesRegion"
      },
      {
        path: "/forward-linkages-by-sector",
        component: () => import("pages/forwardLinkagesBySector.vue"),
        name: "forwardLinkagesSector"
      },

      // NOTE : Page test
      {
        path: "/test",
        component: () => import("pages/test.vue"),
        name: "test"
      },
      {
        path: "/test1",
        component: () => import("pages/testGraph1.vue"),
        name: "testGraph1"
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
