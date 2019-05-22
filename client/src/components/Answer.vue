<template>
  <div>
    <div class="d-flex flex-row" style="border-bottom:solid 1px #dadada">
      <div class="col-1">
        <div class="d-flex flex-column">
          <div style="margin-bottom:-15px;">
            <a href @click.prevent="votes(answer._id,'upvotes','answer')" style="color:#dadada">
              <i class="fa fa-caret-up fa-4x" aria-hidden="true"></i>
            </a>
          </div>
          <div style="margin-left:7px;">
            <h1>{{answer.upvotes.length-answer.downvotes.length}}</h1>
          </div>
          <div style="margin-top:-30px;">
            <a href style="color:#dadada" @click.prevent="votes(answer._id,'downvotes','answer')">
              <i class="fa fa-caret-down fa-4x" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="col-11">
        <div class="d-flex flex-column">
          <div style="min-height:300px; margin-left:30px">
            <div class="pl-4 py-2" style="border-bottom:solid 1px #dadada; ">
              <h3>{{answer.title}}</h3>
            </div>
            <p v-html="answer.description"></p>
          </div>
          <div class="text-right d-flex flex-column">
            <div
              class="d-flex flex-row"
              v-if="$store.state.email==answer.user.email"
              style="float:right"
            >
              <a class="mr-4" href @click.prevent="deleteOne(answer._id,'answer')">
                <i class="fa fa-trash" aria-hidden="true" style="color:red">delete</i>
              </a>

              <router-link :to="{ name: 'editanswer', params: { id: answer._id }}">
                <i class="fa fa-edit" aria-hidden="true" style="color:green">edit</i>
              </router-link>
            </div>
            <small>answered {{moment(answer.createdAt).fromNow()}} by {{answer.user.name}}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/api/axios.js";
export default {
  props: ["answer"],
  created() {},
  methods: {
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
          this.$emit("aksi");
          this.$router.push(`/question/${this.$route.params.id}`);
        })
        .catch(err => {
          console.log(err.responds);

          console.log(err);
        });
    },
    deleteOne(params, model) {
      let url = `/${model}/${params}`;
      console.log(url);
      axios
        .delete(url, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(({ data }) => {
          console.log("berhasil")
           this.$emit("aksi")
        })
        .catch(err => {
          console.log(err.responds);

          console.log(err);
        });
    }
  }
};
</script>

