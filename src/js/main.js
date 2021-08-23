// Navigation
document.querySelector('.navbar-burger').addEventListener('click', toggleMenu);

function toggleMenu(){
    document.querySelector('.navbar-burger').classList.toggle('is-active');
    document.querySelector('.navbar-menu').classList.toggle('is-active');

    if (document.querySelector('.navbar-menu').classList.contains('is-active')){
        document.querySelector('.videos__overlay__wrapper').style.top = '176px';
    } else {
        document.querySelector('.videos__overlay__wrapper').style.top = '0px';
    }
}

// Video carousel
let videoTimer;
let currVidIndex = 1;
let videos = document.querySelectorAll('.videos__slider__video');
let videoWrappers = document.querySelectorAll('.videos__video__wrapper');
let viewWidth = document.querySelector('body').offsetWidth;
let slideWidth;
let minSlideLeft;
let maxSlideLeft;
let currentLeft;

if (viewWidth < 540) {
    slideWidth = viewWidth;
    firstSlideLeft = -viewWidth;
    minSlideLeft = -2 * viewWidth;
    maxSlideLeft = 4 * viewWidth;
    videoWrappers[0].style.left = 4 * viewWidth + 'px';
    videoWrappers[1].style.left = 0 + 'px';
    videoWrappers[2].style.left = viewWidth + 'px';
    videoWrappers[3].style.left = 2 * viewWidth + 'px';
    videoWrappers[4].style.left = 3 * viewWidth  + 'px';
} else if (viewWidth < 1025) {
    slideWidth = 530;
    firstSlideLeft = (-530 + ((viewWidth - 530) / 2));
    minSlideLeft = firstSlideLeft - 530;
    maxSlideLeft = ((viewWidth - 530) / 2  + 2120);
    videoWrappers[0].style.left = firstSlideLeft + 'px';
    videoWrappers[1].style.left = firstSlideLeft + 530 + 'px';
    videoWrappers[2].style.left = firstSlideLeft + 1060 + 'px';
    videoWrappers[3].style.left = firstSlideLeft + 1590 + 'px';
    videoWrappers[4].style.left = firstSlideLeft + 2120 + 'px';
} else {
    slideWidth = 900;
    firstSlideLeft = (-900 + ((viewWidth - 900) / 2));
    minSlideLeft = firstSlideLeft - 900;
    maxSlideLeft = ((viewWidth - 900) / 2  + 3600);
    videoWrappers[0].style.left = firstSlideLeft + 'px';
    videoWrappers[1].style.left = firstSlideLeft + 900 + 'px';
    videoWrappers[2].style.left = firstSlideLeft + 1800 + 'px';
    videoWrappers[3].style.left = firstSlideLeft + 2700 + 'px';
    videoWrappers[4].style.left = firstSlideLeft + 3600 + 'px';
}

let windowWrap = gsap.utils.wrap(-(firstSlideLeft + 5 * slideWidth), firstSlideLeft);

playVideo(currVidIndex);
videoTimer = setInterval(nextVideo, 6000);

function nextVideo(){
    playVideo(currVidIndex);
    videoWrappers[0].style.left = parseFloat(videoWrappers[0].style.left) - slideWidth + 'px';
    videoWrappers[1].style.left = parseFloat(videoWrappers[1].style.left) - slideWidth + 'px';
    videoWrappers[2].style.left = parseFloat(videoWrappers[2].style.left) - slideWidth + 'px';
    videoWrappers[3].style.left = parseFloat(videoWrappers[3].style.left) - slideWidth + 'px';
    videoWrappers[4].style.left = parseFloat(videoWrappers[4].style.left) - slideWidth + 'px';
    videoWrappers.forEach(wrapper => {
        if (parseFloat(wrapper.style.left) < minSlideLeft) {
            wrapper.style.opacity = '0';
            setTimeout(resetSlide, 1000, wrapper);
            setTimeout(fullOpacity, 5000, wrapper);
        }
    })
};

function fullOpacity(wrapper){
    wrapper.style.opacity = '1';
}
function resetSlide(wrapper){
    wrapper.style.left = maxSlideLeft - 2 * slideWidth + 'px';
}
function resetVideo(index){
    videos[index].pause();
    videos[index].currentTime = 0;
}

function playVideo(index){
    videos[index].play();
    setTimeout(resetVideo, 15000, currVidIndex);
    
    currVidIndex++;
    if(currVidIndex > 4){
        currVidIndex = 0;
    }
}

document.querySelector('.mute').addEventListener('click', volumeToggle);
document.querySelector('.mute').addEventListener('touchstart', volumeToggle);

function volumeToggle(evt){
    evt.preventDefault();

    videos.forEach(video => {
        if(video.muted == true){
            video.muted = false;
        } else {
            video.muted = true;
        }
    });

    document.querySelector('.mute').classList.toggle('fa-volume-up');
    document.querySelector('.mute').classList.toggle('fa-volume-mute');
}

