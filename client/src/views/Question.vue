<template>
  <div class="container-fluid pt-3 text-left" style="border-left:solid 1px #dadada;">
    <h2 class="text-left">{{question.title}}</h2>
    <hr>
    <div class="d-flex flex-row mb-4">
      <div class="col-1">
        <div class="d-flex flex-column">
          <div style="margin-bottom:-15px;">
            <a href @click.prevent="votes(question._id,'upvotes','question')" style="color:#dadada">
              <i class="fa fa-caret-up fa-4x" aria-hidden="true"></i>
            </a>
          </div>
          <div style="margin-left:7px;">
            <h1>{{(question.upvotes.length)-(question.downvotes.length)}}</h1>
          </div>
          <div style="margin-top:-30px;">
            <a
              href
              style="color:#dadada"
              @click.prevent="votes(question._id,'downvotes','question')"
            >
              <i class="fa fa-caret-down fa-4x" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="col-11">
        <div class="d-flex flex-column">
          <div style="min-height:300px;">
            <p v-html="question.description"></p>
          </div>
          <div class="d-flex justify-content-between">
            <div>
              <Tag :inputtag="question.tags"/>
            </div>
            <div class="d-flex flex-column" style="display:float-right">
              <div
                class="d-flex flex-row"
                v-if="$store.state.email==question.user.email"
                style="float:right"
              >
                <a class="mr-4" href @click.prevent="deleteOne(question._id,'question')">
                  <i class="fa fa-trash" aria-hidden="true" style="color:red">delete</i>
                </a>

                <router-link :to="{ name: 'editquestion', params: { id: question._id }}">
                  <i class="fa fa-edit" aria-hidden="true" style="color:green">edit</i>
                </router-link>
              </div>

              <small>asked {{moment(question.createdAt).fromNow()}} by {{question.user.name}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <div>
      <Answer
        @aksi="getdata"
        v-for="(answr,index) in question.answers"
        :key="index"
        :answer="answr"
      />
    </div>
    <div v-if="isLogin==true" style="background-color:#dadada; margin-top:30px;">
      <AddAnswer @aksi="getdata" :id="idnya"/>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

import Tag from "@/components/Tag.vue";
import axios from "@/api/axios.js";
import AddAnswer from "@/components/AddAnswer.vue";
import Answer from "@/components/Answer.vue";
export default {
  created() {
    this.getdata();
  },
  computed: mapState(["isLogin", "name", "email"]),
  data() {
    return {
      question: {},
      idnya: this.$route.params.id
    };
  },
  components: {
    Tag,
    AddAnswer,
    Answer
  },

  methods: {
    getdata() {
      axios
        .get(`question/${this.$route.params.id}`, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(({ data }) => {
          console.log(data);
          this.question = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    moment: function(date) {
      return moment(date);
    },
    votes(params, command, model) {
      let url = `/${model}/${command}/${params}`;
      console.log(url, "ini params");
      axios
        .post(
          url,
          {},
          {
            headers: {
              access_token: localStorage.access_token
            }
          }
        )
        .then(({ data }) => {
          console.log("berhasil");
          console.log(data);
          this.getdata();

          this.$router.push(`/question/${this.$route.params.id}`);
        })
        .catch(err => {
          console.log(err.responds);

          console.log(err);
        });
    },
     deleteOne(params,model){
          let url = `/${model}/${params}`
          console.log(url)
            axios.delete(url,{
            headers:{
                access_token : localStorage.access_token
            }
          })
           .then(({ data }) => {
              console.log('berhasil')
              this.getdata()
             if(model=='question'){
                this.$router.push(`/`)      
             }else{
               this.$router.push(`/question/${this.$route.params.id}`)
             }                
           })
            .catch(err => {
              console.log(err.responds)
                   
              console.log(err)                 
            })

        }
  }
};
</script>
