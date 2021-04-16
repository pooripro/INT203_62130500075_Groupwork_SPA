<template>
  <div class="font-chewy drop-shadow-xl">
    <!-- enteredtodolist -->
    <div class="pt-24">
        <div class="text-4xl">
          <p>To do list</p>
        </div>
        <div class="pt-4">
            <form @submit.prevent="submitTodo">
            <input v-model="enteredTodo" v-on:keyup.enter="submitDescribe" class="rounded-full py-2 px-6" type="text">
            <input type="submit" style="position: absolute; left: -9999px"/>
            <p v-if="invalidTodoInput" class="text-base text-camel"> Please enter your Todo! </p>
            </form>
        </div>
    </div>
  </div>
    <!-- existtodolist -->
</template>

<script>
export default {
  data(){
    return {
      enteredTodo: '',
      invalidTodoInput: false,
    }
  },
    methods:{
      async submitTodo(){
        this.invalidTodoInput = this.enteredTodo === '' ? true : false
        console.log(`Enter Todo: ${this.enteredTodo}`)
        console.log(`invalidTodoInput: ${this.invalidTodoInput}`)
        
        if(this.enteredTodo !== ''){
            const todo = {
              owner: this.$route.params.name,
              list: this.enteredTodo
            }
            this.addTodo(todo)
        }
      },

      async addTodo(todo){
        try {
              await fetch(`http://localhost:5000/List`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(todo)
              })
          } catch (error) {
            console.log(error);
          }
}
    },

  
}
</script>

