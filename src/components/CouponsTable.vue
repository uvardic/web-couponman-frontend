<template>
    <div>
        <h3>Coupons</h3>
        <div>
            <button type="button" v-on:click="loadCoupons()">Find All</button>
            <button type="button" v-on:click="loadActiveCoupons()">Find All Active</button>
            <table id="coupon-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Shop</th>
                        <th>Discounted Price</th>
                        <th>Original Price</th>
                        <th>Discount</th>
                        <th>Valid From</th>
                        <th>Valid To</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
        <div id="page-numbers">

        </div>
    </div>
</template>

<script>
export default {
    name: 'CouponsTable',

    data() {
        return {
            pageNumber: 1,
            numberOfPages: 0
        };
    },

    methods: {
        loadActiveCoupons() {
            const xHttp = new XMLHttpRequest();
            const vue = this;

            xHttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    const couponsPage = JSON.parse(this.response);
                    vue.numberOfPages = couponsPage.pageInfo.numberOfPages;
                    vue.createTable(couponsPage);

                    const buttonContainer = document.getElementById('page-numbers');
                    buttonContainer.innerHTML = '';

                    for (let i = 1; i < vue.numberOfPages + 1; i++) {
                        const button = document.createElement('button');
                        button.innerText = i;
                        button.type = 'button';
                        button.value = i;
                        button.addEventListener('click', function() {
                            vue.pageNumber = button.value;
                            vue.loadCoupons();
                        });
                        
                        buttonContainer.appendChild(button);
                    }
                }
            };

            xHttp.open('GET', 'http://localhost:8081/api/coupon/allActive/' + this.pageNumber, true);
            xHttp.send();
        },

        loadCoupons() {
            const xHttp = new XMLHttpRequest();
            const vue = this;

            xHttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    const couponsPage = JSON.parse(this.response);
                    vue.numberOfPages = couponsPage.pageInfo.numberOfPages;
                    vue.createTable(couponsPage);

                    const buttonContainer = document.getElementById('page-numbers');
                    buttonContainer.innerHTML = '';

                    for (let i = 1; i < vue.numberOfPages + 1; i++) {
                        const button = document.createElement('button');
                        button.innerText = i;
                        button.type = 'button';
                        button.value = i;
                        button.addEventListener('click', function() {
                            vue.pageNumber = button.value;
                            vue.loadCoupons();
                        });
                        
                        buttonContainer.appendChild(button);
                    }

                }
            };

            xHttp.open('GET', 'http://localhost:8081/api/coupon/all/' + this.pageNumber, true);
            xHttp.send();
        },

        createTable(couponsPage) {
            const table = document.getElementById('coupon-table');
            const oldTBody = table.tBodies[0];
            const newTBody = document.createElement('tBody');

            for (let i = 0; i < couponsPage.response.length; i++) {
                const bRow = document.createElement("tr");
                const tdProduct = document.createElement("td");
                const tdShop = document.createElement("td");
                const tdDiscountedPrice = document.createElement("td");
                const tdOriginalPrice = document.createElement("td");
                const tdPercentage = document.createElement("td");
                const tdValidFrom = document.createElement("td");
                const tdValidTo = document.createElement("td");
                const tdDelete = document.createElement("td");

                tdProduct.innerHTML = couponsPage.response[i].product;
                tdShop.innerHTML = couponsPage.response[i].shop.name;
                tdDiscountedPrice.innerHTML = Math.round(couponsPage.response[i].discountedPrice * 100) / 100;
                tdOriginalPrice.innerHTML = Math.round(couponsPage.response[i].originalPrice * 100) / 100;
                const percentage = ((couponsPage.response[i].originalPrice - couponsPage.response[i].discountedPrice) / couponsPage.response[i].originalPrice) * 100;
                tdPercentage.innerHTML = Math.round(percentage * 100) / 100;
                tdValidFrom.innerHTML = couponsPage.response[i].validFrom;
                tdValidTo.innerHTML = couponsPage.response[i].validTo;
                const button = document.createElement('button');
                button.type = 'button';
                button.innerText = 'X';
                button.addEventListener('click', function() {
                    const xHttp = new XMLHttpRequest();

                    xHttp.onreadystatechange = function() {
                        if (this.readyState === 4 && this.status === 200) {
                            table.deleteRow(button.parentNode.parentNode.rowIndex);
                        }
                    }

                    xHttp.open('DELETE', 'http://localhost:8081/api/coupon/delete/' + couponsPage.response[i].id, true);
                    xHttp.send();
                });

                tdDelete.appendChild(button);
                
                bRow.appendChild(tdProduct);
                bRow.appendChild(tdShop);
                bRow.appendChild(tdDiscountedPrice);
                bRow.appendChild(tdOriginalPrice);
                bRow.appendChild(tdPercentage);
                bRow.appendChild(tdValidFrom);
                bRow.appendChild(tdValidTo);
                bRow.appendChild(tdDelete);

                newTBody.appendChild(bRow);
            }

            table.replaceChild(newTBody, oldTBody);
        }
    },

    beforeMount() {
        this.loadCoupons();
    },

    mounted() {
        
    }
}
</script>

<style>
table {
    font-size: 16px;
    border-collapse: collapse;
    width: 100%;
}

table, th, td {
    border: 1px solid #ddd;
}

th {
    background-color: #3352ff;
    color: white;
}

div.inline {
    float: left;
}

tr:nth-child(even) {
    background-color: #f2f2f2;
}
</style>
