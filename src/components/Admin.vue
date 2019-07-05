<template>
    <div>
        <CouponsTable/>
        <NewCouponForm/>
        <NewUserForm/>
    </div>
</template>

<script>
import NewUserForm from './NewUserForm'
import CouponsTable from './CouponsTable'
import NewCouponForm from './NewCouponForm'

export default {
    name: 'Admin',

    components: {
        NewUserForm,
        CouponsTable,
        NewCouponForm
    },

    data() {
        return {};
    }
}
</script>

<style>

</style>

