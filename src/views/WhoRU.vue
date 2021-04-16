<template>
    <div class="bg-brownycolors w-screen h-screen">
            <div class="filter drop-shadow-xl">
                <div class="pt-72">
                    <p class="font-chewy text-5xl text-cosmiclatte " >Who are you?</p>
                </div>
                <div class="pt-4">
                    <form @submit.prevent="submitForm">
                    <input v-model="enteredName" class="rounded-full py-2 px-6 font-chewy" type="text">            
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
         invalidNameInput: false,
         userId: 0
     }
 },
    methods:{
        async submitForm(){
            this.invalidNameInput = this.enteredName === '' ? true : false
            console.log(`Entered Users: ${this.enteredName}`)
            
            if(this.enteredName !== ''){
                const user = {
                    name: this.enteredName

                }
                const isExist = await this.checkUserExist(user)
                if(!isExist){
                     this.addNewUser(user)
                     this.$router.push(`/Home/${this.enteredName}/${this.userId}`)
                }else{
                    // alert('user already exist')
                    this.$router.push(`/Home/${this.enteredName}/${this.userId}`)
                }
            }
        },
        async checkUserExist(user) {
            try {
                const res = await fetch(`http://localhost:5000/Users`, {
                    methods: 'GET',
                    headers: {
                        'content-type': 'application/json'
                    },
                })
                const data = await res.json()
                let isExist = false
                data.forEach(element => {
                    if(element.name === user.name){
                        isExist = true
                        this.userId = element.id 
                    }
                });
                console.log(isExist)
                return isExist

            } catch (error) {
                console.log(error)
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
