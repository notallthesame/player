
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Плеер</title>
            <!-- JQuery -->
            <script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>   
            

            <style>
            body { 
                background: black url('back2.jpg') no-repeat; 
                background-size: 20%;
                background-position: center top;
            }
            
            #ramka {
                border: 4px solid #00008B; /* Параметры границы */
                padding: 10px; /* Поля вокруг текста */
                width: 90%;
                height: 450px;
                border-radius: 6px; 
                box-shadow: 0 0 16px #E0FFFF; /* Параметры тени */
                margin: auto;
                margin-top: 10px;
                
            }
            
            .play {
                border-radius: 28px; 
                box-shadow: 0 0 10px #E0FFFF; /* Параметры тени */
                cursor: pointer;
            }
            
            #fileinput {
                    display:none;
            }

            </style>  
    </head>
    
    <body> 
        <div align='right' style='margin-right: 4%; margin-top: 40px'><img src="load2.png" alt="-" width="50px" onclick="showFileInput()"></div>
        <div id='ramka' align='center'>
            
            
        </div>
        <div align="center" style='margin-top: 20px;'>
            <img class='play' id='play_button' src="play.png" alt="-" width="50px">
            <img class='play' src="pause.png" alt="-" width="50px">
            <img class='play' src="stop.png" alt="-" width="50px">
            <img class='play' src="load.png" alt="-" width="50px">
        </div>
        
        <input id='fileinput' type="file" accept="audio/*">
        <input id='filename' type='text'>
                     <!-- JS-скрипты -->           
            <script src="js/custom.js"></script>
         </body>
</html>