
const routes = [
  {
    path: "/",
    component: () => import("pages/Index.vue"),
    name: "landing-page"
  },
  {
    path: "/home",
    component: () => import("pages/home.vue"),
    name: "landing-page"
  },
  // {
  //   path: '/',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/Index.vue') }
  //   ]
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
