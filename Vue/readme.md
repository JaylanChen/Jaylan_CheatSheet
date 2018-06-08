# Vue

## 刷新当前路由

刷新当前路由，不是整体加载
    var _this = this;
    this.$router.replace({
      path: "/_empty"
    });
    this.$nextTick(function() {
      _this.$router.replace({
        path: current
      });
    });