<template>
  <div class="container">
    <div>
      <h2>Edit Answer</h2>

      <br>
      <br>
      <input type="text" class="form-control" placeholder="Enter title" v-model="title">
      <br>
      <br>
      <wysiwyg v-model="text"></wysiwyg>

      <div style="float:right"><button class="btn btn-primary" @click.prevent="editanswer"> edit </button></div>
    </div>
    
  </div>
</template>
<script>
import axios from "../api/axios";

export default {
  components: {
    wysiwyg: vueWysiwyg.default.component
  },
  data() {
    return {
      text: "",
      title: ""
    };
  },
  created() {
    this.getone();
  },
  methods: {
    getone() {
      axios
        .get(`/answer/${this.$route.params.id}`)
        .then(({ data }) => {
          console.log(data);
          this.text = data.description;
          this.title = data.title;
        })
        .catch(err => {
          console.log(err);
        });
    },
    editanswer() {
      console.log(this.title, this.text);
      axios
        .put(
          `/answer/${this.$route.params.id}`,
          {
            title: this.title,
            description: this.text
          },
          {
            headers: {
              access_token: localStorage.access_token
            }
          }
        )
        .then(({ data }) => {
          console.log("berhasil");
          this.text = "";
          this.title = "";
          this.$router.push(`/question/${data.question}`);
        })
        .catch(err => {
          this.text = "";
          this.title = "";
          console.log(err);
        });
    }
  }
};
</script>

