'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

for (let i = 0; i < btnsOpenModal.length; i++) btnsOpenModal[i];

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);
const header = document.querySelector('.header');

// document.getElementsByTagName('Button');

// create element :

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'we use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it </button>"';

header.append(message);

// header.before(message); as sibling

// delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

// styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// console.log(getComputedStyle(message));
//
// message.style.height= Number.parseFloat(getComputedStyle(message).height,10)+50 +"px";

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
// console.log(getComputedStyle(message).height);

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// attributes--------------
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);

// logo.setAttribute('designer', 'cherif');
// non-standard you created this attribute "designer"-------------------
// console.log(logo.getAttribute('designer'));

// data attribute -------------
// console.log(logo.CDATA_SECTION_NODE.versionNumber);

// clases-----------------
// logo.classList.add('')
// logo.classList.remove('')
// logo.classList.toggle('')
// logo.classList.contains
const btnLearn = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnLearn.addEventListener('click', function (e) {
  e.preventDefault();
  const slcoords = section1.getBoundingClientRect();
  console.log(slcoords);

  // console.log('current scroll (x/y)', window.pageXOffset, window.pageYOffset);

  // console.log(('heit/width viewport ',document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // ));
  // scrolling old school -----------------
  // window.scrollTo(
  //   {left: slcoords.left+window.pageXOffset,
  //    top: slcoords.top+window.pageYOffset,
  //   behavior:'smooth'}
  // );
  // modern way >>>>>>>>>>>>>
  section1.scrollIntoView({ behavior: 'smooth' });
});

// page navigation ---------------------------
// //////////////////////////////////////
// document.querySelectorAll('.nav__link').forEach((el)=>{
//   el.addEventListener('click',function(e){e.preventDefault();
//   document.querySelector(el.getAttribute('href'))
//     .scrollIntoView({behavior:'smooth'});

//   })
// })
// event delegation --------------------------
document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target);
  // matching strategy
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    document
      .querySelector(e.target.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  }
});

const h1 = document.querySelector('h1');

// going downwards: child

// tabbed
const tabs = document.querySelectorAll('.operations__tab');
const tabscontainer = document.querySelector('.operations__tab-container');
const tabscontent = document.querySelectorAll('.operations__content');
console.log(tabscontent);
tabscontainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  console.log(clicked);
  document
    .querySelector('.operations__tab--active')
    .classList.remove('operations__tab--active');
  clicked.classList.add('operations__tab--active');
  // activate content
  document
    .querySelector('.operations__content--active')
    .classList.remove('operations__content--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// menu fade
const nav = document.querySelector('.nav');
const handl = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    nav.querySelector('img').style.opacity = opacity;
    nav.querySelectorAll('.nav__link').forEach(el => {
      if (el != e.target) {
        el.style.opacity = opacity;
      }
    });
  }
};
nav.addEventListener('mouseover', function (e) {
  handl(e, '50%');
});
nav.addEventListener('mouseout', function (e) {
  handl(e, '100%');
});
// STICKY navigation
// window.addEventListener('scroll',function(e){
//   if(window.scrollY>section1.getBoundingClientRect().top)nav.classList.add('sticky')
// })
// sticky navigation : intersection observer API---------------
const stick = function (entries) {
  entries.forEach(enty => {
    console.log(enty);
    if (!enty.isIntersecting) {
      nav.classList.add('sticky');
    } else nav.classList.remove('sticky');
  });
};
const observer = new IntersectionObserver(stick, {
  root: null,
  threshold: 0.2,
  rootMargin: '-90px',
  // ninty is hardcoded
});
observer.observe(header);
const sections = document.querySelectorAll('.section');
sections.forEach(section => {
  const show = function (entries, observer) {
    console.log('this is entries');
    console.log(entries);
    entries.forEach(enty => {
      console.log(enty);
      if (enty.isIntersecting) {
        section.classList.remove('section--hidden');
        observer1.unobserve(section);
      }
    });
  };
  const observer1 = new IntersectionObserver(show, {
    root: null,
    threshold: 0.15,
  });
  observer1.observe(section);
});

const imgs = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.classList.remove('lazy-img');
  entry.target.addEventListener('load', function () {});
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
});
imgs.forEach(img => imgObserver.observe(img));

// slider

const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnl = document.querySelector('.slider__btn--left');
const btnr = document.querySelector('.slider__btn--right');

slider.style.overflow = 'visible';

slides.forEach(function (s, i) {
  s.style.transform = `translateX(${i * 100}%)`;
});
let curslide = 0;
const nextslide = function () {
  if (curslide === 2) {
    curslide = 0;
  } else {
    curslide++;
  }
  slides.forEach(function (s, i) {
    s.style.transform = `translateX(${(i - curslide) * 100}%)`;
  });
};
btnr.addEventListener('click', nextslide());
const prevslide = function () {
  if (curslide === 0) {
    curslide = 2;
  } else {
    curslide--;
  }
  slides.forEach(function (s, i) {
    s.style.transform = `translateX(${(i - curslide) * 100}%)`;
  });
};
btnl.addEventListener('click', prevslide());
//0 100 200   -100 0 100   -200 -100 0
//   0             1
document.addEventListener('keydown', function (e) {
  console.log(e);
  if (e.key === 'ArrowRight') nextslide();
  if (e.key === 'ArrowLeft') prevslide();
});
const dotcontainer = document.querySelector('.dots');
const createDots = function () {
  slides.forEach(function (s, i) {
    dotcontainer.insertAdjacentHTML(
      'beforeend',
      `<button class ="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();
const active = function (slide) {
  document.querySelector('.dots__dot--active')?.classList.remove('dots__dot--active');
  
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};
dotcontainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    slides.forEach(function (s, i) {
      s.style.transform = `translateX(${(i - slide) * 100}%)`;
    });
    active(slide);
  }
});

// ------------------------------------------------------
// h1.addEventListener('mouseenter', function(e){
//   alert('ure reading the heading  suiiiii');
// });
// h1.onmouseenter= function(e){
//   alert('ure reading the heading  suiiiii');
// };

// bubbling and capturing   all clear
// const randomint= (min,max)=>Math.trunc(Math.random()*(max-min+1)+min);
// const randomColor=()=>`rgb(${randomint(0,255)},${randomint(0,255)},${randomint(0,255)})`;

// document.querySelector('.nav__link').addEventListener('click', function(e ) {

//   console.log('link',e.target,e.currentTarget);
//   this.style.backgroundColor=randomColor();

//   // stope probagation
//   // e.stopImmediatePropagation();
// } );
// document.querySelector('.nav__links').addEventListener('click', function(e ) {
//   console.log('link',e.target,e.currentTarget);
//   this.style.backgroundColor=randomColor();

// });
// document.querySelector('.nav').addEventListener('click', function(e ) {
//   console.log('link',e.target,e.currentTarget);
//   this.style.backgroundColor=randomColor();

// });
 document.addEventListener('DOMContentLoaded',function() {
     
 }   ) 

