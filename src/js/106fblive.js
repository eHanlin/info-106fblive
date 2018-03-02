$(function () {
  let rootPath = document.getElementById('rootPath').getAttribute('data-value')
  let nowSeconds = new Date().getTime() / 1000
  let date0309 = 1520568000
  let date0316 = 1521172800
  let date0323 = 1521777600
  let subjectTarget = $('.container .teacher-condition')
  let leftSideImgTarget = $('.left-side img')
  let videoTarget = $('.youtube-video')
  let widthStyle = '560'
  let heightStyle = '345'
  let normal = () => {
    subjectTarget.append(
      `<img class="ch" title="敬請期待" style="opacity:0.6;" src="${rootPath}/img/柳吟國文敬請期待.png">
        <img class="en" title="敬請期待" style="opacity:0.6;" src="${rootPath}/img/東方智英文敬請期待.png">
        <img class="ma" title="敬請期待" style="opacity:0.6;" src="${rootPath}/img/楊明山數學敬請期待.png">
        <img class="pc" title="敬請期待" style="opacity:0.6;" src="${rootPath}/img/紀揚理化敬請期待.png">
        <img class="so" title="敬請期待" style="opacity:0.6;" src="${rootPath}/img/李天豪社會敬請期待.png">`
    )
    // nowSeconds >= date0309
    if (true) {
      $('.container .teacher-condition .ch').remove()
      subjectTarget.append(
        `<img class="ch" title="柳吟國文" src="${rootPath}/img/柳吟國文正常.png">`
      )
    }
    // nowSeconds >= date0316
    if (true) {
      $('.container .teacher-condition .en').remove()
      $('.container .teacher-condition .ma').remove()
      subjectTarget.append(
        `<img class="en" title="東方智英文" src="${rootPath}/img/東方智英文正常.png">`
      )
      subjectTarget.append(
        `<img class="ma" title="楊明山數學" src="${rootPath}/img/楊明山數學正常.png">`
      )
    }
    // nowSeconds >= date0323
    if (true) {
      $('.container .teacher-condition .pc').remove()
      $('.container .teacher-condition .so').remove()
      subjectTarget.append(
        `<img class="pc" title="紀揚理化" src="${rootPath}/img/紀揚理化正常.png">`
      )
      subjectTarget.append(
        `<img class="so" title="李天豪社會" src="${rootPath}/img/李天豪社會正常.png">`
      )
    }
  }

  let changeVideo = (youtubeUrlA, youtubeUrlB, youtubeUrlC, youtubeUrlD) => {
    leftSideImgTarget.on('click', event => {
      let thisBtn = $(event.currentTarget)
      let thisImgTitle = thisBtn.attr('title')

      leftSideImgTarget.css('opacity', '1')
      $('.youtube-video iframe').remove()

      if (thisImgTitle === '爆中考點') {
        $('.left-side .left1').css('opacity', '0.4')
        videoTarget.append(
          `<iframe width=${widthStyle} height=${heightStyle} src=${youtubeUrlA}></iframe>`
        )
      } else if (thisImgTitle === '進階B') {
        $('.left-side .left2').css('opacity', '0.4')
        videoTarget.append(
          `<iframe width=${widthStyle} height=${heightStyle} src=${youtubeUrlB}></iframe>`
        )
      } else if (thisImgTitle === '躍升A') {
        $('.left-side .left3').css('opacity', '0.4')
        videoTarget.append(
          `<iframe width=${widthStyle} height=${heightStyle} src=${youtubeUrlC}></iframe>`
        )
      } else if (thisImgTitle === '衝刺A') {
        $('.left-side .left4').css('opacity', '0.4')
        videoTarget.append(
          `<iframe width=${widthStyle} height=${heightStyle} src=${youtubeUrlD}></iframe>`
        )
      }
    })
  }
  normal()
  leftSideImgTarget.css('opacity', '0.4')
  console.log(rootPath)

  $('.teacher-condition img').on('click', event => {
    let thisBtn = $(event.currentTarget)
    let thisImgTitle = thisBtn.attr('title')
    let otherImgTitle = thisBtn.siblings('[data-clicked=true]').attr('title')
    let chA, chB, chC, chD,
      enA, enB, enC, enD,
      maA, maB, maC, maD,
      pcA, pcB, pcC, pcD,
      soA, soB, soC, soD

    leftSideImgTarget.css('opacity', '1')
    $('.left-side .left1').css('opacity', '0.4')
    $('.youtube-video iframe').remove()

    if (thisImgTitle === '敬請期待') {
      leftSideImgTarget.css('opacity', '0.4')
      thisBtn.siblings('[data-clicked=true]').attr('src', `${rootPath}/img/${otherImgTitle}正常.png`)
      return false
    } else if (thisImgTitle === '柳吟國文') {
      chA = 'https://www.youtube.com/embed/cFbgZS33w_A'
      chB = 'https://www.youtube.com/embed/7seqN-mlXrM'
      chC = 'https://www.youtube.com/embed/j5SaFJwGAGE'
      chD = 'https://www.youtube.com/embed/OL7t4_ZFLHU'

      videoTarget.append(
        `<iframe class="ch" width=${widthStyle} height=${heightStyle} src=${chA}></iframe>`
      )
      changeVideo(chA, chB, chC, chD)
    } else if (thisImgTitle === '東方智英文') {
      enA = 'https://www.youtube.com/embed/_kqZYBGiOc4'
      enB = 'https://www.youtube.com/embed/r0haWB1Uezk'
      enC = 'https://www.youtube.com/embed/rbhm6UFuGIM'
      enD = 'https://www.youtube.com/embed/3hzX-BWfark'

      videoTarget.append(
        `<iframe class="en" width=${widthStyle} height=${heightStyle} src=${enA}></iframe>`
      )
      changeVideo(enA, enB, enC, enD)
    } else if (thisImgTitle === '楊明山數學') {
      maA = 'https://www.youtube.com/embed/9m02FHN8c-k'
      maB = 'https://www.youtube.com/embed/SKoJRc_NlUw'
      maC = 'https://www.youtube.com/embed/8v_yDZ7E_PA'
      maD = 'https://www.youtube.com/embed/4KUkaMeg_aI'

      videoTarget.append(
        `<iframe class="ma" width=${widthStyle} height=${heightStyle} src=${maA}></iframe>`
      )
      changeVideo(maA, maB, maC, maD)
    } else if (thisImgTitle === '紀揚理化') {
      pcA = 'https://www.youtube.com/embed/ig8KSgTqnb8'
      pcB = 'https://www.youtube.com/embed/c_J08o4hJ88'
      pcC = 'https://www.youtube.com/embed/bEceCiqRJOk'
      pcD = 'https://www.youtube.com/embed/3FiH9K9F2U0'

      videoTarget.append(
        `<iframe class="pc" width=${widthStyle} height=${heightStyle} src=${pcA}></iframe>`
      )
      changeVideo(pcA, pcB, pcC, pcD)
    } else if (thisImgTitle === '李天豪社會') {
      soA = 'https://www.youtube.com/embed/VMujFZ2kuQk'
      soB = 'https://www.youtube.com/embed/wjsk1wHM1vg'
      soC = 'https://www.youtube.com/embed/aaCgzRFno1U'
      soD = 'https://www.youtube.com/embed/IPkwT6GADWQ'

      videoTarget.append(
        `<iframe class="so" width=${widthStyle} height=${heightStyle} src=${soA}></iframe>`
      )
      changeVideo(soA, soB, soC, soD)
    }

    thisBtn.attr('data-clicked', true)
    thisBtn.attr('src', `${rootPath}/img/${thisImgTitle}點選.png`)
    thisBtn.siblings('[data-clicked=true]').attr('src', `${rootPath}/img/${otherImgTitle}正常.png`)
    thisBtn.siblings('[data-clicked=true]').removeAttr('data-clicked')

    return false
  })
})
