!function(){
  var view = View('.message')

  var model = Model({resourceName:'Message'})

  var controller = Controller({
    messageList: null,
    form: null,
    init: function(view,controller){
      this.messageList = view.querySelector('#messageList')
      this.form = view.querySelector('form')
      this.loadMessages()
    },
    loadMessages: function () {
      this.model.fetch().then(
        (messages) => {
        let array = messages.map((item) => item.attributes)
        array.forEach((item) => {
          let li = document.createElement('li')
          li.innerText = `${item.name}: ${item.content}`
          this.messageList.appendChild(li)
        })
      }, function (error) {
        alert('提交失败')// 异常处理
        
      })

    },
    bindEvents: function () {
      
      this.form.addEventListener('submit', (e)=> {
        e.preventDefault() 
        this.saveMessage()
      })
    },
    saveMessage: function() {
      let myForm = this.form
      let name = myForm.querySelector('input[name=name]').value
      let content = myForm.querySelector('input[name=content]').value
      let sorry = document.querySelector('#sorry')
      
      //内容不能为空提示
      if(name==='' || content===''){
        sorry.classList.remove('sorry')
        sorry.classList.add('inputSorry')
        if(name===''){
          document.querySelector('input[name=name]').classList.add('textRemind')
        }else(document.querySelector('input[name=name]').classList.remove('textRemind'))
        if (content===''){
          document.querySelector('input[name=content]').classList.add('textRemind')
        }else(document.querySelector('input[name=content]').classList.remove('textRemind'))
        preventDefault()
      }else{
        sorry.classList.add('sorry')
        document.querySelector('input[name=name]').classList.remove('textRemind')
        document.querySelector('input[name=content]').classList.remove('textRemind')
      }
      
      this.model.save({
        'name':name,'content':content,
      }).then(function (object) {
        let li = document.createElement('li')
        li.innerText = `${object.attributes.name}: ${object.attributes.content}`
        let messageList = document.querySelector('#messageList')
        messageList.appendChild(li)
        myForm.querySelector('input[name=content]').value = ''
        //alert('留言成功')
        console.log(object)
      })
    }
  })

  controller.init(view,model)
}.call()



/*!function () {
  
  var model = {
    //获取数据
    init: function () {
      var APP_ID = '30FJxNRGUl44IppYUSj40Thw-gzGzoHsz';
      var APP_KEY = 'SSl3FACzzTQv2pCNMxkNh6T8';
      AV.init({ appId: APP_ID, appKey: APP_KEY });
    },
    fetch: function(){
      var query = new AV.Query('Message');
      return  query.find()  //Promise对象
    },
    //创建数据
    save: function(name,content){
      var Message = AV.Object.extend('Message');
      var message = new Message();
      return message.save({   //Promise对象
        'name': name,
        'content': content,
      })
    }
  }

  var view = document.querySelector('.message')

  var controller = {
    view: null,
    model: null,
    messageList: null,
    init: function (view, model) {
      this.view = view
      this.model = model
      
      this.messageList = view.querySelector('#messageList')
      this.form = view.querySelector('form')
      this.model.init()
      this.loadMessages()
      this.bindEvents()
      
    },
   
    loadMessages: function () {
      this.model.fetch().then(
        (messages) => {
        let array = messages.map((item) => item.attributes)
        array.forEach((item) => {
          let li = document.createElement('li')
          li.innerText = `${item.name}: ${item.content}`
          this.messageList.appendChild(li)
        })
      }, function (error) {
        alert(提交失败)// 异常处理
        console.log(1)
      })

    },
    bindEvents: function () {
      
      this.form.addEventListener('submit', (e)=> {
        e.preventDefault() 
        this.saveMessage()
      })
    },
    saveMessage: function() {
      let myForm = this.form
      let content = myForm.querySelector('input[name=content]').value
      let name = myForm.querySelector('input[name=name]').value
      this.model.save(name,content).then(function (object) {
        let li = document.createElement('li')
        li.innerText = `${object.attributes.name}: ${object.attributes.content}`
        let messageList = document.querySelector('#messageList')
        messageList.appendChild(li)
        myForm.querySelector('input[name=content]').value = ''
        //alert('留言成功')
        console.log(object)
      })
    }
  }
 
    controller.init(view,model)
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