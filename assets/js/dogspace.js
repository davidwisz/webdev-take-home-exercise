/* CREATE NAMESPACE TO REDUCE NOISE IN THE GLOBAL SCOPE */
var DogSpace = DogSpace || {};

DogSpace.dogCounter = 0;
			
/* LINK ELEMENT UTILITY */
DogSpace.createLink = function(thisHref, thisText, thisClass, otherAttr) {
	var thisLink = document.createElement('a');
	thisLink.className = thisClass;
	thisLink.href = thisHref;
	thisLink.text = thisText;
	if (otherAttr != undefined) {
		thisLink.setAttribute(otherAttr[0],otherAttr[1])
	}
	return thisLink
}

/* OPEN CONTACT FORM MODAL */
DogSpace.launchContact = function(dogName, dogId) {
	document.getElementById('contact-form-header-dog-name').innerHTML = dogName;
	MicroModal.show('contact-modal');
	
}

/* OPEN INDIVIDUAL DOG PHOTO FULL SIZE */
DogSpace.fullsize = function(thisOne) {
	var theModal = document.getElementById('dog-modal-content');
	theModal.innerHTML = '';
	var modalDiv = document.createElement('div');
	var dogOutput = thisOne.cloneNode(true);
	var image = jQuery(dogOutput).find('img');
	var imageSrc = image.attr('src');
	imageSrc = imageSrc.replace('w=240&h=240&fit=crop&crop=entropy','w=480&h=auto&fit=crop');
	image.attr('src',imageSrc).css({'width':'480px', 'max-width':'100%'}).addClass('modal-size');
	var dogName = jQuery(dogOutput).find('.name').text();
	var viewLink = dogOutput.querySelector('.view-me-link');
	dogOutput.removeChild(viewLink);
	var cta = DogSpace.createLink('javascript:void(0)', 'Meet Me!', 'cta');
	dogOutput.append(cta);
	var shareContainer = document.createElement('span');
	shareContainer.className = 'article-footer-sharenow';
	var fbLink = DogSpace.createLink('javascript:void(0)', '', 'socialicons-facebook', ['target','_blank']);
	fbLink.setAttribute('rel','nofollow');
	var fbIcon = document.createElement('span');
	/* NEED TO ADD FONT-AWESOME ICON STYLE AND ADD REFERENCE TO THE FONT-AWESOME STYLESHEET */
	fbIcon.className = 'icon icon--facebook';
	shareContainer.append(fbLink);
	fbLink.append(fbIcon);
	dogOutput.append(shareContainer);
	theModal.appendChild(dogOutput);
	MicroModal.show('dog-modal');
	var thisDogModal = jQuery('#dog-modal');
	thisDogModal.find('.cta').on('click', function(){
		DogSpace.launchContact(dogName,dogOutput.id);
	});
	thisDogModal.find('.socialicons-facebook').on('click', function(){
		/* NEED FACEBOOK SCRIPT. NEED TO ADD ONLOAD FUNCTIONALITY TO CHECK FOR QUERY STRING AND LAUNCH FULLSIZE MODAL OF SPECIFIC DOG */
		/* essb_window('http://www.facebook.com/sharer/sharer.php?u=https://blog.asana.com/2018/10/bug-tracking-customer-feedback-templates/&amp;t=4 problems with bug tracking and customer feedback (and how to solve&nbsp;them)','facebook','635420585'); return false; */
	});
}
			
