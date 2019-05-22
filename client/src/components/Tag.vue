<template>
  <div>
    <div v-if="inputtags!==null">
      <a
        href="#"
        v-for="(tag,index) in inputtags"
        :key="index"
        class="btn btn-info tag mx-2"
        @click.prevent="searchtag(tag.name)"
      >{{tag.name}}</a>
    </div>
    <div v-if="inputtag!==null">
      <a
        href="#"
        v-for="(tag,index) in inputtag"
        :key="index"
        class="btn btn-info tag mx-1"
        @click.prevent="searchtag(tag)"
      >{{tag}}</a>
    </div>
  </div>
</template>

<script>
export default {
  props: ["inputtags", "inputtag"],
  methods: {
    searchtag(value) {
      this.$router.push("/question/tag/" + value);
    }
  }
};
</script>

