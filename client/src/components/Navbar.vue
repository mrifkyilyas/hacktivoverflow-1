<template>
  <nav class="navbar navbar-expand navbar-light bg-white">
    <div class="container">
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <b-link to="/">
            <li class="nav-item">
              <a href class="nav-link">
                <img src="../assets/logo1.png" style="max-height:50px; margin-left:-30px;">
              </a>
            </li>
          </b-link>
          <li class="nav-item">
            <b-link to="/tags">
              <a href class="nav-link py-auto" style="color:#dadada; margin-top:7px;">
                <i class="fa fa-hashtag fa-2x" aria-hidden="true"></i>
              </a>
            </b-link>
          </li>
        </ul>
        <form action class="form-inline w-100 d-none d-md-block ml-2" @submit.prevent="searchtag">
          <input
            type="text"
            class="form-control form-control-sm rounded-pill search border-0 px-3 w-100"
            placeholder="Search By Tag"
            v-model="search"
          >
        </form>
        <ul v-if="isLogin" class="navbar-nav d-none d-md-block">
          <li class="nav-item">
            <a class="nav-link">
              <img
                src="https://vignette.wikia.nocookie.net/the-sun-vanished/images/5/5d/Twitter-avi-gender-balanced-figure.png/revision/latest?cb=20180713020754"
                alt
                class="img-fluid rounded-circle"
                style="height: 32px; width: 32px;"
              >
            </a>
          </li>
        </ul>
        <ul v-if="isLogin" class="navbar-nav d-none d-md-block">
          <li class="nav-item">
            <a href class="btn btn-info" @click.prevent="logout">logout</a>
          </li>
        </ul>
        <ul v-if="isLogin===false" class="navbar-nav d-none d-md-block">
          <li class="nav-item">
            <b-link to="/login" exact>
              <a class="nav-link">
                <a href="#" class="btn btn-info">Login</a>
              </a>
            </b-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapState } from "vuex";
import Swal from "sweetalert2";
import axios from "../api/axios";
export default {
  computed: mapState(["isLogin", "name"]),
  data(){
    return {
      search:""
    }

  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$store.dispatch("notif", {
        type: "success",
        message: "You Have Successfully Logged Out"
      });
      this.$router.push("/");
    },
    searchtag(){
      this.$router.push('/question/tag/'+this.search)
      this.search = ''
    }
  }
};
</script>



<style scoped>
nav.navbar {
  padding: 0 !important;
  border-top: 2px solid orange;
  border-bottom: 1px solid #dadada;
}
nav.navbar > .container {
  max-width: 1000px !important;
  padding: 0px 10px !important;
}
ul.navbar-nav > li.nav-item > a.nav-link {
  width: 90px !important;
  height: 52.5px !important;
  line-height: 34.5px !important;
  text-align: center !important;
  border-top: 2px solid #fff;
  font-size: 15px !important;
}
ul.navbar-nav > li.active > a.nav-link {
  border-top-color: orange;
}
ul.navbar-nav > li.nav-item > a.nav-link:hover {
  border-top-color: orange;
}
ul.navbar-nav > li.nav-item > a.nav-link > svg {
  max-width: 100%;
  height: 1.640625rem;
  fill: rgb(101, 119, 134) !important;
}
ul.navbar-nav > li.active > a.nav-link > svg {
  max-width: 100%;
  height: 1.640625rem;
  fill: orange !important;
}
.search {
  background-color: rgba(101, 119, 134, 0.15) !important;
  font-family: Helvetica, sans-serif;
}
.search:focus {
  box-shadow: none !important;
}
</style>
