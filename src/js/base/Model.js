window.Model = function (options) {
    let resourceName = options.resourceName
    return {
        init: function () {
            var APP_ID = '30FJxNRGUl44IppYUSj40Thw-gzGzoHsz';
            var APP_KEY = 'SSl3FACzzTQv2pCNMxkNh6T8';
            AV.init({ appId: APP_ID, appKey: APP_KEY });
        },
        fetch: function () {
            var query = new AV.Query(resourceName);
            return query.find()  //Promise对象
        },
        save: function (object) {
            var Message = AV.Object.extend(resourceName);
            var message = new Message();
            return message.save(object)
        }
    }
}