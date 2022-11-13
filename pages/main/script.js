/* ===== Menu active ===== */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
const body = document.querySelector('html');

for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        if (current.length > 0) {
            current[0].className = current[0].className.replace(" active", "");
        }
        this.className += " active";
    });
}

const mainNavLinks = document.querySelectorAll('.main-nav');

function activeMainMenu() {
    let len = sections.length;
    while (--len && window.scrollY < sections[len].offsetTop) {}
    mainNavLinks.forEach(el => el.classList.remove("active"));

    if (mainNavLinks[len] != undefined) {
        mainNavLinks[len].classList.add("active");
    }

};
window.addEventListener("scroll", activeMainMenu);



/* ===== Carousel ===== */

const carousel = document.querySelector('.carousel')


//  pop Up
const cards = document.querySelector('.pets-cont');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay')
const modals = document.querySelectorAll('[data-modal]');
const modalImg = document.querySelector('.modal-img');

carousel.addEventListener('click', openModal);

function openModal(event) {
    let pet = event.target.closest('.pet')

    modals.forEach(el => {
        el.textContent = info[pet.dataset.name][el.dataset.modal]
    })
    modal.classList.add('active');
    overlay.classList.add('active');
    modalImg.src = info[pet.dataset.name]["img"];
    body.classList.add('active');
    body.classList.add("stop-scroll");

}
overlay.addEventListener('mouseover', () => {
    closeButton.classList.add('hovered');
})
overlay.addEventListener('mouseleave', () => {
    closeButton.classList.remove('hovered');
})


function close() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    body.classList.remove('active');
    body.classList.remove("stop-scroll");
    menuIcon.classList.remove("active");
    menuDrawer.classList.remove("open");
    logo.classList.remove("display-none");
    body.classList.remove("stop-scroll");
    menuBackground.classList.remove("active");
    mainLogo.classList.remove("inactive");
}
const closeButton = document.querySelector('.close');
closeButton.addEventListener('click', close);
overlay.addEventListener('click', close);


// carousel

const btnLeft = document.querySelector('.previos');
const btnRight = document.querySelector('.next');
const itemLeft = document.querySelector('#item-left');
const itemRight = document.querySelector('#item-right');
const itemActive = document.querySelector('#item-active')



const createCard = (array) => {

    const card = document.createElement('div');
    card.classList.add('pet')
    card.dataset.name = array[Math.floor(Math.random() * array.length)];


    const image = document.createElement('img');
    image.classList.add('pet-img')
    image.src = info[card.dataset.name]['img']
    card.append(image);

    const name = document.createElement('p');
    name.classList.add('pet-name');
    name.textContent = card.dataset.name;
    card.append(name);

    const button = document.createElement('button');
    button.classList.add('learn-more')
    button.textContent = "Learn more"
    card.append(button);

    return card;
}

const moveLeft = () => {
    carousel.classList.add('transition-left')
}
const moveRight = () => {
    carousel.classList.add('transition-right');

}

btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight)


carousel.addEventListener('animationend', (animation) => {
    let changedItem;

    let petNames = ['Katrine', "Jennifer", "Woody", "Scarlett", "Sophia", 'Timmy', 'Freddie', 'Charly'];
    let numberOfCards = Math.floor(carousel.offsetWidth / 270);


    function deleteNames(item) {
        for (let i = 0; i < numberOfCards; i++) {
            petNames.splice(petNames.indexOf(item.children[i].dataset.name), 1);
        }
    }



    if (animation.animationName === 'move-left') {
        changedItem = itemLeft;
        itemRight.innerHTML = itemActive.innerHTML;
        document.querySelector('#item-active').innerHTML = itemLeft.innerHTML;
        deleteNames(itemLeft)


    } else {
        changedItem = itemRight;
        itemLeft.innerHTML = itemActive.innerHTML;
        document.querySelector('#item-active').innerHTML = itemRight.innerHTML;
        deleteNames(itemRight);
    }

    changedItem.innerHTML = "";





    for (let i = 0; i < numberOfCards; i++) {

        const card = createCard(petNames);
        petNames.splice(petNames.indexOf(card.dataset.name), 1)
        changedItem.append(card);

    }

    btnLeft.addEventListener("click", moveLeft);
    btnRight.addEventListener("click", moveRight);
    carousel.classList.remove('transition-left');
    carousel.classList.remove('transition-right')

})



/* ===== Burger Menu ===== */
var menuIcon = document.querySelector(".toggle-menu-icon");
var menuDrawer = document.querySelector(".menu-drawer");
var logo = document.querySelector(".logo-div");
var menuBackground = document.querySelector(".nav-background-overlay");
var mainLogo = document.querySelector(".main-logo")

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle("active");
    menuDrawer.classList.toggle("open");
    logo.classList.toggle("display-none");
    body.classList.toggle("stop-scroll");
    menuBackground.classList.toggle("active");
    mainLogo.classList.toggle("inactive");
});

var drawerLinks = document.querySelectorAll(".burger-nav");
drawerLinks.forEach(item => {
    item.addEventListener('click', () => {
        menuIcon.classList.toggle("active");
        menuDrawer.classList.toggle("open");
        body.classList.toggle("stop-scroll");
        menuBackground.classList.toggle("active");
        mainLogo.classList.toggle("inactive");
    })
});




const burgerNavLinks = document.querySelectorAll('.burger-nav');

function activeBurgerMenu() {
    let len = sections.length;
    while (--len && window.scrollY < sections[len].offsetTop) {}
    burgerNavLinks.forEach(el => el.classList.remove("active"));
    if (burgerNavLinks[len] != undefined) {
        burgerNavLinks[len].classList.add("active");
    }
};
window.addEventListener("scroll", activeBurgerMenu);

menuBackground.addEventListener('click', close);

window.onresize = () => {
    location.reload();
}