window.addEventListener('resize', function(){
    document.location.reload();
});

// Slider - Razlozi za KlasikTV
let gap;
if (viewWidth < 540) {
    gap = .075;
} else if (viewWidth < 1025) {
    gap = .03;
} else {
    gap = .015;
}
let razloziTrake = document.querySelectorAll('.razlozi__slider__item');
let gapTrake = document.querySelector('.razlozi__slider__wrapper').offsetWidth * gap;
let slideWidthTrake = document.querySelector('.razlozi__slider__item').offsetWidth + gapTrake;
let i = 0;

if (viewWidth < 540) {
    gsap.set('.razlozi__slider__item', {
        x: (i) => i * slideWidthTrake
    });
} else if (viewWidth < 1025) {
    gsap.set('.razlozi__slider__item', {
        x: (i) => i * slideWidthTrake - gapTrake
    });
} else {
    gsap.set('.razlozi__slider__item', {
        x: (i) => i * slideWidthTrake
    });
}


function slideTraka(){
    gsap.to(".razlozi__slider__item", {
        duration: 1,
        ease: "none",
        x: () => "+=" + slideWidthTrake,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % (7 * slideWidthTrake) - slideWidthTrake)
        },
    });
    setTimeout(nextTraka, 1);
}

function nextTraka(){
    gsap.set('.razlozi__slider__item', {
        x: () => '+=' + slideWidthTrake
    });
}

slideTraka();
setInterval(slideTraka, 5000);

// Zasto volimo - photo carousel
let ellRX = .12 * viewWidth;
let ell2RX = 2 * ellRX;
let ellRY = .169 * viewWidth;
let photoPath = `M-${ellRX},0a${ellRX},${ellRY} 0 1,0 ${ell2RX},0a${ellRX},${ellRY} 0 1,0 -${ell2RX},0`

gsap.to(".zasto__photo--1", {
    motionPath: {
        path: photoPath,
        alignOrigin: [0.5, 0.5],
        autoRotate: false
    },
    duration: 20,
    repeat: -1,
    ease: "none"
});

gsap.from(".zasto__photo--1", {
    opacity: 0,
    duration: .5,
    ease: "none"
});

gsap.to(".zasto__photo--2", {
    motionPath: {
        path: photoPath,
        alignOrigin: [0.5, 0.5],
        autoRotate: false
    },
    delay: 4,
    duration: 20,
    repeat: -1,
    ease: "none"
});

gsap.from(".zasto__photo--2", {
    opacity: 0,
    delay: 4,
    duration: .5,
    ease: "none"
});

gsap.to(".zasto__photo--3", {
    motionPath: {
        path: photoPath,
        alignOrigin: [0.5, 0.5],
        autoRotate: false
    },
    delay: 8,
    duration: 20,
    repeat: -1,
    ease: "none"
});

gsap.from(".zasto__photo--3", {
    opacity: 0,
    delay: 8,
    duration: .5,
    ease: "none"
});

gsap.to(".zasto__photo--4", {
    motionPath: {
        path: photoPath,
        alignOrigin: [0.5, 0.5],
        autoRotate: false
    },
    delay: 12,
    duration: 20,
    repeat: -1,
    ease: "none"
});

gsap.from(".zasto__photo--4", {
    opacity: 0,
    delay: 12,
    duration: .5,
    ease: "none"
});

gsap.to(".zasto__photo--5", {
    motionPath: {
        path: photoPath,
        alignOrigin: [0.5, 0.5],
        autoRotate: false
    },
    delay: 16,
    duration: 20,
    repeat: -1,
    ease: "none"
});

gsap.from(".zasto__photo--5", {
    opacity: 0,
    delay: 16,
    duration: .5,
    ease: "none"
});

// Kokice
let kokicaAktivna = document.querySelector('.kokica__active');
let kokiceBox = document.querySelector('.kokica__container--1');
let tipKokice;
let launchSect;
let kokicaTargetX;
let kokicaTargetY;
let kokicaPath;
let brojKokica = 0;
let kokiceTimer;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function createKokica(){
    document.querySelectorAll('.kokica').forEach( kokica => {
        kokica.classList.remove('kokica__active');
    })
    tipKokice = getRandomInt(3);
    if( tipKokice == 1){
        kokiceBox.innerHTML += '<img src="./img/kokica1.png" class="kokica kokica__active">';
    } else if ( tipKokice == 2){
        kokiceBox.innerHTML += '<img src="./img/kokica2.png" class="kokica kokica__active">';
    } else {
        kokiceBox.innerHTML += '<img src="./img/kokica3.png" class="kokica kokica__active">';
    }
}

