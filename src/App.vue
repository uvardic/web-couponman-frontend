<template>
<div id="app">
    <div id="nav">
        <h3>{{firstName}} {{lastName}}</h3>
        <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>Logout</router-link>
    </div>
    <router-view @authenticated="setAuthenticated"/>
</div>
</template>

<script>
export default {
    name: 'App',

    data() {
        return {
            authenticated: false,
            firstName: '',
            lastName: ''
        };
    },

    mounted() {
        if (!this.authenticated) {
            this.$router.replace({ name: "login" });
        }
    },

    methods: {
        setAuthenticated(status) {
            this.authenticated = status;
        },

        logout() {
            this.authenticated = false;
        }
    }
}
</script>

<style>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.4;
}
</style>
