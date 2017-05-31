/*BIG SLIDER*/
var slider = document.querySelector('.slider');
var slidesWrapper = document.querySelector('.slides');

var slides = document.getElementsByClassName('slide');
var slidesCount = slides.length;

var slideWidth = slider.clientWidth;

[].forEach.call(slides, function(slide){
	slide.style.width = slideWidth + 'px';
});

slidesWrapper.style.width = (slidesCount * slideWidth) + 'px';

var currentImg = 0;

var controlsParent = document.querySelector('.controls');
var controls =[];
for (var i = 0; i < slidesCount; i++) {
	var control = document.createElement('span');
	control.onclick = slideTo;
	control.className = 'slide-' + i;
	controlsParent.appendChild(control);
	controls.push(control);
}
controls[currentImg].classList.add('is-active');

function slideLeft() {
	controls[currentImg].classList.remove('is-active');
	if (currentImg == 0) {
		currentImg = slidesCount-1;
	} else {
		currentImg--;
	}
	controls[currentImg].classList.add('is-active');
	slidesWrapper.style.marginLeft = -(currentImg * slideWidth) + 'px';
}

function slideRight() {
	controls[currentImg].classList.remove('is-active');
	if (currentImg == (slidesCount-1)) {
		currentImg = 0;
		} else {
	currentImg++;
	}
	controls[currentImg].classList.add('is-active');
	slidesWrapper.style.marginLeft = -(currentImg * slideWidth) + 'px';
}

function slideTo(){

	var slideNumTo = this.classList[0].split('-')[1];
	var margin = slideWidth * slideNumTo;

	controls[currentImg].classList.remove('is-active');
	currentImg = slideNumTo;
	controls[currentImg].classList.add('is-active');

	slidesWrapper.style.marginLeft = -margin + 'px';

}

var interval = setInterval(slideRight, 3000);

slider.onmouseover = function() {
	clearInterval(interval);
}

slider.onmouseout = function(){
	interval = setInterval(slideRight, 3000);
};

/*CAROUSEL*/
var width = 78; //picture width
var count = 1; //number of pictures

var carousel = document.getElementById('carousel');
var list = carousel.querySelector('ul');
var listElems = carousel.querySelectorAll('li');

var position = 0; //current shift to the 'left'

carousel.querySelector('.prev').onclick = function() {
	position = Math.min(position+width*count, 0)
	list.style.marginLeft = position + 'px';
};

carousel.querySelector('.next').onclick = function() {
	position = Math.max(position-width*count, -width*(listElems.length-count));
	list.style.marginLeft = position + 'px';
};


/*TABS SWITCHER*/
$('.tab-head a').click(function(e){
	e.preventDefault();
	var link = $(this).attr('href');

	$('.tab-head').removeClass('active');
	$(this).parent().addClass('active');

	$('.tabs-content').removeClass('active');
	$(link).addClass('active');
});