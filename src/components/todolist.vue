<template>
  <div class="font-chewy drop-shadow-xl">
    <!-- enteredtodolist -->
    <div class="pt-24">
      <div class="text-4xl">
        <p>To do list</p>
      </div>
      <div class="pt-4">
        <form @submit.prevent="submitTodo">
          <input
            v-model="enteredTodo"
            class="rounded-full py-2 px-6"
            type="text"
          />
          <input type="submit" style="position: absolute; left: -9999px" />
          <p v-if="invalidTodoInput" class="text-base text-camel">
            Please enter your Todo!
          </p>
        </form>
      </div>
    </div>
    <!-- existtodolist -->
    <div>
      <div class="pt-10 px-96">
        <ul>
          <li v-for="item in listTodo" :key="item.id">
            <!-- <div class="rounded-full py-2 px-6 bg-white mt-4"> -->
            <div class="flex flex-row justify-center pt-4">
              <div>
                <input type="checkbox" class="form-checkbox h-6 w-6" />
              </div>
              <div class="pl-2">
                {{ item.list }}
              </div>
              <div class="pl-2">
                <button
                  class="inline-block px-4 py-2 mr-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"
                  @click="startEditing(item.id, item.list)"
                >
                  Edit
                </button>
              </div>
              <div class="pl-2">
                <button
                  class="inline-block px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"
                  @click="deleteTodo(item.id)"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        </ul>
        <div v-if="isEditing">
          <form @submit.prevent="submitEdit">
            <input v-model="editInputTodo" class="rounded-full py-2 px-6 font-chewy" type="text">
            <input type="submit" style="position: absolute; left: -9999px"/>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async mounted() {
    this.readTodo();
  },
  data() {
    return {
      enteredTodo: "",
      invalidTodoInput: false,
      listTodo: [],
      isEditing: false,
      editInputTodo: '',
      editingTodo: {
        id: Number,
        list: String
      }
    };
  },
  methods: {
    async submitTodo() {
      this.invalidTodoInput = this.enteredTodo === "" ? true : false;
      console.log(`Enter Todo: ${this.enteredTodo}`);
      console.log(`invalidTodoInput: ${this.invalidTodoInput}`);

      if (this.enteredTodo !== "") {
        const todo = {
          owner: this.$route.params.name,
          list: this.enteredTodo,
        };
        this.addTodo(todo);
        location.reload();
      }
    },

    async addTodo(todo) {
      try {
        await fetch(`http://localhost:5000/List`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(todo),
        });
      } catch (error) {
        console.log(error);
      }
    },

    async readTodo() {
      try {
        const res = await fetch(
          `http://localhost:5000/List?owner=${this.$route.params.name}`,
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
          }
        )
        const data = await res.json();
        data.forEach((element) => {
          this.listTodo.push({
            id: element.id,
            list: element.list,
          });
        });
        console.log(this.listTodo);
        return this.listTodo;
      } catch (error) {
        console.log(error);
      }
    },

    async startEditing(id, todo) {
      this.isEditing = true
      this.editingTodo['id'] = id
      this.editingTodo['list'] = todo

      console.log(`startEditing id: ${id}`);
      console.log(`startEditing list: ${todo}`);
    },

    async submitEdit() {
      const res = await fetch(`http://localhost:5000/List/${this.editingTodo.id}`, {
        method: "PUT",
        headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify({
          owner: this.$route.params.name,
					list: this.editInputTodo
				})
      })
      const data = await res.json()
      this.listTodo = this.listTodo.map((element) =>
          element.id === data.id ? {
            ...element,
            owner: data.owner,
            list: data.list
          }: element
      )
        this.isEditing = false
    },

    async deleteTodo(id) {
      await fetch(`http://localhost:5000/List/${id}`, {
        method: "DELETE",
      });
      location.reload();
    },
  },
};
</script>