jQuery(document).ready(function(){

	var dogsLength = 0;
	
	/* DISPLAY DOGS ON THE PAGE IN GROUPS OF 10 */
	function displayDogs() { 
		window.removeEventListener('scroll', displayMoreDogs, false);
		jQuery('.spin-container').appendTo('#dogpile');
		jQuery.ajax({
			dataType: 'json',
			url: 'assets/data/dogs.json', 
			success: function( data ) {
				var dogs = data['dogs'];
				dogsLength = dogs.length;
				var loopCounter = 0;
				
				/* LOOP THROUGH THE NEXT 10 DOG OBJECTS IN THE JSON, STARTING FROM THE DOGCOUNTER NUMBER WHICH GETS INCREMENTED ON EACH LOOP */
				for (i=DogSpace.dogCounter; i<dogsLength; i++) {
  				
  				/* CREATE CONTAINER FOR INDIVIDUAL DOG DATA */
					var thisDog = document.createElement('ul');
					
					/* LOOP THROUGH THIS DOG'S PROPERTIES AND POPULATE THEM INTO li ELEMENTS */
					thisDog.id = dogs[i].id;
					thisDog.className = 'dog-module';
					var image = document.createElement('img');
					image.className = 'dog-image';
					jQuery.each( dogs[i], function( key, val ) {
						if (key != 'id') {
  						var thisProp = document.createElement('li');
  						if (key == 'image') {
  							image.src = 'https://asana.imgix.net/' + val + '?w=240&h=240&fit=crop&crop=entropy';
  							thisProp.appendChild(image);
  						}
  						else {
  							thisProp.className = key;
  							thisProp.appendChild(document.createTextNode(val));
  						}
  						thisDog.appendChild(thisProp);
						}
					});
					thisDog.appendChild(DogSpace.createLink('javascript:void(0)', 'view', 'view-me-link', ['data-dog-id', thisDog.id]));
					
					/* ADD THIS DOG TO THE MAIN CONTENT CONTAINER */
					jQuery('#dogpile').append(thisDog);
					jQuery('.spin-container').detach();
					
					/* INCREMENT THE DOG COUNTER */
					DogSpace.dogCounter++;
					
					/* INCREMENT THE LOOP COUNTER */
					loopCounter++;
					
					/* STOP IF LOOP HITS 10, ADD NUMBER TO LAST DOG'S CLASS NAME FOR IDENTIFICATION IN displayMoreDogs */
					if (loopCounter == 10) {
					thisDog.className = 'dog-module ' + DogSpace.dogCounter;
						break;
					}
				}
			},
			complete: function() {
				
				/* ASSIGN CLICK HANDLER TO LAUNCH FULL SIZE PHOTO */
				jQuery('.dog-module').click(function(){
					DogSpace.fullsize(this);
				});
				
				/* IF THERE ARE STILL MORE DOGS LEFT TO DISPLAY */
				if (DogSpace.dogCounter < dogsLength) {
					
					/* LARGER SCREENS CAN'T USE SCROLL AS THE TRIGGER TO LOAD THE NEXT 10 DOGS */
					if (screen.height > 1020 && jQuery(window).scrollTop() < 20) {
						displayDogs();
					}
					else {
						
						/* ASSIGN SCROLL EVENT HANDLER FOR displayMoreDogs */
						window.addEventListener('scroll', displayMoreDogs, false);
					}
				}
			}
		});
	};
	
	/* CHECK SCROLL POSITION OF PAGE - IF SCROLL POSITION HAS REACHED THE LAST DOG, CALL displayDogs AGAIN TO TRIGGER THE NEXT 10 DOGS */
	function displayMoreDogs() {
		
				/* FIND THE POSITION OF THE LAST DISPLAYED DOG */
    		var lastDog = jQuery('.dog-module.' + DogSpace.dogCounter);
    		var lastDogPosition = lastDog.offset();
    		
    		/* IF THE USER HAS SCROLLED DOWN TO THE LAST DOG'S POSITION, DISPLAY THE NEXT 10 DOGS */
      	if ((jQuery(window).scrollTop() + 50) >= (lastDogPosition.top - lastDog.height())) {
      		displayDogs();
      	}

	}
	
	/* ON PAGE LOAD, DISPLAY THE FIRST 10 DOGS */
	displayDogs();
	
	/* DISPLAY ISSUES IN IE */
	if (navigator.appName == 'Microsoft Internet Explorer') {
			jQuery('html').addClass('ie');
	}
});
