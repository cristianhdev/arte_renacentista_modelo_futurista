
let video;

let elementoActualSound = null;
let videoActualPosicion = null;
let idResetActual = null;
let audioHimno = null;
let audiopage = null;
let myAnimation
let videos;
let botonesPlayVideos;

function init() {
    audioHimno = new Sonidos('Himno_Colombia');
    audiopage = new Sonidos('HojaFlip');
    document.body.addEventListener('keyup', presentacionteclado, false)

    videos = document.querySelectorAll('video')

    botonesPlayVideos = document.querySelectorAll('.botonPlay')

    setTimeout(() => {
        cargaPageFlip()
        document.querySelector('.spinner').classList.add('hidden')
        document.querySelector('.flipbook-viewport').classList.remove('hidden')

    }, 999);

}

function menuFlipBook(page) {
    $('.flipbook').turn('page', page)
}


function cargaPageFlip() {

    let flippage = document.querySelector('.flipbook')

    // Create the flipbook

    $(flippage).turn({
        // Width

        width: 922,

        // Height

        height: 600,

        // Elevation

        elevation: 50,

        // Enable gradients

        gradients: true,

        // Auto center this flipbook

        autoCenter: true

    });







    let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile) {

    } else {
        /* $(".flipbook").turn({width:640, height:623}); */
        $(flippage).turn('display', 'single');

        if (window.innerWidth > 320 && window.innerWidth < 400) {
            $(flippage).turn('size', 330, 535);
        } else {
            $(flippage).turn('size', 400, 635);
        }

        $(flippage).turn('resize')

    }

    $(flippage).bind('turning', (event, page, view) => {

        audiopage.playAudio()

        document.querySelectorAll('video').forEach(video => {

            video.pause()
            video.currentTime = 0
        });

        botonesPlayVideos.forEach((videoid) => {
            //Reiniciamos imagen y el estado  de todos los botones.
            videoid.classList.remove('botonPause')
            videoid.classList.add('botonPlay')
            videoid.removeEventListener('click', stopVideo, false)
            videoid.addEventListener('click', playVideo, false)
        });

        if(idResetActual!=null){
            if(idResetActual!=''){
                document.querySelector(`#${idResetActual}`).classList.add('disabledbutton')
                idResetActual=null
            }
        }
        


        if (elementoActualSound != null) {
            audioHimno.stopAudio()
            document.querySelector(elementoActualSound).removeEventListener('click', stopSonido, false)
            document.querySelector(elementoActualSound).addEventListener('click', playSonido, false)
            document.querySelector(elementoActualSound).classList.add('botonPlay')
            document.querySelector(elementoActualSound).classList.remove('botonPause')

        }

    })

    $(flippage).bind('turned', (event, page, view) => {

    })


}

function presentacionteclado(e) {


    if (e.keyCode == 39) {
        $('.flipbook').turn('next');
        e.preventDefault();
        /* siguiente() */
    }

    if (e.keyCode == 37) {
        $('.flipbook').turn('previous');
        e.preventDefault();

    }
}

function playVideo(id, videoP, idReset) {
    videoActualPosicion = videoP
    idResetActual = idReset
    document.querySelector(`#${id}`).removeEventListener('click', playVideo, false)
    document.querySelector(`#${id}`).addEventListener('click', stopVideo, false)
    document.querySelector(`#${id}`).classList.remove('botonPlay')
    document.querySelector(`#${id}`).classList.add('botonPause')
    document.querySelector(`#${idReset}`).classList.remove('disabledbutton')
    videos[videoP].play()
    videos[videoP].addEventListener('ended', () => {
        document.querySelector(`#${id}`).classList.add('botonPlay')
        document.querySelector(`#${id}`).classList.remove('botonPause')
        document.querySelector(`#${idReset}`).classList.add('disabledbutton')
        document.querySelector(`#${id}`).addEventListener('click', playVideo, false)
        document.querySelector(`#${id}`).removeEventListener('click', stopVideo, false)
        videoActualPosicion = null
        idResetActual = null
    })
}



