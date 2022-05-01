<script>
export default {
  name: "AddModale",
  props: ["showAddModale", "toggleAddModale", "newTitle", "newContent"],
  emits: ["update:newTitle", "update:newContent", "submitData"],
};
</script>

<template>
  <div class="bloc-modale" v-if="showAddModale">
    <div class="overlay" @click="toggleAddModale"></div>

    <div class="modale-card">
      <div @click="toggleAddModale" class="btn-x-modale btn btn-outline-dark">
        X
      </div>
      <h1>New Post-It</h1>
      <input
        type="text"
        :value="newTitle"
        placeholder="Title"
        @input="$emit('update:newTitle', $event.target.value)"
      />
      <textarea
        type="text"
        :value="newContent"
        placeholder="Content"
        @input="$emit('update:newContent', $event.target.value)"
      />
      <button @click="$emit('submitData')" class="btn btn-outline-dark">
        OK
      </button>
    </div>
  </div>
</template>




<style scoped>
.bloc-modale {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
}

.overlay {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.modale-card {
  height: 400px;
  width: 400px;
  background: #f1f1f1;
  position: fixed;
  top: 25%;
  border-radius: 5px;
}

h1 {
  font-size: 2rem;
  margin-top: 10px;
  font-style: italic;
}
input {
  box-sizing: border-box;
  height: 70px;
  width: 100%;
  padding: 10px 25px;
  font-weight: 600;
  justify-content: left;
  font-size: 25px;
  background: none;
  outline: none;
  border-style: none;
}

textarea {
  box-sizing: border-box;
  height: 220px;
  width: 100%;
  padding: 20px 25px 5px;
  background: none;
  outline: none;
  border-style: none;
  resize: none;
  overflow: hidden;
}

.btn-x-modale {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>