<template>
  <div class="home">home page1111</div>
</template>

<script>
export default {
  methods: {
    add(list) {
      const arrList = list.filter((_) => _.multi).map((_) => _.id)

      const arr2 =
        arrList.length > 0
          ? arrList.slice(0, arrList.length)
          : arrList.slice(arrList.length - 2)

      console.log(arr2)
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  border: 1px solid #000;
  border-radius: 10px;
  height: 200px;
  margin: 20px auto;
  width: 400px;
}
</style>
