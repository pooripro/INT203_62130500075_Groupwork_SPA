<template>
  <div class="font-chewy drop-shadow-xl">
    <!-- enteredtodolist -->
    <div class="pt-24">
        <div class="text-4xl">
          <p>To do list</p>
        </div>
        <div class="pt-4">
            <form @submit.prevent="submitTodo">
            <input v-model="enteredTodo" class="rounded-full py-2 px-6" type="text">
            <input type="submit" style="position: absolute; left: -9999px"/>
            <p v-if="invalidTodoInput" class="text-base text-camel"> Please enter your Todo! </p>
            </form>
        </div>
    </div>
    <!-- existtodolist -->
    <div>
      <div class="pt-10 px-96">
        <p v-for="item in listTodo" :key="item.id" 
        class="rounded-full py-2 px-6 bg-white mt-4"> 
          {{ item.list }}</p>
          
      </div>
    </div>
  </div>
    
</template>

<script>
export default {
  async mounted(){
        this.readTodo()
        // if(this.listTodo.length != 0){
        //   this.existListTodo = true
        // }
        // console.log(this.existListTodo);

  },  
  data(){
    return {
      enteredTodo: '',
      invalidTodoInput: false,
      listTodo:[],
      // existListTodo: false
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
        },
      
      async readTodo(){
        try {
            const res = await fetch(`http://localhost:5000/List?owner=${this.$route.params.name}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                },
              })
              const data = await res.json()
              data.forEach(element => {
                    this.listTodo.push({
                      id: element.id,
                      list: element.list
                    }) 
              })
              console.log(this.listTodo)
              return this.listTodo

          } catch (error) {
            console.log(error);
        }
      }
  },

  
}
</script>

