define(['jquery', 'jqueryBlockUI'], ($, jqueryBlockUI) => {
  let s3Path = `https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/info-106fblive/img/`
  let youtubeUrl = `https://www.youtube.com/embed/`
  let subjectTarget = $('.container .teacher-condition')
  let leftSideImgTarget = $('.left-side img')
  let videoTarget = $('.youtube-video')
  let videoWid = '560'
  let videoHei = '345'
  let titleArray = ['柳吟國文', '東方智英文', '楊明山數學', '紀揚理化', '李天豪社會']
  let contentArray = ['爆中考點', '進階B', '躍升A', '衝刺A']
  let subArray = ['ch', 'en', 'ma', 'pc', 'so']
  let normal = () => {
    /* 判斷當前協議是http還是https */
    if (window.location.protocol !== 'https:') {
      window.location.href = 'https:' + window.location.href.substring(window.location.protocol.length)
    }

    $('.container .teacher-condition img').remove()
    for (let index = 0; index < titleArray.length; index++) {
      subjectTarget.append(
        `<img class=${subArray[index]} title=${titleArray[index]} src="${s3Path}${titleArray[index]}正常.png">`
      )
    }
  }

  let changeVideo = (youtubeUrlA, youtubeUrlB, youtubeUrlC, youtubeUrlD) => {
    leftSideImgTarget.on('click', event => {
      let thisBtn = $(event.currentTarget)
      let thisImgTitle = thisBtn.attr('title')
      let youtubeUri, number

      leftSideImgTarget.css('opacity', '1')
      $('.youtube-video iframe').remove()

      switch (thisImgTitle) {
        case contentArray[0]:
          number = 1
          youtubeUri = youtubeUrlA
          break
        case contentArray[1]:
          number = 2
          youtubeUri = youtubeUrlB
          break
        case contentArray[2]:
          number = 3
          youtubeUri = youtubeUrlC
          break
        case contentArray[3]:
          number = 4
          youtubeUri = youtubeUrlD
          break
        default:
          break
      }
      $(`.left-side .left${number}`).css('opacity', '0.4')
      videoTarget.append(`<iframe width=${videoWid} height=${videoHei} src=${youtubeUri}></iframe>`)
    })
  }

  let clickTeacherImg = () => {
    $('.teacher-condition img').on('click', event => {
      let thisBtn = $(event.currentTarget)
      let teacherImgTitle = thisBtn.attr('title')
      let otherImgTitle = thisBtn.siblings('[data-clicked=true]').attr('title')
      let chA, chB, chC, chD, enA, enB, enC, enD, maA, maB, maC, maD,
        pcA, pcB, pcC, pcD, soA, soB, soC, soD, subNum, sub

      leftSideImgTarget.css('opacity', '1')
      $('.left-side .left1').css('opacity', '0.4')
      $('.youtube-video iframe').remove()

      switch (teacherImgTitle) {
        case titleArray[0]:
          chA = `${youtubeUrl}-DRq12BK2eM`
          chB = `${youtubeUrl}sa5gf7fzNHg`
          chC = `${youtubeUrl}L1PT97XoeOg`
          chD = `${youtubeUrl}XDh-5Z-zVBY`
          subNum = chA
          sub = subArray[0]
          changeVideo(chA, chB, chC, chD)
          break
        case titleArray[1]:
          enA = `${youtubeUrl}SqkoYOueFsU`
          enB = `${youtubeUrl}7RtCbGPrGSA`
          enC = `${youtubeUrl}2BTlYPBZ8M8`
          enD = `${youtubeUrl}X5k5tkBwgCE`
          subNum = enA
          sub = subArray[1]
          changeVideo(enA, enB, enC, enD)
          break
        case titleArray[2]:
          maA = `${youtubeUrl}k7tf2CtMuc8`
          maB = `${youtubeUrl}qLjNp1AqTLU`
          maC = `${youtubeUrl}cPlqMux310k`
          maD = `${youtubeUrl}6X4zOFBLk-s`
          subNum = maA
          sub = subArray[2]
          changeVideo(maA, maB, maC, maD)
          break
        case titleArray[3]:
          pcA = `${youtubeUrl}r6IWQt_Nzm4`
          pcB = `${youtubeUrl}6NUJjWIFTFc`
          pcC = `${youtubeUrl}l9Y5YfK89x0`
          pcD = `${youtubeUrl}2rwrdu1e5vQ`
          subNum = pcA
          sub = subArray[3]
          changeVideo(pcA, pcB, pcC, pcD)
          break
        case titleArray[4]:
          soA = `${youtubeUrl}fWWITYky4j0`
          soB = `${youtubeUrl}BpEUEMq8IHc`
          soC = `${youtubeUrl}z7Ce90S8eyQ`
          soD = `${youtubeUrl}Go55OciG1Qc`
          subNum = soA
          sub = subArray[4]
          changeVideo(soA, soB, soC, soD)
          break
        default:
          break
      }
      videoTarget.append(`<iframe class=${sub} width=${videoWid} height=${videoHei} src=${subNum}></iframe>`)

      thisBtn.attr('data-clicked', true)
      thisBtn.attr('src', `${s3Path}${teacherImgTitle}點選.png`)
      thisBtn.siblings('[data-clicked=true]').attr('src', `${s3Path}${otherImgTitle}正常.png`)
      thisBtn.siblings('[data-clicked=true]').removeAttr('data-clicked')

      return false
    })
  }

  let blockFunc = info => {
    $.blockUI({
      message: `<img src='${s3Path}開通步驟編修檔.png'>`,
      css: {
        top: ($(window).height() - 600) / 2 + 'px',
        left: ($(window).width() - 500) / 2 + 'px',
        padding: '0px',
        width: '600',
        height: '600',
        cursor: 'default'
      },
      overlayCSS: {
        backgroundColor: '#000',
        opacity: '0.6'
      },
      onOverlayClick: $.unblockUI
    })
  }

  $(document).ready(() => {
    $('.teacher-condition .ch').trigger('click')
  })

  $('.share .fb-share').on('click', event => {
    window.open('https://www.facebook.com/ehanlin.com.tw/posts/1632313766827783', 'fb分享')
    return false
  })

  $('.fb .fb-search').on('click', event => {
    window.open('https://www.facebook.com/ehanlin.com.tw/', 'ehanlinFb')
    return false
  })

  $('.open .how-open').on('click', event => {
    blockFunc()
  })

  normal()
  leftSideImgTarget.css('opacity', '0.4')
  clickTeacherImg()
})