function createKokicaPathUp(){
    kokicaPath = "M 0 0 C 0 " + Math.round(-.4284 * kokicaTargetY) + " " + Math.round(.1667 * kokicaTargetX) + " " + Math.round(-.714 * kokicaTargetY) + " " + Math.round(.25 * kokicaTargetX) + " " + Math.round(-.7854 * kokicaTargetY) + " " + 
    "C" + " " + Math.round(.5 * kokicaTargetX) + " " + Math.round(-0.9996 * kokicaTargetY) + " " + Math.round(0.6667 * kokicaTargetX) + " " + Math.round(-0.714 * kokicaTargetY) + " " + Math.round(0.8333 * kokicaTargetX) + " " + Math.round(-0.4284 * kokicaTargetY) + " " + 
    "C" + " " + Math.round(0.8392 * kokicaTargetX) + " " + Math.round(-0.4877 * kokicaTargetY) + " " + Math.round(0.8485 * kokicaTargetX) + " " + Math.round(-0.571 * kokicaTargetY) + " " + Math.round(0.8822 * kokicaTargetX) + " " + Math.round(-0.5712 * kokicaTargetY) + " " + 
    "C" + " " + Math.round(0.9157 * kokicaTargetX) + " " + Math.round(-0.5706 * kokicaTargetY) + " " + Math.round(0.9292 * kokicaTargetX) + " " + Math.round(-0.4851 * kokicaTargetY) + " " + Math.round(0.9431 * kokicaTargetX) + " " + Math.round(-0.4284 * kokicaTargetY) + " " 
    "C" + " " + Math.round(0.9491 * kokicaTargetX) + " " + Math.round(-0.4585 * kokicaTargetY) + " " + Math.round(0.9532 * kokicaTargetX) + " " + Math.round(-0.4859 * kokicaTargetY) + " " + Math.round(0.9679 * kokicaTargetX) + " " + Math.round(-0.486 * kokicaTargetY) + " " 
    "C" + " " + Math.round(0.983 * kokicaTargetX) + " " + Math.round(-0.4863 * kokicaTargetY) + " " + Math.round(0.9909 * kokicaTargetX) + " " + Math.round(-0.4588 * kokicaTargetY) + " " + Math.round(kokicaTargetX) + " " + Math.round(-0.4284 * kokicaTargetY);
}

function createKokicaPathDown(){
    kokicaPath = "M 0 0 C 0 " + Math.round(-.071 * kokicaTargetY) + " " + Math.round(.083 * kokicaTargetX) + " " + Math.round(-.285 * kokicaTargetY) + " " + Math.round(.25 * kokicaTargetX) + " " + Math.round(-.285 * kokicaTargetY) + " " + 
    "C" + " " + Math.round(.416 * kokicaTargetX) + " " + Math.round(-.285 * kokicaTargetY) + " " + Math.round(.667 * kokicaTargetX) + " " + Math.round(.143 * kokicaTargetY) + " " + Math.round(.833 * kokicaTargetX) + " " + Math.round(kokicaTargetY) + " " + 
    "C" + " " + Math.round(.839 * kokicaTargetX) + " " + Math.round(.94 * kokicaTargetY) + " " + Math.round(.848 * kokicaTargetX) + " " + Math.round(.857 * kokicaTargetY) + " " + Math.round(.882 * kokicaTargetX) + " " + Math.round(.857 * kokicaTargetY) + " " + 
    "C" + " " + Math.round(.915 * kokicaTargetX) + " " + Math.round(.858 * kokicaTargetY) + " " + Math.round(.929 * kokicaTargetX) + " " + Math.round(.943 * kokicaTargetY) + " " + Math.round(.943 * kokicaTargetX) + " " + Math.round(kokicaTargetY) + " " 
    "C" + " " + Math.round(.949 * kokicaTargetX) + " " + Math.round(.97 * kokicaTargetY) + " " + Math.round(.953 * kokicaTargetX) + " " + Math.round(.942 * kokicaTargetY) + " " + Math.round(.953 * kokicaTargetX) + " " + Math.round(.942 * kokicaTargetY) + " " + Math.round(.968 * kokicaTargetX) + " " + Math.round(.942 * kokicaTargetY) + " " + 
    "C" + " " + Math.round(.983 * kokicaTargetX) + " " + Math.round(.942 * kokicaTargetY) + " " + Math.round(.99 * kokicaTargetX) + " " + Math.round(.969 * kokicaTargetY) + " " + Math.round(kokicaTargetX) + " " + Math.round(kokicaTargetY);
}

