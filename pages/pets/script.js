// burger menu
const burger = document.querySelector('.burger');
const body = document.querySelector('body');
const nav = document.querySelector('nav');
const mainLogo = document.querySelector('.main-logo');
const darken = document.querySelector('.darken');
const navLink = document.querySelectorAll('.nav-link')
let isActiveBurger = false;
burger.addEventListener('click', () => {
    if (!isActiveBurger) {
        burger.classList.add('burger-active')
        nav.classList.add('nav-active')
        body.classList.add('active')
        darken.classList.add('active')
        mainLogo.classList.add('inactive')
        isActiveBurger = true;
    } else {
        burger.classList.remove('burger-active');
        nav.classList.remove('nav-active');
        body.classList.remove('active');
        darken.classList.remove('active');
        mainLogo.classList.remove('inactive');
        isActiveBurger = false;
    }
})
navLink.forEach(n => {
    n.addEventListener('click', () => {
        navLink.forEach(n => n.classList.remove('active'))
        burger.classList.remove('burger-active');
        nav.classList.remove('nav-active');
        body.classList.remove('active');
        darken.classList.remove('active');
        mainLogo.classList.remove('inactive');
        n.classList.add('active')
        isActiveBurger = false;
    })
})

darken.addEventListener('click', () => {
    burger.classList.remove("burger-active");
    nav.classList.remove('nav-active');
    darken.classList.remove('active');
    body.classList.remove('active');
    mainLogo.classList.remove('inactive');
    isActiveBurger = false;

})



// pagination
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



let array = ['Katrine', "Jennifer", "Woody", "Scarlett", "Sophia", 'Timmy', 'Freddie', 'Charly'];
let petNames = []
for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 8; j++) {
        petNames.push(array[j])
    }
}

const shuffleArray = [];


function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

// shuffle elements in each page
function shufflePages(numberOfELements, numberOfPages) {
    for (let i = 0; i < numberOfPages; i++) {
        let sliced = petNames.splice(0, numberOfELements);
        shuffleArray.push(sliced);

    }
    shuffleArray.forEach(n => shuffle(n))
}


// choosing the right wifht of the screen
const carousel = document.querySelector('.carousel')
let numberOfPages;
let difference

if (carousel.clientWidth >= 1280) {
    shufflePages(8, 6);
    numberOfPages = 6;
    difference = 930


} else if (carousel.clientWidth <= 1279 && carousel.clientWidth >= 768) {
    shufflePages(6, 8);
    numberOfPages = 8;
    difference = 1365
} else {
    shufflePages(3, 16)
    numberOfPages = 16;
    difference = 1365

}

// construnctin card-container with cards inside
for (let i = 0; i < shuffleArray.length; i++) {
    const cards = document.createElement('div');
    cards.classList.add('pets-container')
    for (let j = 0; j < shuffleArray[0].length; j++) {
        const card = document.createElement('div');
        card.classList.add('pet')

        card.dataset.name = shuffleArray[i][j];
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
        cards.append(card)
    };
    carousel.append(cards)
}


// pagination
let currentPage = 1;
const page = document.querySelector('.page');
const firsPageBtn = document.querySelector('.first-page');
const lastPageBtn = document.querySelector('.last-page')
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.previous');
let carouselPositon = 0;

function checkPages() {
    if (currentPage == numberOfPages) {
        nextBtn.classList.remove('active');
        nextBtn.classList.add('disabled');
        lastPageBtn.classList.remove('active');
        lastPageBtn.classList.add('disabled');
        nextBtn.removeEventListener('click', addPage)

    } else if (currentPage == 1) {
        previousBtn.classList.remove('active');
        previousBtn.classList.add('disabled');
        firsPageBtn.classList.remove('active');
        firsPageBtn.classList.add('disabled');
        previousBtn.removeEventListener('click', substractPage)
    }
}

//incremanting number of pages
function addPage() {
    moveRight();
    currentPage++;
    if (previousBtn.classList.contains('disabled')) {
        previousBtn.classList.remove('disabled');
        previousBtn.classList.add('active');
        firsPageBtn.classList.remove('disabled');
        firsPageBtn.classList.add('active');
    }
    checkPages()
    previousBtn.addEventListener('click', substractPage)
    page.textContent = currentPage;
}
// substract page
function substractPage() {
    moveLeft();
    currentPage--;
    if (nextBtn.classList.contains('disabled')) {
        nextBtn.classList.remove('disabled');
        nextBtn.classList.add('active');
        lastPageBtn.classList.remove('disabled');
        lastPageBtn.classList.add('active');
    }
    checkPages();
    nextBtn.addEventListener('click', addPage)

    page.textContent = currentPage;
}
// to the first
function toFirst() {
    toTheFirstPage();
    currentPage = 1;
    if (nextBtn.classList.contains('disabled')) {
        nextBtn.classList.remove('disabled');
        nextBtn.classList.add('active');
        lastPageBtn.classList.remove('disabled');
        lastPageBtn.classList.add('active');
    }
    checkPages();
    previousBtn.removeEventListener('click', substractPage)
    nextBtn.addEventListener('click', addPage)




    page.textContent = currentPage;
}
// to the last 
function toLast() {
    toTheLastPage();
    currentPage = numberOfPages;
    if (previousBtn.classList.contains('disabled')) {
        previousBtn.classList.remove('disabled');
        previousBtn.classList.add('active');
        firsPageBtn.classList.remove('disabled');
        firsPageBtn.classList.add('active');
    }
    checkPages();
    nextBtn.removeEventListener('click', addPage)
    previousBtn.addEventListener('click', substractPage)

    page.textContent = currentPage;
}
// clicking forward
moveRight = () => {
        carouselPositon -= difference;
        carousel.style.top = `${carouselPositon}px`
    }
    // previous page
moveLeft = () => {
        carouselPositon += difference
        carousel.style.top = `${carouselPositon}px`
    }
    // returns to the first page
toTheFirstPage = () => {
        carouselPositon = 0;
        carousel.style.top = `${carouselPositon}px`
    }
    // returns to the last page
toTheLastPage = () => {
    carouselPositon = -(numberOfPages - 1) * difference;
    carousel.style.top = `${carouselPositon}px`
}



nextBtn.addEventListener('click', addPage)
previousBtn.addEventListener('click', substractPage)
firsPageBtn.addEventListener('click', toFirst)
lastPageBtn.addEventListener('click', toLast)


//  pop Up
// const cards = document.querySelector('.pets-container'); s
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay')
const modals = document.querySelectorAll('[data-modal]');
const modalImg = document.querySelector('.modal-img');

const containers = document.querySelectorAll('.pets-container')

containers.forEach(n => n.addEventListener('click', openModal))

function openModal(event) {
    let pet = event.target.closest('div')
    if (pet.classList.contains('pet')) {
        modals.forEach(el => {
            el.textContent = info[pet.dataset.name][el.dataset.modal]
        })
        modal.classList.add('active');
        overlay.classList.add('active');
        modalImg.src = info[pet.dataset.name]["img"];
        body.classList.add('active');
    }
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
}
const closeButton = document.querySelector('.close');
closeButton.addEventListener('click', close);
overlay.addEventListener('click', close);