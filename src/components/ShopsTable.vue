<template>
    
</template>

<script>
export default {
    name: 'ShopsTable',

    data() {
        return {};
    },

    methods: {
        loadCoupons() {
            const xHttp = new XMLHttpRequest();

            xHttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    const result = JSON.parse(this.response);
                    const table = document.getElementById("couponTable");
                    const oldTBody = table.tBodies[0];
                    const newTBody = document.createElement("tBody");

                    for (let i = 0; i < result.length; i++) {
                        const bRow = document.createElement("tr");
                        const tdProduct = document.createElement("td");
                        const tdShop = document.createElement("td");
                        const tdDiscountedPrice = document.createElement("td");
                        const tdOriginalPrice = document.createElement("td");
                        const tdPercentage = document.createElement("td");
                        const tdDelete = document.createElement("td");

                        tdProduct.innerHTML = result[i].product;
                        tdShop.innerHTML = result[i].shop.name;
                        tdDiscountedPrice.innerHTML = Math.round(result[i].discountedPrice * 100) / 100;
                        tdDiscountedPrice.className = "green-row";
                        tdOriginalPrice.innerHTML = Math.round(result[i].originalPrice * 100) / 100;
                        tdOriginalPrice.className = "red-row";
                        const percentage = ((result[i].originalPrice - result[i].discountedPrice) / result[i].originalPrice) * 100;
                        tdPercentage.innerHTML = Math.round(percentage * 100) / 100 + " %";
                        const button = document.createElement("input");
                        button.type = "button";
                        button.value = " X ";
                        tdDelete.appendChild(button);

                        bRow.appendChild(tdProduct);
                        bRow.appendChild(tdShop);
                        bRow.appendChild(tdDiscountedPrice);
                        bRow.appendChild(tdOriginalPrice);
                        bRow.appendChild(tdPercentage);
                        bRow.appendChild(tdDelete);

                        newTBody.appendChild(bRow)
                    }

                    table.replaceChild(newTBody, oldTBody)
                }
            };

            xHttp.open("GET", "http://localhost:8081/api/shop/all", true);
            xHttp.send();
        }
    }
}
</script>

<style>

</style>
