<template>
  <div class="container">
    <div>
        <br>
    <h2>Edit Question</h2> 
      <br>
      <br>

      <vue-tags-input v-model="tag" :tags="tags" @tags-changed="newTags => tags = newTags"/>

      <br>
      <br>
      <input type="text" class="form-control" placeholder="Enter title" v-model="title">
      <br>
      <br>
      <wysiwyg v-model="description"></wysiwyg>
    </div>
    <a href class="btn btn-primary" @click.prevent="editQuestion">Edit Question</a>
  </div>
</template>
<script>
import VueTagsInput from "@johmun/vue-tags-input";
import axios from "../api/axios";

export default {
  components: {
    wysiwyg: vueWysiwyg.default.component,
    VueTagsInput
  },
  data() {
    return {
      description: "",
      title: "",
      tag: "",
      tags: [],
      newTags:[]
    };
  },
  created() {
    this.getone();
  },
  methods: {
    getone() {
      axios
        .get(`/question/${this.$route.params.id}`)
        .then(({ data }) => {
          console.log(data);
          this.description = data.description;
          this.title = data.title;
          this.tags = data.tags;
        })
        .catch(err => {
          console.log(err);
        });
    },
    editQuestion() {
      console.log(this.newTags);
      axios
        .put(
          `/question/${this.$route.params.id}`,
          {
            title: this.title,
            description: this.description,
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
          this.description = "";
          this.title = "";
          this.tags = "";
          this.$router.push(`/question/${data._id}`);
        })
        .catch(err => {
          this.description = "";
          this.title = "";
          console.log(err);
        });
    }
  }
};
</script>

