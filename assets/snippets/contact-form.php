<?php
if ($_POST) {
	$name = $_POST['name'];
	$phone = $_POST['phone'];
	$email = $_POST['email'];
	$comment = $_POST['comment'];
	
	if (!$name || !$phone || !$email || ($name == '') || ($phone == '') || ($email == '') ) {	//check required fields
		$error = "<div class='message red'><strong>Please complete all the fields below. Your message has not been sent.</strong></div>";
		echo "$error\n";
	} 
	else {
		$email_message = "Form details below.\n\n";
	
	  function clean_string($string) {
	    $bad = array("content-type","bcc:","to:","cc:","href");
	    return str_replace($bad,"",$string);
	  }
	  $email_subject = "Website Contact Form";
	  $email_message .= "name: ".clean_string($name)."\n";
	  $email_message .= "phone: ".clean_string($phone)."\n";
	  $email_message .= "email: ".clean_string($email)."\n";
	  if ($comment && $comment != '') {
	  	$email_message .= "comments: ".clean_string($comment)."\n";
	  }
		     
		     
		// create email headers
		$headers = 'From: '.$email."\r\n".
		'Reply-To: '.$email."\r\n" .
		'X-Mailer: PHP/' . phpversion();
		@mail('david@wisz.com', $email_subject, $email_message, $headers); 
			echo "<br/><br/><div class='message'>Thank you! We've received your message and will respond soon.</div><br/><br/>\n";
			
		/* INSERT API CALLS TO TRIGGER MANDRILL EMAIL AND TWILIO SMS MESSAGE */
	}
	?>
	<script type="text/javascript">
		jQuery(document).ready(function() { 
			MicroModal.show('contact-modal');
		});
	</script>
	<?php
	
} 
if (!$_POST || ($_POST && $error)) {
  
  if (!$error) {
?>
		<p id="contact-header"><strong>Inquire about <span id="contact-form-header-dog-name"></span></strong></p>
<?php } ?>

		<form method="post" action="<?php echo $PHP_SELF?>" name="contactForm" style="text-align:left">
		
			<div class="form-row">
				<label for="name">name</label><br/>
				<input type="text" class="text-input" name="name" value="<?php echo $name ?>"/>
			</div>
			<div class="form-row">
				<label for="phone">phone</label><br/>
				<input type="text" class="text-input" name="phone" value="<?php echo $phone ?>"/>
			</div>
			<div class="form-row">
				<label for="email">email</label><br/>
				<input type="text" class="text-input" name="email" value="<?php echo $email ?>"/>
			</div>
			<div class="form-row">
				<label for="comment">comment</label><br/>
				<textarea class="text-input" name="comment" cols="45" rows="5"><?php echo $comment ?></textarea>
			</div>
			<div class="form-row">
				<input type="submit" name="submit" value="Send" class="cta"/>
			</div>
		</form>

<?php
}
?>