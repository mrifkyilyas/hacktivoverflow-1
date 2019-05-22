<template>
  <div class="container mx-auto pt-4">
    <Tag :inputtags="tags" />
  </div>
</template>
<script>
import axios from "../api/axios";
import Tag from "@/components/Tag.vue"
export default {
  data() {
    return {
        tags:[]
    };
  },
  components:{
      Tag,


  },
  created() {
    this.getAllTags();
  },
  methods: {
    getAllTags() {
      axios
        .get("/tag/")
        .then(({ data }) => {
          this.tags = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
   
  },
};
</script>
