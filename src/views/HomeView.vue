<script>
// @ is an alias to /src
import PostIt from "@/components/PostIt.vue";
import AddModale from "@/components/AddModale.vue";

export default {
  name: "HomeView",
  components: {
    PostIt,
    AddModale,
  },
  data() {
    return {
      posts: [],
      showAddModale: false,
      newTitle: "",
      newContent: "",
      colors: [],
      updatePostAPI: (post) => {
        let headersPut = new Headers({
          "Content-Type": "application/json",
        });
        let initPut = {
          method: "PUT",
          body: JSON.stringify({
            title: post.title,
            content: [post.content],
          }),
          headers: headersPut,
          cache: "default",
        };

        fetch("http://5.135.119.239:3090/notes/" + post.id, initPut)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
      },
    };
  },
  methods: {
    deletePostIt(id) {
      let headersDelete = new Headers({
        "Content-Type": "application/json",
      });
      let initDelete = {
        method: "DELETE",
        headers: headersDelete,
        cache: "default",
      };

      fetch("http://5.135.119.239:3090/notes/" + id, initDelete)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          this.posts = this.posts.filter((post) => post.id != id);
        });
    },
    showPostIt(id) {
      this.$router.push({
        name: "detail",
        params: { id: id },
      });
    },
    addPostIt() {
      this.showAddModale = false;
      // this.posts.push({
      //   id: this.id++,
      //   title: this.newTitle,
      //   content: this.newContent,
      // });

      let headersPost = new Headers({
        "Content-Type": "application/json",
      });
      let initPost = {
        method: "POST",
        body: JSON.stringify({
          title: this.newTitle,
          content: [this.newContent],
        }),
        headers: headersPost,
        cache: "default",
      };

      fetch("http://5.135.119.239:3090/notes/", initPost)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          let post = {
            id: data.note_id,
            title: this.newTitle,
            content: this.newContent,
            color: "purple",
          };
          this.posts.push(post);
          this.newTitle = "";
          this.newContent = "";
        });
    },
    updateTitle(id, newTitle) {
      let index = this.posts.findIndex(function (post) {
        return post.id == id;
      });
      if (index >= 0) {
        let updatedPost = this.posts[index];
        updatedPost.title = newTitle;
        console.log(updatedPost);
        this.posts[index] = updatedPost;
        this.updatePostAPI(updatedPost);
      }
    },
    updateContent(id, newContent) {
      let index = this.posts.findIndex(function (post) {
        return post.id == id;
      });
      if (index >= 0) {
        let updatedPost = this.posts[index];
        updatedPost.content = newContent;
        console.log(updatedPost);
        this.posts[index] = updatedPost;
        this.updatePostAPI(updatedPost);
      }
    },

    toggleAddModale() {
      this.showAddModale = !this.showAddModale;
      this.newTitle = "";
      this.newContent = "";
    },

    updateColor(id, newColor) {
      console.log("updating colors");
      let index1 = this.colors.findIndex(function (color) {
        return color.id == id;
      });
      let updatedColor = { id: id, color: newColor };
      if (index1 >= 0) {
        this.colors[index1] = updatedColor;
      } else {
        this.colors.push(updatedColor);
      }

      let index2 = this.posts.findIndex(function (post) {
        return post.id == id;
      });
      let updatedPost = this.posts[index2];
      updatedPost.color = newColor;
      this.posts[index2] = updatedPost;
    },
  },
  watch: {
    posts: {
      handler(newPosts) {
        localStorage.posts = JSON.stringify(newPosts);
      },
      deep: true,
    },
    colors: {
      handler(newColors) {
        localStorage.colors = JSON.stringify(newColors);
      },
      deep: true,
    },
  },
  mounted() {
    // if (localStorage.posts) {
    //   this.posts = JSON.parse(localStorage.posts);
    // }
    // if (localStorage.id) {
    //   this.id = localStorage.id;
    // }
    if (localStorage.colors) {
      this.colors = JSON.parse(localStorage.colors);
    }
    let headersGet = new Headers({
      "Content-Type": "application/json",
    });
    let initGet = {
      method: "GET",
      headers: headersGet,
      mode: "cors",
      cache: "default",
    };
    fetch("http://5.135.119.239:3090/notes", initGet)
      .then((res) => res.json())
      .then((data) => {
        console.log("contenu de l'API : ");
        console.log(data);
        data.notes.forEach((d) => {
          let text = "";
          if (d.content.length > 1) {
            d.content.forEach((c) => (text += c + ". "));
          } else {
            text = d.content[0];
          }
          let index = this.colors.findIndex(function (color) {
            return color.id == d._id;
          });
          let post = {};
          if (index >= 0) {
            post = {
              id: d._id,
              title: d.title,
              content: text,
              color: this.colors[index].color,
            };
          } else {
            post = {
              id: d._id,
              title: d.title,
              content: text,
              color: "purple",
            };
          }
          this.posts.push(post);
        });
      });
  },
};
</script>

<template>
  <div class="container my-5">
    <AddModale
      :showAddModale="showAddModale"
      :toggleAddModale="toggleAddModale"
      v-model:newTitle="newTitle"
      v-model:newContent="newContent"
      @submitData="addPostIt"
    />
    <svg
      class="addbtn"
      @click="toggleAddModale"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
      <path
        d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 368C269.3 368 280 357.3 280 344V280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H280V168C280 154.7 269.3 144 256 144C242.7 144 232 154.7 232 168V232H168C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H232V344C232 357.3 242.7 368 256 368z"
      />
    </svg>
  </div>
  <div class="postits">
    <PostIt
      v-for="post in posts"
      :key="post.id"
      :id="post.id"
      :title="post.title"
      :content="post.content"
      :color="post.color"
      @updateTitle="updateTitle"
      @updateContent="updateContent"
      @updateColor="updateColor"
      @deletePostIt="deletePostIt"
      @showPostIt="showPostIt"
    />
  </div>
</template>

<style scoped>
.postits {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.addbtn {
  width: 5vw;
  min-width: 50px;
  cursor: pointer;
  border-radius: 100%;
}
.addbtn:hover {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>


