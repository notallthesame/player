    
window.AudioContext = window.AudioContext || window.webkitAudioContext;
 
function play( snd ) {

	var audioCtx = new AudioContext();

	var request = new XMLHttpRequest();
	request.open( "GET", snd, true );
	request.responseType = "arraybuffer";
	request.onload = function () {
		var audioData = request.response;

		audioCtx.decodeAudioData(
			audioData,
			function ( buffer ) {
                                 
				var smp = audioCtx.createBufferSource();
				smp.buffer = buffer;
				smp.connect( audioCtx.destination );
				smp.start( 0 );
			},
			function ( e ) {
				alert( "Error with decoding audio data" + e.err );
			}
		);
	};
	request.send();
};

play( "test_ogg.ogg" );
 
//URL до аудио файла (mp3, ogg, wav)
//play( "test_ogg.ogg" );
$(function() { 


    $('#fileinput').on('change', function(){
        var fileName = $(this).val();
        if (!fileName) { 
            alert('Ничего не ввдеено'); 
        } else {
            $('#filename').val(fileName);
        }
    });
    
    $('#play_button').on('click', function() {
        var filename = $('#filename').val();
      //  alert(filename);
      //  play( "test_ogg.ogg" );
    
    });
});

function showFileInput() {
    var fileInput = document.getElementById("fileinput");
    fileInput.click();
}




