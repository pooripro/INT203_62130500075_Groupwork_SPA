<template>
    <div class="bg-brownycolors w-screen h-screen" >
            <div class="filter drop-shadow-xl">
                <div class="pt-72">
                    <p class="font-chewy text-5xl text-cosmiclatte " >Who are you?</p>
                </div>
                <div class="pt-4">
                    <form @submit.prevent="submitForm">
                    <input v-model="enteredName" class="rounded-full py-2 px-6" type="text">            
                    <input type="submit" style="position: absolute; left: -9999px"/>
                    <p v-if="invalidNameInput" class="font-chewy text-base text-camel"> Please enter your name! </p>
                    </form>
                </div>
            </div>
    </div>
</template>

<script>
export default {
    data(){
     return {
         enteredName: '',
         invalidNameInput: false
     }
 },
    methods:{
        submitForm(){
            this.invalidNameInput = this.enteredName === '' ? true : false
            console.log(this.enteredName)
            if(this.enteredName !== ''){
                this.addNewUser({
                    name: this.enteredName
                })
            }
        },

        async addNewUser(users) {
        try {
            await fetch(`http://localhost:5000/Users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                name: users.name
                })
            })
        } catch (error) {
            console.log(`Could not save! ${error}`)
        }
    }
  }
}
</script>
