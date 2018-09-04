!function () {
  let specialTags = document.querySelectorAll('[data-x]');

  for (let i = 0; i < specialTags.length; i++) {
    specialTags[i].classList.add('offset');
  }

  findCloseRemoveOffset();
  window.addEventListener('scroll', function (x) {
    findCloseRemoveOffset();
  });
  /*helper*/

  function findCloseRemoveOffset() {
    let specialTags = document.querySelectorAll('[data-x]');
    let minIndex = 0; //设置最小值窗口离顶部最近的元素

    for (let i = 1; i < specialTags.length; i++) {
      //遍历
      if (Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY)) {
        minIndex = i; //console.log(minIndex)
      }
    }

    specialTags[minIndex].classList.remove('offset');

    for (let i = 0; i < specialTags.length; i++) {
      //遍历,清除
      specialTags[i].classList.remove('highlight');
    }

    specialTags[minIndex].classList.add('highlight');
    let id = specialTags[minIndex].id; //console.log(id)

    let a = document.querySelector('a[href="#' + id + '"]'); //href not write error

    let li = a.parentNode;
    let bortherAndMe = li.parentNode.children;

    for (let i = 0; i < bortherAndMe.length; i++) {
      bortherAndMe[i].classList.remove('highlight');
    }

    li.classList.add('highlight');
  }

  let liTags = document.querySelectorAll('nav.menu > ul >li'); //查询选择器所有

  for (let i = 0; i < liTags.length; i++) {
    liTags[i].onmouseenter = function (x) {
      //当入时触发
      x.currentTarget.classList.add('active');
    };

    liTags[i].onmouseleave = function (x) {
      //当移出触发
      x.currentTarget.classList.remove('active');
    };
  }
}.call();