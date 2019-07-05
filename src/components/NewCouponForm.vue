<template>
<div>
    <div class="form-container">
        <div class="form-field">
            <label for="coupon-id">Coupon Id:</label>
            <br>
            <input type="number" id="coupon-id" name="coupon-id" v-model="input.couponId" placeholder="Coupon Id"/> 
        </div>  
        <div class="form-field">
            <label for="product">Product:</label>
            <br>
            <input type="text" id="product" name="product" v-model="input.product" placeholder="Product"/> 
        </div>  
        <div class="form-field"> 
            <label for="original-price">Original Price:</label>
            <br>
            <input type="number" id="original-price" name="original-price" v-model="input.originalPrice" placeholder="Original Price"/>
        </div>
        <div class="form-field"> 
            <label for="discounted-price">Discounted Price:</label>
            <br>
            <input type="number" id="discounted-price" name="confirm-password" v-model="input.discountedPrice" placeholder="Discounted Price"/>
        </div>
        <div class="form-field"> 
            <label for="valid-from">Valid From:</label>
            <br>
            <input type="text" id="valid-from" name="valid-from" v-model="input.validFrom" placeholder="Valid From"/>
        </div>
        <div class="form-field"> 
            <label for="valid-to">Valid To:</label>
            <br>
            <input type="text" id="valid-to" name="valid-to" v-model="input.validTo" placeholder="Valid To"/>
        </div>
        <div class="form-field">
            <select id="shopName" name="shopName" v-model="input.shop">
            </select>
        </div>
        <div class="form-field">
            <button type="button" v-on:click="save()">Save</button>
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
                couponId: null,
                product: '',
                originalPrice: '',
                discountedPrice: '',
                validFrom: '',
                validTo: null,
                shop: null,
            },
            message: ''
        };
    },

    methods: {
        save() {
            const xHttp = new XMLHttpRequest();

            const vue = this;

            xHttp.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        vue.message = 'Coupon saved'
                    } else {
                        vue.message = 'Invalid input'
                    }
                } 
            };

            xHttp.open('POST', 'http://localhost:8081/api/coupon/save', true);
            xHttp.setRequestHeader('Content-Type', 'application/json');
            const entity = JSON.stringify({
                id: this.input.couponId,
                product: this.input.product,
                originalPrice: this.input.originalPrice,
                discountedPrice: this.input.discountedPrice,
                validFrom: this.input.validFrom,
                validTo: this.input.validTo,
                shop: {id: this.input.shop, name: "Shop", version: 0}
            });

            console.log(entity);

            xHttp.send(entity);
        }
    },

    mounted() {
        const xHttp = new XMLHttpRequest();

        xHttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                const result = (JSON.parse(this.response));
                const select = document.getElementById("shopName");

                for (let i = 0; i < result.length; i++) {
                    const option = document.createElement("option");

                    option.text = result[i].name;
                    option.value = result[i].id;

                    select.add(option, 0);
                }
            }
        }

        xHttp.open('GET', 'http://localhost:8081/api/shop/all', true);
        xHttp.send();
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
