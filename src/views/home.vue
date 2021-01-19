<template>
    <div class="home">
        home page1111
    </div>
</template>

<script>
    export default {
        asyncData({ store,route }){
            return store.dispatch('fetchItem',route.params.id)
        }
    }
</script>

<style lang="less" scoped>
.home{
    width:400px;
    height:200px;
    margin: 20px auto;
    border:1px solid #000;
    border-radius: 10px;
}
</style>