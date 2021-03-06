console.log('Welcome to MARWAV(alpha):\n\t ... The multiple aspect ratio web app viewer');

var frameCount = 0;
var url = "";
var demoURL = 'http://www.alistapart.com';
var _enabledDeviceCount = 0;
var labels = ["","iPad","Galaxy S 3/4","iPhone 3GS","iPhone 5","Nexus One","Galaxy Nexus","HTC Incredible"];
var maxDeviceCount = labels.length;
console.log('\t... [' + maxDeviceCount-1 + '] devices are available to test with');

var focusedIframe = "";
var scale = 100;
var randomID = new Date().getMilliseconds();
var clickOrTouchEvent = 'mouseup touchend';

$(document).ready(function(){

	$('#iframe_url_form h1').bind('click touchstart',function(){
		document.location.href = 'http://github.com/cemerson/marwav';
	});

	$(window).resize(function(){ refreshIFramesOrigin(); });

	if(!!localStorage.getItem('MARWAV_last_used_url')) $('#iframe_url').val(localStorage.getItem('MARWAV_last_used_url'));

	$('#iframe_url_demo').bind(clickOrTouchEvent,function(){
		$('#iframe_url').val(demoURL);
		loadUpDeviceViews();
	});

	$('#iframe_url_reset').bind(clickOrTouchEvent,function(){
		document.location.reload();
	});

	$('#iframe_url_submit').bind(clickOrTouchEvent,function(){
		loadUpDeviceViews();
	});

	// checkboxes
	var checkboxHTML = "";
	for(var d=0;d<maxDeviceCount;d++){
		if(d==0) continue;

		var _deviceIsEnabled = (localStorage.getItem('MARWAV_device_'+d) == 'checked');
		var _checkedValue = "";
		var _checkClass = "";
		if(_deviceIsEnabled){
			_checkedValue = " checked ";
			_checkClass = "is_checked"
		}

		checkboxHTML += '<input type="checkbox" ' + _checkedValue + ' class="' + _checkClass + '" checkbox_index="' + d + '" id="device_' + d + '">' +
										'<label for="device_' + d + '" class="' + _checkClass + '">' + labels[d] + '</label>';
	}

	if(!!localStorage.getItem('MARWAV_scale_selected_index')){
		$('#iframe_scale').prop('selectedIndex', localStorage.getItem('MARWAV_scale_selected_index'));
	}

	$('#device_checkboxes')
		.remove('input,label')
		.append(checkboxHTML);

	$('input[type=checkbox]').bind('change',function(){
			var _isChecked = ($(this).is(':checked'));
			var _checkboxIndex = $(this).attr('checkbox_index');
			var _itemsToToggle = $('#device_' + _checkboxIndex + ', label[for=device_' + _checkboxIndex + ']');
			if(_isChecked){
				$(_itemsToToggle).addClass('is_checked');
			}else{
				$(_itemsToToggle).removeClass('is_checked');
			}
	});
});


/* ----------------------------------------------------------- /
	refreshIFramesOrigin
/ ----------------------------------------------------------- */
function refreshIFramesOrigin(){

	try{
		if(parseInt(scale) == 100) return;


		report('TEST','--> refreshIFramesOrigin()..');
		/*
		TODO: Need to crunch numbers to figure out some minimum/allowed re-positioning when at 50%/25% scale.

		$('#iframes').height()	894
		$('#iframes').width() 	2332
		window.innerHeight			629
		window.innerWidth 			1166
		top: -132px;
		left: -583px;
		*/

		var _w = Math.round($('#iframes').width()*.50);
		var _h = Math.round($('#iframes').height()*.50);
		var _l = Math.round( (window.innerWidth/2) - (_w));
		var _t = Math.round( (window.innerHeight/2) - (_h));

		var _originL = Math.round((window.innerWidth/2)); ///2);
		var _originT = Math.round((window.innerHeight/2)/2);

		$('#iframes')
			.css('top','-' + _originT + 'px')
			.css('left','-' + _originL + 'px');
	}catch(e){ catchError('refreshIFramesOrigin()',e); }
}

