'use strict'
let sliderBlock;
let sliderWrapper;
let slides;
let slide;
let dots;
let firstSlide;
let lastSlide;
let progress = 0;
let globalWidth = 0;
let coordinate = 0;



const initialisation = (e) => {
  sliderBlock = document.querySelector('.slider')
  sliderWrapper = document.querySelector('.slider-wrapper')
  slides = document.querySelectorAll('.slide');
  slide = document.querySelector('.slide');
  firstSlide = slides[0];
  lastSlide = slides[slides.length - 1]
  coordinate = slide.offsetWidth;
  if (e) {
    firstSlide.classList.add('prev')
    firstSlide.nextElementSibling.classList.add('current')
    firstSlide.nextElementSibling.nextElementSibling.classList.add('next')
    slides.forEach((e) => {
      globalWidth += e.offsetWidth
      sliderBlock.style.width = e.offsetWidth + "px";
    })
    sliderWrapper.style.width = globalWidth + "px";
    sliderWrapper.style.transform = 'translateX(-' + slide.offsetWidth + 'px)'
  }
}
const createClone = () => {
  const prevClone = lastSlide.cloneNode(true);
  const nextClone = firstSlide.cloneNode(true);
  prevClone.classList.add('clone__last')
  nextClone.classList.add('clone__first')
  sliderWrapper.insertBefore(prevClone, firstSlide);
  sliderWrapper.appendChild(nextClone)
}
const createDots = () => {
  const dotsBlock = document.querySelector('.slider-dots')
  const createDots = slides.forEach(() => {
    const li = document.createElement('li')
    li.classList.add('dot');
    dotsBlock.append(li)

    dots = document.querySelectorAll('.dot')
    dots[0].classList.add('dot-active');
  })
}
const animateDots = () => {
  deleteLastActiveDots()
  const activeSlide = document.querySelector('.current')
  dots[[...activeSlide.parentNode.children].indexOf(activeSlide) - 1].classList.add('dot-active');
}
const deleteLastActiveDots = () => {
  document.querySelector('.dot-active').classList.remove('dot-active')
}
const animate = ({
  render,
  duration
}) => {
  const anim =  () => {
    const u = 1/duration
    const animSlide = () => {
      if (progress === 0) {
        render(progress += u)
       } else if (progress > 0) {
         if (progress >= 1) {
           clearInterval(timer1)
           progress = 0
           return 
         }
         render(progress += u)
       } 
    }
    let timer1 = setInterval(animSlide, u)
  }
  anim()
}
const modalAnimate = (e, b) => {
  const slideCurrent = document.querySelector('.current')
  const slideNext = document.querySelector('.next')
  const slidePrev = document.querySelector('.prev')
  const button = document.querySelector('.active')


  animate({
    duration: 100,
    render(progress) {
      if (!b) {
        if (button.className === 'slider-button-next active') {
          sliderWrapper.style.transform = 'translateX(-' + (coordinate + (progress * slide.offsetWidth)) + 'px)'
          if (progress < 1) {
            return
          } 
          else if (slideNext.nextElementSibling === null) {
            sliderWrapper.style.transform = 'translateX(-' + slide.offsetWidth + 'px)'
            slideCurrent.parentNode.children[0].classList.add('prev')
            slideCurrent.parentNode.children[1].classList.add('current')
            slideCurrent.parentNode.children[2].classList.add('next')
            slidePrev.classList.remove('prev')
            slideCurrent.classList.remove('current')
            slideNext.classList.remove('next')
            button.classList.remove('active')
            coordinate = slide.offsetWidth
            animateDots()
          } else if (progress >= 1) {
            slideCurrent.classList.remove('current')
            slideCurrent.classList.add('prev')
            slideCurrent.style = ' '
            slideNext.classList.remove('next')
            slideNext.nextElementSibling.classList.add('next')
            slideNext.classList.add('current')
            slideNext.style = ' '
            slidePrev.classList.remove('prev')
            slidePrev.style = ' '
            button.classList.remove('active')
            coordinate += slide.offsetWidth
            animateDots()
          }
        } else if (button.className === 'slider-button-prev active') {
          sliderWrapper.style.transform = 'translateX(-' + (coordinate - (progress * slide.offsetWidth)) + 'px)'
          if (progress < 1) {
            return
          } else if (slidePrev.previousElementSibling === null) {

            sliderWrapper.style.transform = 'translateX(-' + (globalWidth - (2 * slide.offsetWidth)) + 'px)'
            slideCurrent.parentNode.children[slideCurrent.parentNode.children.length - 3].classList.add('prev')
            slideCurrent.parentNode.children[slideCurrent.parentNode.children.length - 2].classList.add('current')
            slideCurrent.parentNode.children[slideCurrent.parentNode.children.length - 1].classList.add('next')
            slideCurrent.classList.remove('current')
            slidePrev.classList.remove('prev')
            slideNext.classList.remove('next')
            button.classList.remove('active')
            animateDots()
            coordinate = (globalWidth - (2 * slide.offsetWidth))
          } else if (progress >= 1) {
            slideCurrent.classList.remove('current')
            slideCurrent.classList.add('next')
            slideNext.classList.remove('next')
            slidePrev.previousElementSibling.classList.add('prev')
            slidePrev.classList.remove('prev')
            slidePrev.classList.add('current')
            slideNext.style = ' '
            slidePrev.style = ' '
            slideCurrent.style = ' '
            button.classList.remove('active')
            coordinate -= slide.offsetWidth
            animateDots()
          }
        }
      } else if (b) {
        deleteLastActiveDots()
        e.classList.add('dot-active')
        let k = [...e.parentNode.children].indexOf(e) + 1;
        const initialisationSlides = () => {
          slideCurrent.parentNode.children[k - 1].classList.add('prev')
          slideCurrent.parentNode.children[k].classList.add('current')
          slideCurrent.parentNode.children[k + 1].classList.add('next')
          slideCurrent.classList.remove('current')
          slidePrev.classList.remove('prev')
          slideNext.classList.remove('next')
        }
        if ((k * slide.offsetWidth) > coordinate) {
          sliderWrapper.style.transform = 'translateX(-' + (coordinate + (progress * ((k * slide.offsetWidth) - coordinate))) + 'px)'
          initialisationSlides()
          coordinate = (coordinate + (progress * ((k * slide.offsetWidth) - coordinate)))

        } else if ((k * slide.offsetWidth) < coordinate) {
          sliderWrapper.style.transform = 'translateX(-' + (coordinate - (progress * (coordinate - (k * slide.offsetWidth)))) + 'px)'
          initialisationSlides()
          coordinate = (coordinate - (progress * (coordinate - (k * slide.offsetWidth))))

        }
      }

    }

  });

}

initialisation()
createDots()
createClone()
initialisation(true)

sliderBlock.addEventListener('click', (e) => {
  const next = e.target.closest('.slider-button-next')
  const prev = e.target.closest('.slider-button-prev')

  if (next) {
    if (next.className === 'slider-button-next active') {
      return;
    } else if (next.className === 'slider-button-next') {
      next.classList.add('active')
      modalAnimate()
    }


  } else if (prev) {
    if (prev.className === 'slider-button-prev active') {
      return
    } else if (prev.className === 'slider-button-prev') {
      prev.classList.add('active')
      modalAnimate()
    }


  } else if (e.target.classList.contains('dot') && !e.target.classList.contains('lock')) {
    dots.forEach((dot) => {

      if (e.target === dot) {
        modalAnimate(dot, true)

      }
    })

  }
})