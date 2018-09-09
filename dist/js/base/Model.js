window.Model = function (options) {
  let resourceName = options.resourceName;
  return {
    init: function () {
      var APP_ID = '30FJxNRGUl44IppYUSj40Thw-gzGzoHsz';
      var APP_KEY = 'SSl3FACzzTQv2pCNMxkNh6T8';
      AV.init({
        appId: APP_ID,
        appKey: APP_KEY
      });
    },
    fetch: function () {
      var query = new AV.Query(resourceName);
      var now = new Date();
      query.lessThanOrEqualTo('createdAt', now);//查询今天之前创建的 Todo
      query.limit(10);// 最多返回 10 条结果
      query.descending('createdAt');
      return query.find(); //Promise对象
    },
    save: function (object) {
      var Message = AV.Object.extend(resourceName);
      var message = new Message();
      return message.save(object);
    }
  };
};