function launchKokica(){
    console.log('launch');
    launchSect = getRandomInt(4);
    if( launchSect == 1){
        kokicaTargetX = Math.random() * -.5 * viewWidth;
        kokicaTargetY = Math.random() * (.3 * viewWidth);
        createKokicaPathUp();
    } else if ( launchSect == 2){
        kokicaTargetX = Math.random() * viewWidth;
        kokicaTargetY = Math.random() * (.3 * viewWidth);
        createKokicaPathUp();
    } else if ( launchSect == 3){
        kokicaTargetX = Math.random() * -.5 * viewWidth;
        kokicaTargetY = Math.random() * (.3 * viewWidth);
        createKokicaPathDown();
    } else {
        kokicaTargetX = Math.random() * viewWidth;
        kokicaTargetY = Math.random() * (.3 * viewWidth);
        createKokicaPathDown();
    }
    
    gsap.set('.kokica__active', {
        x: 0,
        y: 0
    });
    gsap.to(".kokica__active", {
        motionPath: {
            path: kokicaPath,
            alignOrigin: [0.5, 0.5],
            autoRotate: false
        },
        rotation: Math.random() * 180,
        duration: .5,
        ease: "power4-in"
    });
}

function kokiceStartTimer(){
    kokiceTimer = setInterval(nextKokica, 1000);
}

function kokiceStopTimer(){
    window.clearInterval(kokiceTimer);
}

function nextKokica(){
    createKokica();
    launchKokica();
    brojKokica++;
    if(brojKokica > 100) {
        window.clearInterval(kokiceTimer);
    }
}

ScrollTrigger.create({
    trigger: ".kokica__container--1",
    onEnter: kokiceStartTimer,
    onLeave: kokiceStopTimer,
    onEnterBack: kokiceStartTimer,
    onLeaveBack: kokiceStopTimer
  });

// Kokice 2
let kokicaAktivna2 = document.querySelector('.kokica__active--2');
let kokiceBox2 = document.querySelector('.kokica__container--2');
let brojKokica2 = 0;
let kokiceTimer2;

function createKokica2(){
    document.querySelectorAll('.kokica2').forEach( kokica => {
        kokica.classList.remove('kokica__active--2');
    })
    tipKokice = getRandomInt(3);
    if( tipKokice == 1){
        kokiceBox2.innerHTML += '<img src="./img/kokica1.png" class="kokica2 kokica__active--2">';
    } else if ( tipKokice == 2){
        kokiceBox2.innerHTML += '<img src="./img/kokica2.png" class="kokica2 kokica__active--2">';
    } else {
        kokiceBox2.innerHTML += '<img src="./img/kokica3.png" class="kokica2 kokica__active--2">';
    }
}

function launchKokica2(){
    console.log('launch');
    launchSect = getRandomInt(4);
    if( launchSect == 1){
        kokicaTargetX = Math.random() * -.5 * viewWidth;
        kokicaTargetY = Math.random() * (.3 * viewWidth);
        createKokicaPathUp();
    } else if ( launchSect == 2){
        kokicaTargetX = Math.random() * viewWidth;
        kokicaTargetY = Math.random() * (.3 * viewWidth);
        createKokicaPathUp();
    } else if ( launchSect == 3){
        kokicaTargetX = Math.random() * -.5 * viewWidth;
        kokicaTargetY = Math.random() * (.3 * viewWidth);
        createKokicaPathDown();
    } else {
        kokicaTargetX = Math.random() * viewWidth;
        kokicaTargetY = Math.random() * (.3 * viewWidth);
        createKokicaPathDown();
    }
    
    gsap.set('.kokica__active--2', {
        x: 0,
        y: 0
    });
    gsap.to(".kokica__active--2", {
        motionPath: {
            path: kokicaPath,
            alignOrigin: [0.5, 0.5],
            autoRotate: false
        },
        rotation: Math.random() * 180,
        duration: .5,
        ease: "power4-in"
    });
}

function kokiceStartTimer2(){
    kokiceTimer2 = setInterval(nextKokica2, 1000);
}

function kokiceStopTimer2(){
    window.clearInterval(kokiceTimer2);
}

function nextKokica2(){
    createKokica2();
    launchKokica2();
    brojKokica2++;
    if(brojKokica2 > 100) {
        window.clearInterval(kokiceTimer2);
    }
}

ScrollTrigger.create({
    trigger: ".kokica__container--2",
    onEnter: kokiceStartTimer2,
    onLeave: kokiceStopTimer2,
    onEnterBack: kokiceStartTimer2,
    onLeaveBack: kokiceStopTimer2
});

// Film float
gsap.to('.filmska-traka__float', {
    y: .03 * viewWidth,
    duration: 3,
    repeat: -1,
    stagger: 1,
    ease: 'power2.inOut',
    yoyo: true
})

// Film wave
gsap.to('.filmska-traka__wave', {
    x: -.02 * viewWidth,
    duration: 5,
    repeat: -1,
    stagger: 1,
    ease: 'power2.inOut',
    yoyo: true
})