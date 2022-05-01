<script>
//import router from "@/router";
import ColorsModale from "@/components/ColorsModale.vue";
export default {
  name: "PostIt",
  components: {
    ColorsModale,
  },
  props: {
    id: String,
    title: String,
    content: String,
    color: String,
  },
  data() {
    return {
      tempTitle: this.title,
      tempContent: this.content,
      tempColor: this.color,
      showColorsModale: false,
    };
  },
  emits: [
    "showPostIt",
    "deletePostIt",
    "updateTitle",
    "updateContent",
    "updateColor",
  ],
  methods: {
    toggleColorsModale() {
      this.showColorsModale = !this.showColorsModale;
    },
    submitColor(color) {
      this.tempColor = color;
      this.showColorsModale = !this.showColorsModale;
      this.$emit("updateColor", this.id, color);
    },
  },
};
</script>

<template>
  <div class="postIt" :class="tempColor">
    <ColorsModale
      :showColorsModale="showColorsModale"
      :toggleColorsModale="toggleColorsModale"
      @submitColor="submitColor"
    />
    <!-- <h1 contenteditable="true" @blur="$emit('updateTitle', id, $this.value)">
      {{ title }}
    </h1> -->
    <textarea
      class="title"
      spellcheck="false"
      v-model="tempTitle"
      @blur="$emit('updateTitle', id, this.tempTitle)"
    />
    <!-- <p contenteditable="true" @blur="$emit('updateContent', id, $this.value)">
      {{ content }}
    </p> -->
    <textarea
      class="content"
      spellcheck="false"
      v-model="tempContent"
      @blur="$emit('updateContent', id, this.tempContent)"
    />
    <!-- <button @click="$emit('deletePostIt', id)" class="del btn btn-outline-dark">
      x
    </button>
    <button @click="$emit('showPostIt', id)" class="show btn btn-outline-dark">
      Show
    </button> -->
    <svg
      class="delbtn"
      @click="$emit('deletePostIt', id)"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
      <path
        d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM175 208.1L222.1 255.1L175 303C165.7 312.4 165.7 327.6 175 336.1C184.4 346.3 199.6 346.3 208.1 336.1L255.1 289.9L303 336.1C312.4 346.3 327.6 346.3 336.1 336.1C346.3 327.6 346.3 312.4 336.1 303L289.9 255.1L336.1 208.1C346.3 199.6 346.3 184.4 336.1 175C327.6 165.7 312.4 165.7 303 175L255.1 222.1L208.1 175C199.6 165.7 184.4 165.7 175 175C165.7 184.4 165.7 199.6 175 208.1V208.1z"
      />
    </svg>
    <svg
      class="togglecolorsbtn"
      @click="toggleColorsModale"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
      <path
        d="M512 255.1C512 256.9 511.1 257.8 511.1 258.7C511.6 295.2 478.4 319.1 441.9 319.1H344C317.5 319.1 296 341.5 296 368C296 371.4 296.4 374.7 297 377.9C299.2 388.1 303.5 397.1 307.9 407.8C313.9 421.6 320 435.3 320 449.8C320 481.7 298.4 510.5 266.6 511.8C263.1 511.9 259.5 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256V255.1zM96 255.1C78.33 255.1 64 270.3 64 287.1C64 305.7 78.33 319.1 96 319.1C113.7 319.1 128 305.7 128 287.1C128 270.3 113.7 255.1 96 255.1zM128 191.1C145.7 191.1 160 177.7 160 159.1C160 142.3 145.7 127.1 128 127.1C110.3 127.1 96 142.3 96 159.1C96 177.7 110.3 191.1 128 191.1zM256 63.1C238.3 63.1 224 78.33 224 95.1C224 113.7 238.3 127.1 256 127.1C273.7 127.1 288 113.7 288 95.1C288 78.33 273.7 63.1 256 63.1zM384 191.1C401.7 191.1 416 177.7 416 159.1C416 142.3 401.7 127.1 384 127.1C366.3 127.1 352 142.3 352 159.1C352 177.7 366.3 191.1 384 191.1z"
      />
    </svg>
    <svg
      class="showbtn"
      @click="$emit('showPostIt', id)"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
      <path
        d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM406.6 278.6l-103.1 103.1c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25L306.8 288H128C110.3 288 96 273.7 96 256s14.31-32 32-32h178.8l-49.38-49.38c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l103.1 103.1C414.6 241.3 416 251.1 416 256C416 260.9 414.6 270.7 406.6 278.6z"
      />
    </svg>
  </div>
</template>

<style scoped>
.postIt {
  width: 300px;
  height: 300px;
  background-color: rgba(151, 48, 177, 0.9);
  margin: 10px;
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
  padding: 10px 40px 10px 15px;
  font-weight: 700;
  text-align: center;
  font-size: 21px;
  font-style: italic;
  background: none;
  outline: none;
  border-style: none;
  resize: none;
  overflow: hidden;
}
.content {
  box-sizing: border-box;
  height: 150px;
  width: 100%;
  padding: 5px 15px;
  background: none;
  outline: none;
  border-style: none;
  resize: none;
  overflow: hidden;
}

.delbtn {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 20px;
  cursor: pointer;
  border-radius: 100%;
}
.delbtn:hover {
  background-color: rgba(0, 0, 0, 0.3);
}

.showbtn {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  border-radius: 100%;
}

.showbtn:hover {
  background-color: rgba(0, 0, 0, 0.3);
}

.togglecolorsbtn {
  position: absolute;
  bottom: 10px;
  left: 10px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  border-radius: 100%;
}

.togglecolorsbtn:hover {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>

