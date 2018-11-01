<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Asana Dog Adoption in San Francisco</title> <?php /* SEO PAGE TITLE */ ?>
		<meta name="description" content="Bring the love of a dog into your life. Adopt a lovable dog in San Francisco - check out our dog photos, choose your new best friend! Provide a loving home for a dog in need." />
		<meta name="keywords" content="asana, san francisco dog adoption, dog photos" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta property="og:title" content="Dog Adoption in San Francisco"/>
		<meta property="og:description" content="Browse adorable dog photos and fall in love."/>
		<meta property="og:type" content="" />
		<meta property="og:image" content="https://asana.imgix.net/10.jpeg?w=480&h=auto&fit=crop" />
		<meta property="og:url" content="http://wisz.com/webdev-take-home-exercise/"/>
		
		<link type="text/css" rel="stylesheet" href="http://fonts.googleapis.com/css?family=Montserrat:400,700" />
		<link type="text/css" rel="stylesheet" media="screen" href="/webdev-take-home-exercise/assets/css/app.css" />
		
		<!--[if lt IE 10]>
			<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->
		<script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
		<link type="image/png" rel="favicon" sizes="16x16" href="https://d1gwm4cf8hecp4.cloudfront.net/images/favicons/favicon-16x16.png">
	</head>
	<body>
		
		<?php include 'assets/snippets/header.php'; /* GLOBAL HEADER */ ?>
		
		<div class="content main">
			<p class="white intro">If you are looking to adopt a dog in San Francisco, you have come to the right place! Please browse our dog photos below, and click the button to get in touch with us for next steps on adopting your next best friend.</p>
			<div id="dogpile" class="dogpile"> <?php /* CONTAINER FOR ALL DOG CONTENT */ ?>
				<div class="spin-container"><div class="spinner"></div></div>
			</div>
		</div>
		
		<?php include 'assets/snippets/footer.php'; /* GLOBAL FOOTER */ ?>
		
		<!-- DOG MODAL FOR DISPLAYING FULL SIZE PHOTO -->
		<div class="modal micromodal-slide" id="dog-modal" aria-hidden="true">
	    <div class="modal__overlay" tabindex="-1" data-micromodal-close>
	      <div id="bigdog" class="modal__container" role="dialog" aria-modal="true" aria-labelledby="dog-modal-title">
	        <header class="modal__header">
	          <button class="modal__close" aria-label="Close modal" data-micromodal-close></button>
	        </header>
	        <main class="modal__content" id="dog-modal-content">
	        </main>
	      </div>
	    </div>
	  </div>
	  
	  <?php /* CONTACT MODAL */ ?>
	  <div class="modal micromodal-slide" id="contact-modal" aria-hidden="true">
	    <div class="modal__overlay" tabindex="-1" data-micromodal-close>
	      <div id="bigdog" class="modal__container" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
	        <header class="modal__header">
	          <button class="modal__close" aria-label="Close modal" data-micromodal-close></button>
	        </header>
	        <main class="modal__content" id="contact-modal-content">
		        
	        	<?php include 'assets/snippets/contact-form.php'; /* CONTACT FORM */ ?>
	        	
	        	<br class="clear"/>
					</main>
	      </div>
	    </div>
	  </div>
	  
	  <?php /* MAIN SCRIPT TO GET AND DISPLAY DOG DATA */ ?>
	  <script type="text/javascript" src='assets/js/dogspace.js'></script>
	  
	  <?php /* MODAL LIBRARY */ ?>
	  <script type="text/javascript" src="/webdev-take-home-exercise/assets/js/micromodal.min.js"></script>

	</body>
</html>
