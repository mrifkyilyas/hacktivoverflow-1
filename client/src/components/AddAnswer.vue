<template>
  <div class="container">
    <div class="form-group">
      <label for="exampleInputTitle">Title</label>
      <input
        v-model="title"
        type="Title"
        class="form-control"
        id="exampleInputTitle"
        aria-describedby="TitleHelp"
        placeholder="Enter Title"
      >
    </div>
    <wysiwyg v-model="description"></wysiwyg>
    <button  type="submit" class="btn btn-primary" @click.prevent="addAnswer">addAnswer</button>
  </div>
</template>
<script>
import axios from "@/api/axios.js";
export default {
  components: {
    wysiwyg: vueWysiwyg.default.component
  },
  props: ["id"],
  data(){
      return{
          title:'',
          description:''
      }

  },
  methods: {
    addAnswer() {
      axios
        .post(
          `/answer/`,
          {
            title: this.title,
            description: this.description,
            question: this.id
          },
          {
            headers: {
              access_token: localStorage.access_token
            }
          }
        )
        .then(({ data }) => {
          console.log("berhasil");
          this.description = "";
          this.title = "";
          this.$store.dispatch("notif", {
            type: "success",
            message: "You Have Successfully add comment"
          });
          this.$emit('aksi')
          this.$router.push(`/question/${this.$route.params.id}`);
        })
        .catch(err => {
          this.description = "";
          this.title = "";
        });
    }
  }
};
</script>

