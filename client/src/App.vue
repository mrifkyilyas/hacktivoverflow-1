<template>
  <div id="app">
    <Navbar/>
    <div id="content" class="d-flex justify-content-between mb-4">
      <div class="col-2 pt-4">
        <LeftBar/>
      </div>
      <div class="col-7 main">
        <router-view/>
      </div>
      <div class="col-3">
        <RightSidebar/>
      </div>
    </div>
    <Footer/>
  </div>
</template>
<script>
// @ is an alias to /src;
import List from "@/components/List.vue";
import Navbar from "@/components/Navbar.vue";
import LeftBar from "@/components/LeftSidebar.vue";
import Footer from "@/components/Footer.vue";
import RightSidebar from "@/components/RightSidebar.vue"
export default {
  components: {
    Navbar,
    LeftBar,Footer,
    RightSidebar
  },
  created() {
    if (localStorage.access_token) {
      this.$store.commit("setUserStatus", {
        status: true,
        name: localStorage.name
      });
    } else {
      this.$store.commit("setUserStatus", {
        status: false,
        name: ""
      });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
