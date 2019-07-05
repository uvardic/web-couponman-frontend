<template>
<div>
    <div class="form-container">
        <div class="form-field">
            <label for="user-id">User Id:</label>
            <br>
            <input type="number" id="user-id" name="user-id" v-model="input.userId" placeholder="User Id"/> 
        </div>  
        <div class="form-field">
            <label for="username">Username:</label>
            <br>
            <input type="text" id="username" name="username" v-model="input.username" placeholder="Username"/> 
        </div>  
        <div class="form-field"> 
            <label for="password">Password:</label>
            <br>
            <input type="password" id="password" name="password" v-model="input.password" placeholder="Password"/>
        </div>
        <div class="form-field"> 
            <label for="confirm-password">Confirm Password:</label>
            <br>
            <input type="password" id="confirm-password" name="confirm-password" v-model="input.confirmPassword" placeholder="Confirm Password"/>
        </div>
        <div class="form-field"> 
            <label for="privilegeLevel">Privilege Level:</label>
            <br>
            <input type="text" id="privilegeLevel" name="privilegeLevel" v-model="input.privilegeLevel" placeholder="Privilege Level"/>
        </div>
        <div class="form-field"> 
            <label for="firstName">First Name:</label>
            <br>
            <input type="text" id="firstName" name="firstName" v-model="input.firstName" placeholder="First Name"/>
        </div>
        <div class="form-field"> 
            <label for="lastName">Last Name:</label>
            <br>
            <input type="text" name="lastName" v-model="input.lastName" placeholder="Last Name"/>
        </div>
        <div class="form-field">
            <button type="button" v-on:click="register()">Register</button>
        </div>
        <div class="form-field">
            <h3>{{message}}</h3>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'NewUserForm',

    data() {
        return {
            input: {
                userId: null,
                username: '',
                password: '',
                confirmPassword: '',
                privilegeLevel: '',
                firstName: '',
                lastName: ''
            },
            message: ''
        };
    },

    methods: {
        register() {
            const xHttp = new XMLHttpRequest();

            if (this.password !== this.confirmPassword) {
                this.message = 'Passwords dont match'
                return;
            }

            const vue = this;

            xHttp.onreadystatechange = function () {
                if (this.readyState === 4) {
                    console.log(this.status);
                    console.log(this.responseText);
                    if (this.status === 200) {
                        vue.message = 'User Registered'
                    } else {
                        vue.message = 'Invalid input'
                    }
                } 
            };

            xHttp.open('POST', 'http://localhost:8081/api/user/save', true);
            xHttp.setRequestHeader('Content-Type', 'application/json');
            xHttp.send(JSON.stringify({
                id: this.input.userId,
                username: this.input.username,
                password: this.input.password,
                privilegeLevel: this.input.privilegeLevel,
                firstName: this.input.firstName,
                lastName: this.input.lastName
            }));
        }
    }
}
</script>

<style scoped>
.form-container {
    margin-left: 20%;
}

.form-field {
    padding: 10px;
}

.form-field input {
    width: 70%;
    height: 34px;
}

.form-field button {
    width: 70%;
    height: 32px;

    font-size: 18px;
}
</style>
