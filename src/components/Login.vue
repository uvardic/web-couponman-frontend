<template>
<div>
    <div class="form-container">
        <div class="form-field">
            <label for="username">Username:</label>
            <br>
            <input type="text" name="username" v-model="input.username" placeholder="Username"/> 
        </div>  
        <div class="form-field"> 
            <label for="password">Password:</label>
            <br>
            <input type="password" name="password" v-model="input.password" placeholder="Password"/>
        </div>
        <div class="form-field">
            <button type="button" v-on:click="login()">Login</button>
        </div>
        <div class="form-field">
            <h3>{{message}}</h3>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'Login',

    data() {
        return {
            input: {
                username: '',
                password: ''
            },
            message: ''
        };
    },

    methods: {
        login() {
            const xHttp = new XMLHttpRequest();
            const vue = this;

            xHttp.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        const user = JSON.parse(this.response);
                        
                        console.log(user.firstName);

                        vue.$emit('authenticated', true);
                        vue.$emit('firstName', user.firstName);
                        vue.$emit('lastName', user.lastName);

                        if (user.privilegeLevel === 'ADMINISTRATOR') {
                            vue.$router.replace({ name: 'admin' });
                        } else {
                            vue.$router.replace({ name: 'user' })
                        }
                    } else {
                        vue.message = 'Invalid username or password';
                    }
                } 
            };

            xHttp.open('POST', 'http://localhost:8081/api/user/login', true);
            xHttp.setRequestHeader('Content-Type', 'application/json');
            xHttp.send(JSON.stringify({
                username: this.input.username,
                password: this.input.password
            }));
        }
    }
}
</script>

<style scoped>
.form-container {
    margin-left: 30%;
    margin-top: 10%;
}

.form-field {
    padding: 10px;
}

.form-field input {
    width: 50%;
}

.form-field button {
    width: 50%;
    height: 32px;

    font-size: 18px;
}
</style>
