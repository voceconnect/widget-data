jQuery( function($) {
	
	$('#notifier').hide();

	$('#SelectAllActive').click(function(){
		$('.active').each(function(){
			$(this).attr( 'checked', true )
		});
	});

	$('#UnSelectAllActive').click(function(){
		$('.active').each(function(){
			$(this).attr( 'checked', false )
		});
	});
	
	$('form#widget-export-settings').submit(function() {
		$('form#widget-export-settings').fadeOut('slow');
		window.setTimeout(redirect_to_widgets, 4000)
		message = 'All of the requested widgets have been exported.';
		show_notification(message, 'success');
	});
	
	
	$('form#import-widget-data').submit(function(event){
		event.preventDefault();
		
		var message;
		var new_class;
		
		$.post(ajaxurl, $("#import-widget-data").serialize(),
		function(data){
			if(data == "SUCCESS") {
				message = 'All widgets with registered sidebars have been imported successfully.';
				new_class = 'success';
				$('.import-wrapper').fadeOut('slow');
				window.setTimeout(redirect_to_widgets, 4000)
			} else {
				message = 'There was a problem importing your widgets.  Please try again.';
				new_class = 'error';
			}
			show_notification(message, new_class);
		});

	});

	$('#export-widgets').click(function(){
		if ($(':checked').length == 0) {
			$('.widget-selection-error').fadeIn('slow').delay(2000).fadeOut('slow');
			return false;
		}

		return true;
	});

	$('#import-widgets').click(function(){
		if ($(':checked').length == 0) {
			$('.widget-selection-error').fadeIn('slow').delay(2000).fadeOut('slow');
			return false;
		}

		return true;
	});
	
	var wrapper = $('<div/>').css({height:0,width:0,'overflow':'hidden'});
	var fileInput = $('#upload-file').wrap(wrapper);

	fileInput.change(function(){
		$this = $(this);
		sub = $this.val().lastIndexOf('\\') + 1;
		new_string = $this.val().substring(sub);
		$('#output-text').text(new_string);
		$('#output-text').fadeIn('slow');
	})

	$('#upload-button').click(function(){
		fileInput.click();
	}).show();

	function show_notification(message, class_name){
		if(class_name == '') class_name = 'success';
		$('#notifier').html('<div id="notifier"><p>'+message+'</p></div>');
		$('#notifier').addClass(class_name);
		$('#notifier').fadeIn('slow');
		jQuery('body,html').animate({ scrollTop: 0}, 800);
	}

	
	function redirect_to_widgets() {
		window.location.replace("/wp-admin/widgets.php");
	}

});