function stopVideo(e) {
    document.querySelector(`#${idResetActual}`).classList.remove('disabledbutton')
    document.querySelector(`#${e.target.id}`).removeEventListener('click', stopVideo, false)
    document.querySelector(`#${e.target.id}`).addEventListener('click', playVideo, false)
    document.querySelector(`#${e.target.id}`).classList.add('botonPlay')
    document.querySelector(`#${e.target.id}`).classList.remove('botonPause')
    videos[videoActualPosicion].pause()
}

function resetVideo(idPlay, idReset) {
    //Reiniciamos el video.
    videos[videoActualPosicion].pause()
    videos[videoActualPosicion].currentTime = 0
    //Reiniciamos imagen y funcionalidad de los botones.
    document.querySelector(`#${idPlay}`).classList.remove('botonPause')
    document.querySelector(`#${idPlay}`).classList.add('botonPlay')
    document.querySelector(`#${idPlay}`).removeEventListener('click', stopVideo, false)
    document.querySelector(`#${idPlay}`).addEventListener('click', playVideo, false)
    //Reiniciamos el boton actual de detener.
    document.querySelector(`#${idReset}`).classList.add('disabledbutton')
    document.querySelector(`#${idPlay}`).classList.remove('botonPause')
    videoActualPosicion = ''
    idResetActual = ''
}


function Imprimir(idImagen) {

    let base64StringImagen1 = imagenData(idImagen)
    let imagenfondoAplicada = imagenData('imagen-fondo')


    let ventanaPreview = window.open('', '', 'height=800, width=800');
    ventanaPreview.document.write('<html>');
    ventanaPreview.document.write('<head>');
    ventanaPreview.document.write('<style>');
    ventanaPreview.document.write(`


@media print {
    #botonImprimir{
        display:none
    }
    textarea{
        resize: none !important;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }

    body{
        -webkit-print-color-adjust:exact;
        -moz-print-color-adjust:exact;
        -ms-print-color-adjust:exact;
        print-color-adjust:exact;
    } 

   
}

@media print and (orientation:landscape)
{
    body{
        -webkit-print-color-adjust:exact;
        -moz-print-color-adjust:exact;
        -ms-print-color-adjust:exact;
        print-color-adjust:exact;
    }    
}`);
    ventanaPreview.document.write('</style>');
    ventanaPreview.document.write('<script src="https://cdn.tailwindcss.com"></script>');
    ventanaPreview.document.write('</head>');
    ventanaPreview.document.write('<body> <h1>Vista previa Impresion<br>');
    ventanaPreview.document.write(`<div id="print"
                                    class="w-full h-[70vh]  flex flex-col mx-auto mt-[10%] text-center justify-center items-center content-center border-2 border-gray-100"  style='background-image:${imagenfondoAplicada};background-repeat: no-repeat;background-size: 100% 100%;background-position: center center;'>
                                    <img class=" w-[85%] h-[85%] object-contain "
                                    src="${base64StringImagen1}" alt="escudo:alt">
                                </div>`);
    ventanaPreview.document.write('</body></html>');
    ventanaPreview.document.close();

    setTimeout(() => {
        ventanaPreview.print();
    }, 1200);


}


function imagenData(id) {
    var c = document.createElement('canvas');
    var img = document.getElementById(`${id}`);
    c.height = img.naturalHeight;
    c.width = img.naturalWidth;
    var ctx = c.getContext('2d');

    ctx.drawImage(img, 0, 0, c.width, c.height);
    return c.toDataURL();
}

// Get the modal
let modal = document.getElementById("myModal");



// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

/* span.addEventListener('click', ocultarModal); */
window.addEventListener('click', ocultarModalVentana)

function ocultarModal() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
function ocultarModalVentana(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function MostrarVideo() {
    modal.style.display = "flex";
}

function OcultarVideo() {
    video.currentTime = 0
    videoMobile.currentTime = 0
    video.pause()
    videoMobile.pause()
    modal.style.display = "none";
}


