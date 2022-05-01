<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
//import PostIt from "@/components/PostIt.vue";

export default {
  name: "DetailView",
  data() {
    return {
      id: this.$route.params.id,
      post: {},
      title: "",
      content: "",
      color: "",
    };
  },
  created() {
    let colors = [];
    if (localStorage.colors) {
      colors = JSON.parse(localStorage.colors);
    }
    let index = colors.findIndex((color) => {
      return color.id == this.id;
    });
    this.color = index >= 0 ? colors[index].color : "purple";

    let headersGetId = new Headers({
      "Content-Type": "application/json",
    });
    let initGetId = {
      method: "GET",
      headers: headersGetId,
      mode: "cors",
      cache: "default",
    };
    fetch("http://5.135.119.239:3090/notes/" + this.id, initGetId)
      .then((res) => res.json())
      .then((data) => {
        this.title = data.note.title;
        if (data.note.content.length > 1) {
          data.note.content.forEach((c) => (this.content += c + ". "));
        } else {
          this.content = data.note.content[0];
        }
      });
  },
};
</script>

<template>
  <div class="container">
    <div class="postIt" :class="color">
      <p class="title">{{ this.title }}</p>
      <p class="content">{{ this.content }}</p>
      <router-link to="/"
        ><svg
          class="backbtn"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
          <path
            d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM384 288H205.3l49.38 49.38c12.5 12.5 12.5 32.75 0 45.25s-32.75 12.5-45.25 0L105.4 278.6C97.4 270.7 96 260.9 96 256c0-4.883 1.391-14.66 9.398-22.65l103.1-103.1c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L205.3 224H384c17.69 0 32 14.33 32 32S401.7 288 384 288z"
          /></svg
      ></router-link>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100vw;
  height: auto;
  margin-top: 100px;
  /* align-items: center; */
  /* text-align: center; */
}
.postIt {
  width: 500px;
  min-height: 600px;
  height: fit-content;
  margin: auto;
  background-color: rgb(194, 59, 228, 0.9);
  box-shadow: 5px 5px 10px rgb(0, 0, 0);
  position: relative;
}
.yellow {
  background-color: rgb(226, 230, 17, 0.9);
}
.red {
  background-color: rgb(231, 87, 62, 0.9);
}
.purple {
  background-color: rgba(151, 48, 177, 0.9);
}
.blue {
  background-color: rgb(17, 134, 230, 0.9);
}
.green {
  background-color: rgb(101, 231, 62, 0.9);
}
.title {
  box-sizing: border-box;
  height: 100px;
  width: 100%;
  padding: 10px 15px;
  font-weight: 700;
  text-align: center;
  font-size: 21px;
  font-style: italic;
}
.content {
  box-sizing: border-box;
  min-height: 400px;
  height: fit-content;
  width: 100%;
  padding: 5px 15px;
  word-wrap: break-word;
  text-align: left;
}

.backbtn {
  position: absolute;
  bottom: 20px;
  left: 220px;
  width: 60px;
  cursor: pointer;
  border-radius: 100%;
}

.backbtn:hover {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>



