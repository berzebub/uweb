
const routes = [

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: "",
        component: () => import("pages/Index.vue"),
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
        component: () => import("pages/downloadData.vue"),
        name: "downloaddata"
      },

      // NOTE : Page test
      {
        path: "/test",
        component: () => import("pages/test.vue"),
        name: "test"
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
