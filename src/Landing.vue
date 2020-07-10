<template>
    <div class="container pt-4">
        <img style="width: 200pt" :src="require('./img/main_logo.png')">
        <div class="jumbotron mt-4">
            <h1 class="display-4">Ejercicio parametrizados para EVA</h1>
            <p class="lead">Las evaluaciones en EVA ahora si son personales.</p>
            <hr class="my-4">
            <p>Utiliza el máximo potencial del EVA evaluando con ejercicios parametrizados definidos utilizando Ejercicio Estudio.</p>
            <p>Define los parámetros para que cada estudiante tenga ejercicios con valores numéricos y respuestas diferentes.</p>
            <p>Utiliza el editor para definir ejercicios multiple opción parametrizados que puedes importar al EVA y utilizarlos directamente en tus evaluaciones.</p>
            <p class="lead">
                <router-link to="/editor" class="btn btn-primary btn-lg">Abrir editor</router-link>
            </p>
        </div>
        <section>
            <div class="row">
                <div class="main-col col-sm">
                    <svg class="main-icon bi bi-eye" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.134 13.134 0 0 0 1.66 2.043C4.12 11.332 5.88 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0 0 14.828 8a13.133 13.133 0 0 0-1.66-2.043C11.879 4.668 10.119 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 0 0 1.172 8z"/>
                        <path fill-rule="evenodd" d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                    </svg>
                    <h2>Dificulta la copia</h2>
                    <p>Cada ejercicio es unico por lo que dificulta que los estudiantes compartan las respuestas</p>
                </div>
                <div class="main-col col-sm">
                    <svg class="main-icon bi bi-arrow-repeat" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M2.854 7.146a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L2.5 8.207l1.646 1.647a.5.5 0 0 0 .708-.708l-2-2zm13-1a.5.5 0 0 0-.708 0L13.5 7.793l-1.646-1.647a.5.5 0 0 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0 0-.708z"/>
                        <path fill-rule="evenodd" d="M8 3a4.995 4.995 0 0 0-4.192 2.273.5.5 0 0 1-.837-.546A6 6 0 0 1 14 8a.5.5 0 0 1-1.001 0 5 5 0 0 0-5-5zM2.5 7.5A.5.5 0 0 1 3 8a5 5 0 0 0 9.192 2.727.5.5 0 1 1 .837.546A6 6 0 0 1 2 8a.5.5 0 0 1 .501-.5z"/>
                    </svg>
                    <h2>Proceso colaborativo</h2>
                    <p>Gracias al formato estandar ahora es facil compartir y colaborar la definición de los ejercicios con otros docentes</p>
                </div>
                <div class="main-col col-sm">
                    <svg class="main-icon bi bi-asterisk" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z"/>
                    </svg>
                    <h2>Interfaz intuitiva</h2>
                    <p>Definir los ejercicios es más fácil con el editor interactivo</p>
                </div>
            </div>
        </section>
        <section>
            <h1 class="display-4">Paso a paso</h1>
            <div class="row">
                <div class="col-md-3">
                    <h4>1.</h4>
                    <img class="step" style="width: 100%" :src="require('./img/step1.png')">
                    <h4>Define ejercicio</h4>
                </div>
                <div class="col-md-3">
                    <h4>2.</h4>
                    <img class="step" style="width: 100%" :src="require('./img/step2.png')">
                    <h4>Descarga el XML</h4>
                </div>
                <div class="col-md-3">
                    <h4>3.</h4>
                    <img class="step" style="width: 100%" :src="require('./img/step3.png')">
                    <h4>Importalo en EVA</h4>
                </div>
                <div class="col-md-3">
                    <h4>4.</h4>
                    <img class="step" style="width: 100%" :src="require('./img/step4.png')">
                    <h4>Crea una evaluación</h4>
                </div>
            </div>
        </section>
        <section>
            <h1 class="display-4">Casos de éxito</h1>
            <div class="row">
                <div class="col-md-6">
                    <blockquote class="blockquote">
                        <p class="mb-0">Ejercicio Estudio nos permitió adaptarnos a tiempos de educacion a distancia post-COVID y realizar evaluaciones más confiables.</p>
                        <footer class="blockquote-footer">Mary Reimond. <cite title="Source Title">Responsalble de la cátedra de matemática FADU</cite></footer>
                    </blockquote>
                </div>
                <div class="col-md-6">
                    <blockquote class="blockquote">
                        <p class="mb-0">Pudimos organizar los ejercicios y trabajar varios docentes a la vez. Eso marcó una gran diferencia!</p>
                        <footer class="blockquote-footer">Federico Gimenez. <cite title="Source Title">Docente de matemática FADU</cite></footer>
                    </blockquote>
                </div>
            </div>
        </section>
        <section>
            <h1 class="display-4">Video tutorial</h1>
            <div class="row">
                <div class="col-sm">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/7JIQB7ol8sw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
        </section>
        <section>
            <h1 class="display-4">Recursos</h1>
            <div class="list-group">
                <a class="list-group-item list-group-item-action" href="https://docs.google.com/document/d/e/2PACX-1vRGg1dQgZehG6qdyqndAajXpSiR3Ke0ncQDssaZgzz9vRTT_7xCIG0CrSTL8cgtu_6MvjMUQ_AWIwHY/pub">
                    <h5 style="color: #007bff;">Guia de Usuario 
                        <svg class="mb-3 bi bi-box-arrow-in-up-right" width="0.6em" height="0.6em" viewBox="0 0 16 16" fill="#007bff" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M14.5 3A1.5 1.5 0 0 0 13 1.5H3A1.5 1.5 0 0 0 1.5 3v5a.5.5 0 0 0 1 0V3a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H9a.5.5 0 0 0 0 1h4a1.5 1.5 0 0 0 1.5-1.5V3z"/>
                            <path fill-rule="evenodd" d="M4.5 6a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V6.5H5a.5.5 0 0 1-.5-.5z"/>
                            <path fill-rule="evenodd" d="M10.354 5.646a.5.5 0 0 1 0 .708l-8 8a.5.5 0 0 1-.708-.708l8-8a.5.5 0 0 1 .708 0z"/>
                        </svg>
                    </h5>
                    <p>Todo lo que hay que saber para definir el ejercicio y agregarlo a una evaluación (cuestionario) en EVA.</p>
                </a>
                <a class="list-group-item list-group-item-action" href="/exercise_standard_specification_which_promotes_collaboration_and_reusing.pdf">
                    <h5 style="color: #007bff;">Articulo Científico 
                        <svg class="mb-3 bi bi-box-arrow-in-up-right" width="0.6em" height="0.6em" viewBox="0 0 16 16" fill="#007bff" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M14.5 3A1.5 1.5 0 0 0 13 1.5H3A1.5 1.5 0 0 0 1.5 3v5a.5.5 0 0 0 1 0V3a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H9a.5.5 0 0 0 0 1h4a1.5 1.5 0 0 0 1.5-1.5V3z"/>
                            <path fill-rule="evenodd" d="M4.5 6a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V6.5H5a.5.5 0 0 1-.5-.5z"/>
                            <path fill-rule="evenodd" d="M10.354 5.646a.5.5 0 0 1 0 .708l-8 8a.5.5 0 0 1-.708-.708l8-8a.5.5 0 0 1 .708 0z"/>
                        </svg>
                    </h5>
                    <p><span style="font-style: italic;">Especificación estándar de ejercicios que promueve la colaboración y la reutilización</span> por Ezequiel Sanchez,
