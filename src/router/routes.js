
const routes = [

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: "/test",
        component: () => import("pages/test.vue"),
        name: "test"
      },
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
        path: "/exports",
        component: () => import("pages/exports.vue"),
        name: "exports"
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
