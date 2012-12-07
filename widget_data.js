/*global window, document,jQuery,widgets_url,ajaxurl*/
(function(){ 
	"use strict";
	
	var $ = jQuery;

	/**
	 * Display the notification div, populate a message, and set a CSS class
	 * @param String message Message to display
	 * @param String className CSS class of error or success
	 */
	function show_notification(message, className){
		var $notifier = $('#notifier');
		className = className || 'success';
		$notifier.html('<p>'+message+'</p>');
		$notifier.addClass(className).fadeIn('slow');
		jQuery('body,html').animate({
			scrollTop: 0
		}, 800);
	}

	/**
	 * Push the user to the Widget management page in wp-admin
	 */
	function redirect_to_widgets() {
		window.location.replace(widgets_url);
	}
	
	jQuery(function($){
		
		var wrapper = $('<div/>').css({
			height:0,
			width:0,
			'overflow':'hidden'
		}),
		$fileInput = $('#upload-file').wrap(wrapper),
		$widgetCheckbox = $('.widget-checkbox'),
		$widgetSelectionError = $('.widget-selection-error');
		
		/**
		 * Check all widget checkbox fields on click
		 * @param Object e Event object
		 */
		$('#SelectAllActive').click(function(e){
			e.preventDefault();
			$widgetCheckbox.not(":checked").each(function(){
				$(this).attr( 'checked', true );
			});
		});

		/**
		 * Uncheck all widget checkbox fields on click
		 * @param Object e Event object
		 */
		$('#UnSelectAllActive').click(function(e){
			e.preventDefault();
			$widgetCheckbox.filter(":checked").each(function(){
				$(this).attr( 'checked', false );
			});
		});
		
		/**
		 * Handle the export form submission
		 * @param Object e Event object
		 */
		$('form#widget-export-settings').submit(function(e) {
			// return and show notification if no widgets are selected
			if ($widgetCheckbox.filter(':checked').length === 0) {
				e.preventDefault();
				$widgetSelectionError.fadeIn('slow').delay(2000).fadeOut('slow');
				return;
			}
			var message = 'All of the requested widgets have been exported.';
			$('form#widget-export-settings').fadeOut('slow');
			window.setTimeout(redirect_to_widgets, 4000);
			show_notification(message, 'success');
		});
	
		/***
		 * Handle imports
		 * @param Object e Event object
		 */
		$('form#import-widget-data').submit(function(e){
			e.preventDefault();
			
			if ($widgetCheckbox.filter(':checked').length === 0) {
				$widgetSelectionError.fadeIn('slow').delay(2000).fadeOut('slow');
				return false;
			}
			var message, newClass;
			$.ajax({
				type:'POST', 
				url: ajaxurl, 
				data: $("#import-widget-data").serialize()
				})
			.done(function(data){
				//@TODO check response code or something better than a response string
				if(data === "SUCCESS") {
					message = 'All widgets with registered sidebars have been imported successfully.';
					newClass = 'success';
					$('.import-wrapper').fadeOut('slow');
					window.setTimeout(redirect_to_widgets, 4000);
				} else {
					message = 'There was a problem importing your widgets.  Please try again.';
					newClass = 'error';
				}
				show_notification(message, newClass);
			});

		});
	
		/**
		 * 
		 */
		$fileInput.change(function(){
			var $this = $(this), $outputText = $('#output-text'),
			sub = $this.val().lastIndexOf('\\') + 1,
			newString = $this.val().substring(sub);
			$outputText.text(newString);
			$outputText.fadeIn('slow');
		});

		/**
		 * 
		 */
		$('#upload-button').click(function(e){
			e.preventDefault();
			$fileInput.click();
		}).show();
	});	


}(window, document,jQuery,widgets_url,ajaxurl));

