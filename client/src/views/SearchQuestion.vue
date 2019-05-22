
<template>
  <div class="search-question">
    <Control/>
    <div> <button  v-if="resultQuestion.length!=0"  class="btn btn-info" @click.prevent="watchedtag"> add to watched Tag</button></div>
   
    
    <List v-if="resultQuestion.length!=0" :questions="resultQuestion"/>
    <div v-else>Data tidak ditemukan</div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import List from "@/components/List.vue";
import Control from "@/components/Control.vue";
import axios from "@/api/axios";
import Swal from "sweetalert2";
export default {
  name: "home",
  components: {
    List,
    Control
  },
  data() {
    return {
      resultQuestion: []
    };
  },
  created() {
      this.getQuestionByTag()
  },
  methods: {
    getQuestionByTag() {
      axios
        .get("/question/tag/" + this.$route.params.id)
        .then(({ data }) => {
            this.resultQuestion = data
        })
        .catch(err=>{
            console.log(err)
        })
    },
    watchedtag(){
          axios
        .post(
          `/user/watchedtag`,
          {
            tag: this.$route.params.id
            // tags: this.tags
          },
          {
            headers: {
              access_token: localStorage.access_token
            }
          }
        )
        .then(({ data }) => {
          console.log("berhasil");
          this.$route.push('/watchedtag')

        })
        .catch(err => {
           Swal.fire({
            title:"kamu sudah punya",
            animation: false,
            customClass: {
              popup: "animated swing"
            }
          });
         
          console.log(err);
        });
    

    }
  },
   watch: {
    $route() {
      this.getQuestionByTag();
    },
  },
};
</script>
