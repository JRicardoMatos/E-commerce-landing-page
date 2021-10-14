const hamburger = document.querySelector('.hamburger')
const closeLinks = document.querySelector('.close__links')
const modal = document.querySelector('.modal')
const navLinks = document.querySelector('.nav-links')

const carousel = document.querySelector('.carousel__imgs')
const carouselImg = document.querySelectorAll('.carousel__img')

const plus = document.querySelector('.plus')
const minus = document.querySelector('.minus')
const numberOfProducts = document.querySelector('.number__sneakers')
const numberCart = document.querySelector('.number__cart')
const totalOfProductsInCart = document.querySelector('.cart__value')
const btnAddProducts = document.querySelector('.add__cart')

const sneakerName = document.querySelector('.sneaker_name')
const sneakerPhoto = document.querySelector('.sneaker_photo')
const sneakerPrice = document.querySelector('.sneaker_price')


const cart = document.querySelector('.cart')
const cartDisplayContainer = document.querySelector('.cart__display')
const cartDisplayProducts = document.querySelector('.cart__display__products')
const checkoutBtn = document.querySelector('.checkout')


/* **** Build the Navbar **** */

hamburger.addEventListener('click', ()=>{
    navLinks.style.left = '0'
    modal.style.opacity = 0.6
})

closeLinks.addEventListener('click', ()=>{
    navLinks.style.left = '-250px'
    modal.style.opacity = 0
})


/* **** Build the Images Carousel **** */
var img_nr=1;
let img_next = (a) => {
    show__img(img_nr += a);
}

let show__img = (a) => {
    var i;
    if(a > carouselImg.length){
        img_nr = 1;
    }
    if(a < 1){
        img_nr = carouselImg.length;
    }
    for(i=0; i<carouselImg.length; i++){
        carouselImg[i].style.display="none";
    }
    carouselImg[img_nr - 1].style.display = "block";
}

show__img(img_nr);


/* **** Increment and decrement the number of sneakers and add to the cart **** */

let numberOfSneakersToAdd = 0
let totalSumOfProducts = 0
btnAddProducts.classList.add('disabled')

let productsInCart = []


let decrementProduct = ()=>{
    numberOfSneakersToAdd === 0 ? ()=>
    {
        numberOfSneakersToAdd = 0
    }
    : 
    numberOfSneakersToAdd--
    numberOfProducts.innerHTML = numberOfSneakersToAdd
    if(numberOfSneakersToAdd === 0) btnAddProducts.classList.add('disabled') 
}
let incrementProduct = ()=>{
    numberOfSneakersToAdd++
    btnAddProducts.classList.remove('disabled')
    numberOfProducts.innerHTML = numberOfSneakersToAdd
}


let sneakerNameCart = sneakerName
let addProductsToCart = () => {
    totalSumOfProducts += numberOfSneakersToAdd
    if(productsInCart.length === 0){
        productsInCart.push(
            product= {
                name: sneakerNameCart.textContent,
                photo:'image-product-1.jpg',
                price:sneakerPrice.textContent,
                quantity: totalSumOfProducts
            }
        ) 
    } else {
        productsInCart.forEach(item => item.quantity = totalSumOfProducts)
    }
    

    totalOfProductsInCart.innerHTML = productsInCart.length
    totalSumOfProducts === 0 ? numberCart.style.opacity = 0 : numberCart.style.opacity = 1
    numberOfSneakersToAdd = 0
    numberOfProducts.innerHTML = 0
    btnAddProducts.classList.add('disabled')
}
totalSumOfProducts === 0 ? btnAddProducts.classList.add('disabled') : btnAddProducts.classList.remove('disabled')

/* ****Build the cart popup **** */

let openCartContainer = ()=>{
    cartDisplayContainer.style.transform = 'scaleY(1)'
    if(totalSumOfProducts === 0){ 
        cartDisplayProducts.innerHTML = `<h5 class='empty__cart'> Your cart is empty </h5>`
        checkoutBtn.style.display = 'none'
    } else {
        cartDisplayProducts.innerHTML = productsInCart.map(item => 
            `
            <div class="products_in_cart">
                <div class="product">
                  <img class='product_img' src=./${item.photo} alt="Product Photo">
                  <div class="product_info">
                    <h5>${item.name}</h5>
                    <p>$${item.price} x ${item.quantity} <span>$${item.price * item.quantity}.00</span></p>
                  </div>
                  <img onClick=removeProduct() class='remove_product' src="./icon-delete.svg" alt="Remove Product">
                </div>
            </div>
          `
        )
        const removeProduct = document.querySelector('.remove_product')
        checkoutBtn.style.display = 'block'
    }
}

let removeProduct = ()=>{
    productsInCart.splice(product)
    if(productsInCart.length === 0){
        cartDisplayProducts.innerHTML = `<h5 class='empty__cart'> Your cart is empty </h5>`
        checkoutBtn.style.display = 'none'
        numberCart.style.opacity = 0
    }
    totalSumOfProducts = 0
    totalOfProductsInCart.innerHTML = productsInCart.length
    console.log('Splice!!')
}

/* **** Make clicking on the body close the popups */
document.addEventListener('mouseup', (event) => {
    if (cartDisplayContainer.style.transform = 'scaleY(1)') {
        if(!cartDisplayContainer.contains(event.target))
            cartDisplayContainer.style.transform = 'scaleY(0)'
    }
})

document.addEventListener('mouseup', (event) => {
    if (modal.style.opacity = 0.6) {
        if(!modal.contains(event.target))
            navLinks.style.left = '-250px'
            modal.style.opacity = 0
            carousel.style.overflow = 'hidden'
            carousel.classList.remove('modalPopUp')
            carousel.style.width = '100%'

    }
})

const galleryOptions = document.querySelectorAll('.desktop__gallery__options')

for(let i=0; i<galleryOptions.length ; i++){
    galleryOptions[0].classList.add('optionActive')
}

/* ****Create the desktop gallery**** */
let desktopGallery = (imgs)=>{
    sneakerPhoto.src = imgs.src
    sneakerPhoto.style.display = "block"
    galleryOptions.forEach(photo => {
        if(photo.src === imgs.src){
            photo.classList.add('optionActive')
            console.log(photo.src)
        }  else {
            photo.classList.remove('optionActive')
        }
    })
}

/* **** Create the modal for the pics **** */

let modalPopUp = ()=>{
    modal.style.opacity = 0.6
    carousel.classList.add('modalPopUp')
    carousel.style.width = '50vw'
    carousel.style.overflow = 'visible'
    carousel.style.borderRadius = '30px'
}


