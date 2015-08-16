 // Получим AudioContext в зависимости от браузера
 window.AudioContext = (function(){
    return  window.webkitAudioContext || window.AudioContext || window.mozAudioContext;
})();

// Укажем браузеру, что будет анимация (в зависимости от типа браузера)
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function(callback, element){
                window.setTimeout(callback, 1000 / 60);
            };
})();
    
// Глобальные переменные Audio
var audioContext;
var audioBuffer;
var sourceNode;
var analyserNode;
var javascriptNode;
var audioUrl = null;
var audioData = null;
var audioPlaying = false;
var sampleSize = 1024;
var amplitudeArray; 

// Глобальные переменные для визуализации
var canvasWidth  = 800;
var canvasHeight = 200;
var ctx;

// Действия, которые произойдут после загрузки страницы
$(function(){
    // Выбор аудиофайла с помощью диалогового окна 
    document.getElementById('fileinput').addEventListener('change', function(e) {  

        addMarquee();
        visibilityContents();
        audioName(e.target.files[0].name);
        ctx = $("#canvas").get()[0].getContext("2d");
        
        var reader = new FileReader();
        reader.onload = function(e) {
            initSound(e.target.result);
        };
        reader.readAsArrayBuffer(e.target.files[0]);

    }, false); 
    
    // Выбор аудиофайла с помощью drag and drop
    var dropZone = document.getElementById('visualization');
    dropZone.addEventListener('dragover', function(e) { 
        e.stopPropagation();
        e.preventDefault();    
        e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    }, false);
    dropZone.addEventListener('drop', function(e) {  
        e.stopPropagation();
        e.preventDefault();    
        
        addMarquee();
        visibilityContents();
        audioName(e.dataTransfer.files[0].name);
        ctx = $("#canvas").get()[0].getContext("2d");
        
        var reader = new FileReader();
        reader.onload = function(e) {
        initSound(e.target.result);
        };
        reader.readAsArrayBuffer(e.dataTransfer.files[0]);
    }, false);
    
    // Создаем объект AudioContext
    try {
        audioContext = new AudioContext();
    } catch(e) {
        alert('Web Audio API is not supported in this browser');
    }
    
    // Установка настройка, запуск проигрывания фудиофайла, рисование визуализации
    // при нажатии на кнопку "Play"
    $("#play_button").on('click', function(e) {
        e.preventDefault();       
        setupAudioNodes();
        // Обработчик события, который срабатывает каждый раз, 
        // когда будет собранно достаточное количество данных аудиоанализатора
        // и выводит результат
        javascriptNode.onaudioprocess = function () {
            // Получим данные
            analyserNode.getByteTimeDomainData(amplitudeArray);
            // Рисуем визуализацию, если аудиофайл играет
            if (audioPlaying == true) {
                requestAnimFrame(drawTimeDomain);
            }
        }
        // Запуск аудиофайла, если он есть
        if(audioData != null) {
            audioName(audioUrl);
            playSound(audioData);
        }
    });
    
    // Остановка аудиофайла
    $("#stop_button").on('click', function(e) {
        e.preventDefault();
        sourceNode.stop(0);
        audioPlaying = false;
    });

});

// Установка аудиоанализатора, Source Buffer и javascriptNode
function setupAudioNodes() {
    sourceNode = audioContext.createBufferSource();
    analyserNode = audioContext.createAnalyser();
    javascriptNode = audioContext.createScriptProcessor(sampleSize, 1, 1);
    // Создание массива значений данных
    amplitudeArray = new Uint8Array(analyserNode.frequencyBinCount);
    
    sourceNode.connect(audioContext.destination);
    sourceNode.connect(analyserNode);
    analyserNode.connect(javascriptNode);
    javascriptNode.connect(audioContext.destination);
}

// Запуск аудиофайла и повторение его, пока не будет нажата кнопка "Стоп"
function playSound(buffer) {
    sourceNode.buffer = buffer;
    sourceNode.start(0);
    sourceNode.loop = true;
    audioPlaying = true;
}

// Рисование визуализации
function drawTimeDomain() {
    clearCanvas();
    for (var i = 0; i < amplitudeArray.length; i++) {
        var value = amplitudeArray[i] / 210;
        var y = canvasHeight - (canvasHeight * value) - 1;
        ctx.fillStyle = "#0000FF";
        ctx.fillRect(i, y, 2, 2);
    }
}

// Очистка canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

// Кодирование аудиофайла
function initSound(arrayBuffer) {
    audioContext.decodeAudioData(arrayBuffer, function(buffer) {
        audioData = buffer;
    }, function(e) {
        console.log('Error decoding', e);
    }); 
}

// Вызов диалогового окна выбора файла при нажатии на изображение
function showFileInput() {
    var fileInput = document.getElementById("fileinput");
    fileInput.click();
}

// Вставка бегущей строки
function addMarquee() {
    var visualization = document.getElementById('visualization');
    test = visualization.innerHTML;
    visualization.innerHTML = test + '<marquee id="audio_name" scrollamount="5" behavior="alternate" direction="right" bgcolor="black" width="100%"></marquee>';
};

// Вставка названия аудиофайла в бегущую строку
function audioName(name) {
    var audio_name = document.getElementById('audio_name');
    audio_name.innerHTML = name;
    audioUrl = name;
};

// Показать визуализацию и скрыть инфо
function visibilityContents() {
    $('#info').css("display", "none");
    $('#canvas').css("display", "block");
    $('#audio_name').css("display", "block");
};