, Regina Motz y Omar Gil publicado en LACLO 2017 y presentado por Omar Gil en La Plata, Argentina.</p>
                </a>
                <a class="list-group-item list-group-item-action" href="https://drive.google.com/drive/folders/1Zyl54X1ouMuxMe5PKITVViMtSKmVo1Sy?usp=sharing">
                    <h5 style="color: #007bff;">Repositorio Oficial de Ejercicios 
                        <svg class="mb-3 bi bi-box-arrow-in-up-right" width="0.6em" height="0.6em" viewBox="0 0 16 16" fill="#007bff" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M14.5 3A1.5 1.5 0 0 0 13 1.5H3A1.5 1.5 0 0 0 1.5 3v5a.5.5 0 0 0 1 0V3a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H9a.5.5 0 0 0 0 1h4a1.5 1.5 0 0 0 1.5-1.5V3z"/>
                            <path fill-rule="evenodd" d="M4.5 6a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V6.5H5a.5.5 0 0 1-.5-.5z"/>
                            <path fill-rule="evenodd" d="M10.354 5.646a.5.5 0 0 1 0 .708l-8 8a.5.5 0 0 1-.708-.708l8-8a.5.5 0 0 1 .708 0z"/>
                        </svg>
                    </h5>
                    <p>Podes bajar ejercicios que hicieron otros docentes y cargarlos en el Ejercicio Estudio. Tambien podes subir los tuyos para compartir!</p>
                </a>
            </div>
        </section>
        <section>
            <h1 class="display-4">Contacto</h1>
            <p class="font-weight-bold">¿Necesitas ayuda? ¿Tenes sugerencias? ¿Queres colaborar?</p>
            <p>Podes comunicarte mandando un email a <a href="mailto:contacto@ejercicioestudio.edu.uy">contacto@ejercicioestudio.edu.uy</a>.</p>
        </section>
        <section>
            <h1 class="display-4">Codigo y Licencia</h1>
            <p>Esta plataforma se ofrece bajo licencia <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/deed.es">CC BY-NC-SA 3.0</a>; podes usarlo, compartirlo y adaptarlo respetando los término. Los ejercicios desarrollados son enteramente propiedad del docente y no están comprendidos dentro de la licencia.</p>
            <p>Todas las contribuciones al software son bienvenidas en <a href="https://github.com/squiel91/ejercicio_estudio">Github</a>. 
            Podes contribuir reportando errores o corrigiendolos, sugiriendo nuevas funcionalidades o desarrollando alguna de las de la lista en el <a href="https://github.com/squiel91/ejercicio_estudio/blob/master/README.md">README</a>.</p> 
            <img style="width: 120pt; margin-top: 20pt; margin-bottom: 40pt;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Cc-by-nc-sa_icon.svg/1280px-Cc-by-nc-sa_icon.svg.png">
        </section>
    </div>
</template>

<style scoped>
    .main-col {
            text-align: center; 
        }

        .main-icon {
            width: 80pt;
        }

        section {
            padding-top: 20pt;
            padding-bottom: 20pt;
        }

        section h1 {
            padding-bottom: 10pt;
        }

        img.step {
            padding:1px;
            border:1px solid gainsboro;
            margin-bottom: 8pt;
        }
</style>