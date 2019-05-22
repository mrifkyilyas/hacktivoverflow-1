import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (login.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/Login.vue")
    },
    {
      path: "/register",
      name: "register",
      // route level code-splitting
      // this generates a separate chunk (register.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "register" */ "./views/Register.vue")
    },
    {
      path: "/newquestion",
      name: "NewQuestion",
      // route level code-splitting
      // this generates a separate chunk (NewQuestion.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "NewQuestion" */ "./views/NewQuestion.vue")
    },

    {
      path: "/tags",
      name: "getallTags",
      // route level code-splitting
      // this generates a separate chunk (NewQuestion.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "Tags" */ "./views/Tags.vue")

    },
    {
      path: "/question/tag/:id",
      name: "searchQuestion",
      // route level code-splitting
      // this generates a separate chunk (NewQuestion.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "searchQuestion" */ "./views/SearchQuestion.vue")

    },
    {
      path: "/question/:id",
      name: "question",
      // route level code-splitting
      // this generates a separate chunk (NewQuestion.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "Question" */ "./views/Question.vue")
    }
    ,
    {
      path: "/edit/question/:id",
      name: "editquestion",
      // route level code-splitting
      // this generates a separate chunk (editQuestion.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "EditQuestion" */ "./views/EditQuestion.vue")
    },
    {
      path: "/edit/answer/:id",
      name: "editanswer",
      // route level code-splitting
      // this generates a separate chunk (editAnswer.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "EditAnswer" */ "./views/EditAnswer.vue")
    },
    {
      path: "/watchedtags",
      name: "watchedtags",
      // route level code-splitting
      // this generates a separate chunk (editAnswer.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "EditAnswer" */ "./views/Watchedtag.vue")
    }

  ]
});
