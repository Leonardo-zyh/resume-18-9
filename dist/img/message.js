!function(){
    var APP_ID = '30FJxNRGUl44IppYUSj40Thw-gzGzoHsz';
    var APP_KEY = 'SSl3FACzzTQv2pCNMxkNh6T8';
    
    AV.init({
      appId: APP_ID,
      appKey: APP_KEY
    });
    
    var query = new AV.Query('Message');
    query.find().then(function (message) {
    // console.log(message[0].attributes)
     let array = message.map((item)=> item.attributes)
     array.forEach((item)=>{
       let li = document.createElement('li')
       li.innerText =`${item.name}: ${item.content}`
       let messageList = document.querySelector('#messageList')
       messageList.appendChild(li)
     })
    }, function (error) {
      alert(提交失败)// 异常处理
    });
    
    
    let myForm = document.querySelector('#postMessageForm')
    
    myForm.addEventListener('submit',function(e){
      e.preventDefault()
      let content = myForm.querySelector('input[name=content]').value
      let name = myForm.querySelector('input[name=name]').value
      var Message = AV.Object.extend('Message');
      var message = new Message();
      message.save({
        'content': content,
        'name': name,
      }).then(function(object){
        let li = document.createElement('li')
        li.innerText =`${object.attributes.name}: ${object.attributes.content}`
        let messageList = document.querySelector('#messageList')
        messageList.appendChild(li)
        myForm.querySelector('input[name=content]').value = ''
        //alert('留言成功')
      })
    })
  }.call()
  
  
  /*
  //创建 TestObject 表
  var TestObject = AV.Object.extend('Message');
  //在表中创建一行数据
  var testObject = new TestObject();
  //数据内容是words: 'Hello World!'
  //如果保存就运行， alert('');
  testObject.save({
    words: 'Hello World!'
  }).then(function(object) {
    alert('LeanCloud Rocks!');
  })*/