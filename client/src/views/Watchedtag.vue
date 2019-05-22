<template>
  <div class="container mx-auto pt-4">
    <div v-if="tags.length!=0">
      your watched tag:
      <Tag :inputtag="tags"/>
    </div>

    <h3 v-else>kamu belum punya watchedTags</h3>
  </div>
</template>
<script>
import axios from "../api/axios";
import Tag from "@/components/Tag.vue";
export default {
  data() {
    return {
      tags: []
    };
  },
  components: {
    Tag
  },
  created() {
    if (!localStorage.access_token) {
      this.$router.push("/login");
    } else {
      this.getAllTags();
    }
  },
  methods: {
    getAllTags() {
      axios
        .get("user/getdata", {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(({ data }) => {
          this.tags = data.watchedTags;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