/* ----------------------------------------------------------- /
	loadUpDeviceViews
/ ----------------------------------------------------------- */
function loadUpDeviceViews(){
	report('TEST','--> loadUpDeviceViews()..');
	try{
		scale = $('#iframe_scale').val();

		// save settings for next refresh
		for(var d=0;d<maxDeviceCount;d++){
			if(d==0) continue;

			var _deviceIsEnabled = ($('#device_' + d).is(':checked'));
			if(_deviceIsEnabled){
				localStorage.setItem('MARWAV_device_'+d,'checked');
			}else{
				localStorage.setItem('MARWAV_device_'+d,'not_checked');
			}
		}
		localStorage.setItem('MARWAV_scale_selected_index',$('#iframe_scale').prop('selectedIndex'));
		localStorage.setItem('MARWAV_last_used_url',$('#iframe_url').val());




		// reset page
		$('body')
			.removeClass('zoom_100')
			.removeClass('zoom_50')
			.removeClass('zoom_25')
			.removeClass('zoom')
			.addClass('zoom_' + scale)
			.addClass('zoom');
		url = $('#iframe_url').val();

		// start iframe adding
		addIframes(true);
	}catch(e){ report('ERROR','loadUpDeviceViews(): ERROR [' + e + ']'); }
}

function getUniqueURL(){
	var _now = new Date();
	var _url = url + '?noCacheID=' + _now.getMilliseconds()
	return _url;
}



function addIframes(initFrames){

	if(initFrames){
		frameCount = 0;
		$('body #iframes').html('');
	}

	if(frameCount < maxDeviceCount){
		// STILL ADDING IFRAMES!
		frameCount ++;

		var _deviceIsEnabled = ($('#device_' + frameCount).is(':checked'));
		var _deviceLabel = labels[frameCount];
		if(_deviceIsEnabled){
			_enabledDeviceCount ++;
			window.console.log('Device (' + _deviceLabel + ') is enabled so initializing its <iframe> now...');
			$('body #iframes').append('<div class="iframe_container" device_id="' + frameCount + '" id="iframe_container_'+
																		frameCount + '""><iframe src=' + getUniqueURL() + ' id="frame_' +
																		frameCount + '"></iframe><div class=background></div> </div>');

			var iframe = $('#iframe_container_' + frameCount);
			var iframeH = $(iframe).innerHeight();
			var iframeW = $(iframe).innerWidth();
			$(iframe).append('<input type=button value="Rotate"/><input type=button value="Refresh"/><label>' + _deviceLabel + '<span>' + iframeW + 'x' + iframeH + '</span></label>');

			$('iframe#frame_' + frameCount).load(function() {
					addIframes();
			});
		}else{
			window.console.log('Device (' + _deviceLabel + ') is NOT enabled so skipping to the next device now...');
			addIframes();
		}

	}else{
		// DONE ADDING IFRAMES!

		// init all refresh buttons
		$('.iframe_container').each(function(e){
			$('input[value=Refresh]',$(this)).bind('click touchstart',function(){
				var iframeID = $(this).parent().find('iframe').attr('id');
				$('#' + iframeID).attr('src',getUniqueURL());

			});
			$('input[value=Rotate]',$(this)).bind('click touchstart',function(){
				var _w = $(this).parent().width();
				var _h = $(this).parent().height();

				$(this).parent()
					.toggleClass('rotated')
					.css("width",_h+"px")
					.css("height",_w+"px");
				$('body').toggleClass('focused_device');
			});

		});

		// if(console.clear) console.clear();
		refreshIFramesOrigin();

		if(_enabledDeviceCount == 0){
			alert('Did you forget to click a device checkbox?');
		}

	}

}


/* ----------------------------------------------------------- /
	report
/ ----------------------------------------------------------- */
function report(type,msg){
	try{
		window.console.log(msg);
	}catch(e){ window.console.log('report() error: ' + e.message); }
}
