<template>
  <div class="panel panel-default">
    <ul class="list-group">
      <b-link to="/" exact>
        <a href="#" class="list-group-item">Home</a>
      </b-link>
      <b-link to="/tags" exact>
        <a href="#" class="list-group-item">Tags</a>
      </b-link>
      <b-link to="/watchedtags" exact>
        <a href="#" class="list-group-item">watchedtags</a>
      </b-link>
    </ul>
  </div>
</template>

<style scoped>
.panel > .list-group {
  margin-bottom: 0;
}
.panel > .list-group .list-group-item {
  border-width: 1px 0;
}
.panel > .list-group .list-group-item:first-child {
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}
.panel > .list-group .list-group-item:last-child {
  border-bottom: 0;
}
.panel-heading + .list-group .list-group-item:first-child {
  border-top-width: 0;
}
.panel-default .list-group-item.active {
  color: #000;
  background-color: #ddd;
  border-color: #ddd;
}
.panel-primary .list-group-item.active {
  color: #fff;
  background-color: #428bca;
  border-color: #dadada;
}
.panel a.list-group-item.active:hover,
a.list-group-item.active:focus {
  color: #000;
  background-color: #ddd;
  border-color: #ddd;
}
</style>

