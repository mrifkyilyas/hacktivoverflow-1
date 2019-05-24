<template>
  <div class="home">
    <Control/>
    <List :questions="allQuestions" />
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import HelloWorld from "@/components/HelloWorld.vue";
import List from "@/components/List.vue";
import Navbar from "@/components/Navbar.vue";
import Control from "@/components/Control.vue";


export default {
  name: "home",
  components: {
    HelloWorld,
    List,
    Navbar,
    Control
  },
  data() {
    return {

    };
  },
  computed: mapState(["allQuestions"]),
  created() {
    this.$store.dispatch("getAllQuestions");
    console.log(this.allQuestions);
  }
};
</script>
