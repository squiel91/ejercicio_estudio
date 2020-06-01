<template>
    <div>
        <nav style="background-color: #f8f9fa">
            <div class="container p-2">
                <div class="row">
                    <div class="col-12 col-sm-6">
                        <img :src="require('./img/main_logo.png')" style="height:10vh;" alt="main logo">
                    </div>
                    <div class="col-12 col-sm-6 my-auto py-2">
                        <div style="display: inline-block" class="dropdown float-right">
                            <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Descargar
                            </button>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                <span @click="descargar" class="dropdown-item" href="#">Especificacion (.txt)</span>
                                <div class="dropdown-divider"></div>
                                <span @click="descargarEva" class="dropdown-item" href="#">EVA (.xml)</span>
                            </div>
                        </div>
                        <div style="display: inline-block" class="dropdown float-right">
                            <button class="btn btn-outline-primary dropdown-toggle mr-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Cargar
                            </button>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                <span class="dropdown-item" @click="cargarEjemplo(0)">Ejercicio sin variabilidad</span>
                                <span class="dropdown-item" @click="cargarEjemplo(1)">Reacciones viga apoyada</span>
                                <span class="dropdown-item" @click="cargarEjemplo(2)">Cortante viga apoyada volada</span>
                                <span class="dropdown-item" @click="cargarEjemplo(3)">Momento viga apoyada volada</span>
                                <span class="dropdown-item" @click="cargarEjemplo(4)">Integrales indefinidas</span>
                                <div class="dropdown-divider"></div>
                                <span class="dropdown-item" @click="$refs.cargarEjercicio.click()">Desde tu PC</span>
                                <div class="dropdown-divider"></div>
                                <span class="dropdown-item" @click="reinicializar">Ejercicio Vacio</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <div class="container">
            <div v-if="showTutorial" class="embed-responsive embed-responsive-21by9">
            <iframe src="https://www.youtube.com/embed/videoseries?list=PL3C0FXQkj7vQyFg2k9WsTaBED5oIfVFOB" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div class="my-2" style="text-align: center;">
            <button @click="showTutorial = ! showTutorial" class="btn btn-outline-secondary">{{ showTutorial? 'Hide' : 'Show' }} Tutorial</button>
            </div>                
        <div class="form-group">
            <label for="titulo">Título</label>
                <svg @click="ayudaTitulo = !ayudaTitulo" class="bi bi-question-circle float-right" width="1.2em" height="1.2em" viewBox="0 0 16 16" fill="#007bff" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/>
                    <path d="M5.25 6.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                </svg>
            <div v-if="ayudaTitulo" @click="ayudaTitulo = false" class="alert alert-primary" role="alert">
                Título identificativo del ejercicio para conveniencia de los docentes, el estudiante NO lo verá.<br><br>
                <strong>Es obligatorio definirlo.</strong></div>
            <input 
                class="form-control form-control-lg" 
                :class="{'is-invalid': errorTitulo != ''}" 
                @keyup="tituloValido" 
                type="text" 
                id="titulo" 
                v-model="titulo">
            <div class="invalid-feedback">
                {{ errorTitulo }}
            </div>
        </div>

        <div class="form-group">
            <label for="imagen">Imagen</label>
            <svg @click="ayudaImagen = !ayudaImagen" class="bi bi-question-circle float-right" width="1.2em" height="1.2em" viewBox="0 0 16 16" fill="#007bff" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/>
                <path d="M5.25 6.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
            </svg>
            <svg v-if="imagen != ''" @click="imagen = ''" class="bi bi-trash-fill float-right mr-2" width="1.2em" height="1.2em" viewBox="0 0 16 16" fill="#007bff" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M2.5 1a1 1 0 00-1 1v1a1 1 0 001 1H3v9a2 2 0 002 2h6a2 2 0 002-2V4h.5a1 1 0 001-1V2a1 1 0 00-1-1H10a1 1 0 00-1-1H7a1 1 0 00-1 1H2.5zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5zM8 5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 018 5zm3 .5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7z" clip-rule="evenodd"/>
            </svg>
            <div v-if="ayudaImagen" @click="ayudaImagen = false" class="alert alert-primary" role="alert">
                Imagen opcional que se incluye arriba del texto problema. Dado que es una imágen estática recomendamos nombrar los parámetros por nombre y no un valor que podría variar.<br><br>
                <strong>El tamaño máximo es de 500 kb. Acepta cualquier formato de imágen.</strong>
            </div>
            <div v-if="imagen != ''" class="card">
                <img class="card-img" :src="imagen">
            </div>
            <div v-else class="input-group">
                <div class="custom-file">
                    <input type="file" @change="subirImagen" accept="image/x-png,image/gif,image/jpeg,  image/jpg" class="custom-file-input" id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01">
                    <label class="custom-file-label" for="inputGroupFile01">{{ mensajeImagen }}</label>
                </div>
            </div>
        </div>
        <div class="form-group">
            <label for="problema">Problema</label>
            <svg @click="ayudaProblema = !ayudaProblema" class="bi bi-question-circle float-right" width="1.2em" height="1.2em" viewBox="0 0 16 16" fill="#007bff" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/>
                <path d="M5.25 6.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
            </svg>
            <div v-if="ayudaProblema" @click="ayudaProblema = false" class="alert alert-primary" role="alert">
                Texto principal que especifica el problema.<br><br>
                Puedes usar una variable antes definida (parámetro o cómputo) antecediendolo por un símbolo "@" (ejemplo: @largo).<br><br>
                También puedes utilizar LaTeX estándar para definir fórmulas matemáticas (delimitandolas con \( y \) para fórmulas en la misma línea o \[ y \] para fórmulas espaciadas centradas).<br><br>
                <strong>Es obligatorio definirlo.</strong>
            </div>
            <textarea 
                v-show="editando"
                @keyup="problemaValido"
                @blur="renderizar" 
                :class="{'is-invalid': errorProblema != ''}" 
                ref="problemaInput" 
                class="form-control" 
                id="problema" 
                rows="4" 
                v-model="problema">
            </textarea>
            <div v-show="!editando" class="card p-3">
                <div v-katex:auto @click="aplanar" ref="problemaVisual" class="latex in" name="problema" id="problema" contenteditable="true"></div>
            </div>
            <div class="invalid-feedback">
                {{ errorProblema }}
            </div>
        </div>
        <div class="form-group">
            <label for="solucion">Solución</label>
            <svg @click="ayudaSolucion = !ayudaSolucion" class="bi bi-question-circle float-right" width="1.2em" height="1.2em" viewBox="0 0 16 16" fill="#007bff" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/>
                <path d="M5.25 6.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
            </svg>
            <div v-if="ayudaSolucion" @click="ayudaSolucion = false" class="alert alert-primary" role="alert">
                Texto que especifica la solución correcta al problema antes planteado. Debe ser la opción seleccionada por los alumnos para que se les tome el ejercicio como correcto.<br><br>
                Al igual que en la sección Problema puedes usar una variable antes definida (parámetro o cómputo) antecediendolo por un símbolo "@" (ejemplo: @ancho).<br><br>
                Por limitaciones actuales del EVA en las opciones de ejercicios parametrizados no se admite el uso de LaTeX<br><br>
                <strong>Es obligatorio definirla.</strong>
            </div>
            <textarea 
                @keyup="solucionValida"
                class="form-control"
                :class="{'is-invalid': errorSolucion != ''}" 
                id="solucion" 
                rows="2" 
                v-model="solucion">
            </textarea>
            <div class="invalid-feedback">
                {{ errorSolucion }}
            </div>
        </div>
        <hr class="my-3"/>
        <section>
            <div v-if="distractores.length == 0" class="alert alert-danger" role="alert">
                Se necesita al menos un distractor.
            </div>
            <distractor v-for="(distractor, indice) in distractores" @eliminar="distractores.splice(indice, 1)" ref="distractores" :key="indice" v-model="distractores[indice]"/>
            <div v-if="ayudaDistractores" @click="ayudaDistractores = false" class="alert alert-primary" role="alert">
                Los <strong>distractores</strong> son las opciones que "distraen" a los alumnos. Aquellos que elijan un distractor como respuesta se les tomará el ejercicio como incorrecto.<br><br>
                Al igual que en la sección Problema y Solución puedes usar una variable antes definida (parámetro o cómputo) antecediendolo por un símbolo "@" (ejemplo: @areaTriangulo).<br><br>
                Por limitaciones actuales del EVA en las opciones de ejercicios parametrizados no se admite el uso de LaTeX<br><br>
                <strong>Ten en cuenta que para que el ejercicio sea válido debes definir al menos un distractor.</strong>    
            </div>
            <button @click="distractores.push('')" class="btn btn-primary">Agregar Distractor</button>
            <svg @click="ayudaDistractores = !ayudaDistractores" class="bi bi-question-circle ml-3" width="1.2em" height="1.2em" viewBox="0 0 16 16" fill="#007bff" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/>
                <path d="M5.25 6.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
            </svg>
        </section>
        <hr class="my-3"/>
        <section>
            <div v-if="parametros.length == 0 && !ayudaParametros" class="alert alert-primary" role="alert">
                Define parametros para darle variabilidad al ejercicio!
            </div>
            <parametro 
                v-for="(parametro, indice) in parametros" 
                @eliminar="parametros.splice(indice, 1)"
                v-model="parametros[indice]"
                ref="parametros"
                :key="indice"
            />
            <div v-if="ayudaParametros" @click="ayudaParametros = false" class="alert alert-primary" role="alert">
                Son los <strong>parámetros</strong> variables que agregan variabilidad al ejercicio.<br><br>
                Este parámetro lo puedes usar en las secciones Problemas, Solución y Distractores como un número cualquiera antecediendo el nombre con el símbolo "@'" Al momento de mostrarse al estudiante, el parámetro se instanciará de forma aleatoria de acuerdo a la especificación.<br><br>
                Se soportan dos tipos de especificacion:
                <ul class="my-3">
                    <li><strong>Intervalo:</strong> se define un intervalo (valor minimo y maximo) dentro del que el parámetro se instanciará de acuerdo a una distribución uniforme con la cantidad de decimales especificados.</li>
                    <li><strong>Conjunto:</strong> se define un conjunto por extensión en los que el parámetro se podrá instanciar.</li>
                </ul>
                Para especificar la fórmula de un cómputo (en la siguente sección) no se debe anteponer con "@".
            </div>
            <button @click="parametros.push({
                esIntervalo: true,
                nombre: '',
                minimo: null,
                maximo: null,
                decimales: 2,
                conjunto: []
            })" class="btn btn-primary">Agregar Parámetro</button>
            <svg @click="ayudaParametros = !ayudaParametros" class="bi bi-question-circle ml-3" width="1.2em" height="1.2em" viewBox="0 0 16 16" fill="#007bff" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/>
                <path d="M5.25 6.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
            </svg>
        </section>
        <hr class="my-3"/>
        <section>
            <div v-if="computos.length == 0  && !ayudaComputos" class="alert alert-primary" role="alert">
                Define computos para agregar complejidad al ejercicio!
            </div>
            <computo 
                v-for="(computo, indice) in computos" 
                v-model="computos[indice]"
                @eliminar="computos.splice(indice, 1)"
                ref="computos"
                :key="indice"/>
            <div v-if="ayudaComputos" @click="ayudaComputos = false" class="alert alert-primary" role="alert">
                Los <strong>cómputos</strong> permiten introducir cálculos complejos a los ejercicios. El cómputo se instancia en base a la especificación de su fórmula y con la cantidad de decimales especificados.<br><br>
                Se pueden utilizar numeros, parámetros, cómputos antes definidos, operadores y fórmulas matematicas (la lista exhaustiva se pueden conultar al final de la <a target="_blank" href="https://docs.google.com/document/d/e/2PACX-1vRGg1dQgZehG6qdyqndAajXpSiR3Ke0ncQDssaZgzz9vRTT_7xCIG0CrSTL8cgtu_6MvjMUQ_AWIwHY/pub">Guía de usuario</a>)
                Para los parámetros y cómputos no se debe anteponer "@" como si en Problema, Solucion y Distractor.
            </div>
            <button @click="computos.push({
                nombre: '',
                formula: '',
                decimales: 2
            })" class="btn btn-primary">Agregar Cómputo</button>
            <svg @click="ayudaComputos = !ayudaComputos" class="bi bi-question-circle ml-3" width="1.2em" height="1.2em" viewBox="0 0 16 16" fill="#007bff" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/>
                <path d="M5.25 6.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
            </svg>
        </section>
    </div>
    <footer style="background-color:#f8f9fa" class="pt-4 mt-5">
        <div class="container">
            <div class="row">
                <div class="col-12 col-lg-6 pb-5">
                    <h4>Ejercicio Estudio v 0.5</h4>
                    <p>Este software surge como una colaboración entre la Facultad de Ingeniería y la FADU para generar ejericicos parametrizados.</p>
                    <p>Dedicado a <a href="https://www.youtube.com/watch?v=E8WFA_B_Ci4&fbclid=IwAR3PHGQ4qZYrji1UCK-VXQVhE8zVH5aEZzN6-DHoihrtUR1QUfANFWsWQXk">Omar Gil</a></p>
                    <a href="http://udelar.edu.uy/portal/">Universidad de la Repúbica</a> 2020 ©
                </div>
                <div class="col-4 col-lg-2 pb-5">
                    <h5>Resursos</h5>
                    <a target="_blank" href="https://docs.google.com/document/d/e/2PACX-1vRGg1dQgZehG6qdyqndAajXpSiR3Ke0ncQDssaZgzz9vRTT_7xCIG0CrSTL8cgtu_6MvjMUQ_AWIwHY/pub">Guia de usuarios</a><br>
                    <a target="_blank" href="exercise_standard_specification_which_promotes_collaboration_and_reusing.pdf">Artículo científico</a><br>
                </div>
                <div class="col-4 col-lg-2 pb-5">
                    <h5>Repositorios</h5>
                    <a target="_blank" href="https://github.com/squiel91/ejercicio_estudio">Github</a><br>
                    <a target="_blank" href="https://drive.google.com/drive/folders/1Zyl54X1ouMuxMe5PKITVViMtSKmVo1Sy?usp=sharing">Ejercicios</a><br>
                </div>
                <div class="col-4 col-lg-2 pb-5">
                    <h5>Feedback</h5>
                    <a target="_blank" href="mailto:squiel91@gmail.com">Email</a><br>
                    <a target="_blank" href="https://twitter.com/squiel91">Twitter</a>
                </div>
            </div>
        </div>
    </footer>
    <input ref="cargarEjercicio" @change="fileLoaded" type="file" name="name" style="display: none;" />
    </div>
</template>

<script>
import Distractor from './components/Distractor.vue'
import Parametro from './components/Parametro.vue'
import Computo from './components/Computo.vue'
import axios from 'axios'

const CANTIDAD_INSTANCIAS = 100
const SIMBOLO_VAR = "@"

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

export default {
    name: 'App',
    data() {
        return {
            editando: true,
            showTutorial: true,
            titulo: '',
            ayudaTitulo: false,
            imagen: '',
            ayudaImagen: false,
            problema: '',
            ayudaProblema: false,
            solucion: '',
            ayudaSolucion: false,
            distractores: [''],
            ayudaDistractores: false,
            parametros: [],
            ayudaParametros: false,
            computos: [],
            ayudaComputos: false,
            parseado: {},

            mensajeImagen: 'Elige una imágen',
            errorTitulo: '',
            errorProblema: '',
            errorSolucion: ''
        }
    },
    components: {
        distractor: Distractor,
        parametro: Parametro,
        computo: Computo
    },
    computed: {
        imageCodeIfHas() {
            if (this.imagen != '') {
                return `<img style="display: block; margin-bottom: 16px;"  src="${this.imagen}">`
            } else {
                return ''
            }
        }
    },
    methods: {
        subirImagen(event) {
            const files = event.target.files;
            const formData = new FormData();

            this.mensajeImagen = 'Subiendo imagen...'

            var nombreImagen
            
            if (files.length > 0) {
                let file = files[0];
                formData.append('file', file)
                nombreImagen = Math.random().toString().substring(2) + '.' + file.name.split('.')[file.name.split('.').length - 1]
                formData.append('fileName', nombreImagen)
            }

            var thisVue = this

            axios.post('https://tiantian.io/upload.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(resultado => {
                if (resultado.data.error) {
                    thisVue.mensajeImagen = resultado.data.message
                } else {
                    thisVue.imagen = 'https://tiantian.io/uploads/' + nombreImagen
                    thisVue.mensajeImagen = 'Elige una imágen'
                }
            })
            .catch(() => {
                thisVue.mensajeImagen = 'Ups! Hubo un error al subirla'
            });
        },
        reinicializar() {
            this.errorTitulo = ''
            this.errorProblema = ''
            this.errorSolucion = ''

            this.editando = true
            this.titulo = ''
            this.imagen = ''
            this.problema = ''
            this.solucion = ''
            this.distractores = ['']
            this.parametros = []
            this.computos = []
        },
        chequear() {
            var todoOk = true;
            if (this.titulo == '') {
                todoOk = false;
                this.errorTitulo = 'El titulo no puede ser vacio.' 
            }
           if (this.problema == '') {
                todoOk = false;
                this.errorProblema = 'El problema no puede ser vacio.' 
            }
           if (this.solucion == '') {
                todoOk = false;
                this.errorSolucion = 'La solucion no puede ser vacia.' 
            }
            if (this.distractores.length > 0) {
                for (var i in this.distractores)
                    if (!this.$refs.distractores[i].esValido()) todoOk = false
            } else todoOk = false
            
            for (var t in this.parametros)
                if (!this.$refs.parametros[t].esValido()) todoOk = false
            
            for (var j in this.computos)
                if (!this.$refs.computos[j].esValido()) todoOk = false

            return todoOk
        },
        descargarEva() {
            if (this.chequear()) {
                var ejercicio = `
<?xml version="1.0" encoding="UTF-8"?>
<quiz>
    <question type="category">
        <category>
            <text>$course$/${this.titulo}</text>
        </category>
    </question>
    <question type="calculatedmulti">
        <name><text>${this.titulo}</text></name>
        <questiontext format="moodle_auto_format"><text><![CDATA[${this.imageCodeIfHas}${this.espaciarLatex(this.traducirSintaxis(this.problema))}]]></text></questiontext>
        <generalfeedback format="moodle_auto_format"><text/></generalfeedback>
        <defaultgrade>1.0000000</defaultgrade>
        <penalty>0.3333333</penalty>
        <hidden>0</hidden>
        <synchronize>0</synchronize>
        <single>1</single>
        <answernumbering>none</answernumbering>
        <shuffleanswers>1</shuffleanswers>
        <correctfeedback><text>Correcta.</text></correctfeedback>
        <partiallycorrectfeedback><text>Parcialmente correcto.</text></partiallycorrectfeedback>
        <incorrectfeedback><text>Incorrecto.</text></incorrectfeedback>'''
        <answer fraction="100">
            <text>${this.traducirSintaxis(this.solucion)}</text>
            <tolerance>0.01</tolerance>
            <tolerancetype>1</tolerancetype>
            <correctanswerformat>1</correctanswerformat>
            <correctanswerlength>2</correctanswerlength>
            <feedback format="moodle_auto_format"><text/></feedback>
        </answer>`
            
                this.distractores.forEach(distractor => {
                    ejercicio += `
        <answer fraction="0">
            <text>${this.traducirSintaxis(distractor)}</text>
            <tolerance>0.01</tolerance>
            <tolerancetype>1</tolerancetype>
            <correctanswerformat>1</correctanswerformat>
            <correctanswerlength>2</correctanswerlength>
            <feedback format="moodle_auto_format"><text/></feedback>
        </answer>`
                })
                
                ejercicio += `
                <dataset_definitions>
                `

                if (this.parametros.length == 0) {
                ejercicio += `
            <dataset_definition>
                <status><text>private</text></status>
                <name><text>dummy</text></name>
                <type>calculatedsimple</type>
                <distribution><text>uniform</text></distribution>
                <minimum><text>1</text></minimum>
                <maximum><text>10</text></maximum>
                <decimals><text>1</text></decimals>
                <itemcount>2</itemcount>
                <dataset_items>
                    <dataset_item>
                        <number>1</number>
                        <value>2</value>
                    </dataset_item>
                    <dataset_item>
                        <number>1</number>
                        <value>3</value>
                    </dataset_item>
                </dataset_items>
                <number_of_items>2</number_of_items>
            </dataset_definition>`
                } else {
                    this.parametros.forEach(parametro => {
                        ejercicio += `
                <dataset_definition>
                    <status><text>private</text></status>
                    <name><text>${parametro.nombre}</text></name>
                    <type>calculatedsimple</type>
                    <distribution><text>uniform</text></distribution>
                    <minimum><text>${parametro.esIntervalo? parametro.minimo : Math.min(parametro.conjunto)}</text></minimum>
                    <maximum><text>${parametro.esIntervalo? parametro.maximo : Math.max(parametro.conjunto)}</text></maximum>
                    <decimals><text>${parametro.decimales}</text></decimals>
                    <itemcount>${CANTIDAD_INSTANCIAS}</itemcount>
                    <dataset_items>`
                        for (let i = 0; i < CANTIDAD_INSTANCIAS; i++) {
                            ejercicio += `
                        <dataset_item>
                            <number>${i+1}</number>
                            <value>${parametro.esIntervalo? round(Math.random() * (parametro.maximo - parametro.minimo) + parametro.minimo, parametro.decimales) : parametro.conjunto[Math.floor(Math.random() * parametro.conjunto.length)]}</value>
                        </dataset_item>`
                        }

                        ejercicio += `
                    </dataset_items>
                    <number_of_items>${CANTIDAD_INSTANCIAS}</number_of_items>
                </dataset_definition>`
                    })
                }
                ejercicio += `
            </dataset_definitions>
        </question>
    </quiz>`
                this.createFile(this.titulo + '.xml', ejercicio)
            }
        },
        descargar() {
            if (this.chequear()) {
                var text = 'Título: ' + this.titulo + '\n'
                text += "Problema: " + this.problema + "\n"
                if (this.imagen != '') text += "Imagen: " + this.imagen + "\n"
                text += "Solución: " + this.solucion + "\n"

                text += '\n'

                this.distractores.forEach((distractor) => {
                    text += "Distractor: " + distractor + '\n'
                })

                text += '\n'

                this.parametros.forEach((parametro) => {
                    text += "Parametro: " + parametro.nombre + '\n'
                    if (parametro.esIntervalo) {
                        text += "Minimo: " + parametro.minimo + '\n'
                        text += "Maximo: " + parametro.maximo + '\n'
                        text += "Decimales: " + parametro.decimales + '\n\n'
                    } else {
                        text += "Conjunto: " + parametro.conjunto + '\n\n'
                    }
                })

                text += '\n'

                this.computos.forEach((computo) => {
                    text += "Cómputo: " + computo.nombre + '\n'
                    text += "Formula: " + computo.formula + "\n"
                    text += "Decimales: " + computo.decimales + "\n\n"	
                })
                this.createFile(this.titulo + '.txt', text)
            }
        },
        createFile(fileName, fileContent) {
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileContent));
            element.setAttribute('download', fileName);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        },
        cargarEjemplo(i) {
            var ejercicios = [
                'Titulo: Tipos de tiángulos\nProblema: Cuál es el tipo de triángulo que tiene todos sus tres lados iguales?\nSolución: Equilátero\nDistractor: Escaleno\nDistractor:Isóceles\n',
                'Titulo: Cálculo de reacciones en una viga apoyada\nImagen: https://tiantian.io/uploads/viga_pregunta_1.jpg\nProblema: Para la viga apoyada en \\(A\\) y en \\(B\\) de @L m de longitud que semuestra en la figura, calcular el valor de \\(R_A\\), la reacción en el apoyo \\(A\\).\nSolución: @correcta\nDistractor: @esRB\nDistractor: @noQ\nDistractor: @resultantedeqenmitadtramo\n\nParametro: a\nMínimo: 0.5\nMáximo: 1\nDecimales: 1\n\nParametro: b\nMínimo: 0.5\nMáximo: 1\nDecimales: 1\n\nParametro: Q\nConjunto: 200, 250, 300, 350\n\nParametro: q\nMínimo: 100\nMáximo: 200\nDecimales: 0\n\n\nComputo: correcta\nFormula: (q*(2*a*a+4*a*b+2*b*b)+Q*b)/(a+2*b)\nDecimales: 0\n\nComputo: noQ\nFormula: (q*(2*a*a+4*a*b+2*b*b))/(a+2*b)\nDecimales: 0\n\nComputo: esRB\nFormula: (Q*(a+b)+q*(2*a*b+2*b*b))/(a+2*b)\nDecimales: 0\n\nComputo: resultantedeqenmitadtramo\nFormula: (q*(a+b)*(a+2*b))/(a+2*b)\nDecimales: 0\n\nComputo: L\nFormula: 2*(a+b)\nDecimales: 0\n\n\n',
                'Titulo: Cálculo de cortante en viga apoyada volada\nImagen: https://tiantian.io/uploads/viga_pregunta_2_3.jpg\nProblema: En la viga de la figura los valores de los parámetros son \\(a = @a\\) \\(\\,m\\) y \\(q = @q\\) y \\(R_A=@RA\\). Para los \\(@i \\leq x < @s\\) la expresión del cortantees \\[V(x)=mx+n.\\] Hallar dicha expresión y dar el valor de \\(n\\).\nSolución: @correcta\nDistractor: @noRA\nDistractor: @puntualesporx\nDistractor: @sinpuntuales\n\nParametro: a\nMínimo: 0.5\nMáximo: 1\nDecimales: 1\n\nParametro: b\nMínimo: 0.5\nMáximo: 1\nDecimales: 1\n\nParametro: Q\nConjunto: 200, 250, 300, 350\n\nParametro: q\nMínimo: 100\nMáximo: 200\nDecimales: 0\n\nParametro: a\nConjunto: 0.5, 1, 1.5, 2, 2.5\n\nParametro: q\nConjunto: 100, 200, 300, 400, 500, 150, 250, 350, 450, 50\n\n\nComputo: correcta\nFormula: (q*(2*a*a+4*a*b+2*b*b)+Q*b)/(a+2*b)\nDecimales: 0\n\nComputo: noQ\nFormula: (q*(2*a*a+4*a*b+2*b*b))/(a+2*b)\nDecimales: 0\n\nComputo: esRB\nFormula: (Q*(a+b)+q*(2*a*b+2*b*b))/(a+2*b)\nDecimales: 0\n\nComputo: resultantedeqenmitadtramo\nFormula: (q*(a+b)*(a+2*b))/(a+2*b)\nDecimales: 0\n\nComputo: L\nFormula: 2*(a+b)\nDecimales: 0\n\nComputo: correcta\nFormula: q*(0.5+29*a/8)\nDecimales: 1\n\nComputo: noRA\nFormula: -2*q\nDecimales: 1\n\nComputo: puntualesporx\nFormula: a*q*(-2.5-29*a/8)\nDecimales: 1\n\nComputo: sinpuntuales\nFormula: 0\nDecimales: 0\n\nComputo: RA\nFormula: q*(2.5+29*a/8)\nDecimales: 2\n\nComputo: i\nFormula: a\nDecimales: 2\n\nComputo: s\nFormula: 3*a\nDecimales: 2\n',
                'Titulo: Cálculo de momento en viga apoyada volada\nImagen: https://tiantian.io/uploads/viga_pregunta_2_3.jpg\nProblema: En la viga de la figura los valores de los parámetros son \\(a=@a\\) \\(\\,m\\) y \\(q=@q\\) y \\(R_A=@RA\\). Para los \\(@i \\leq x < @s\\)  la expresión del momento flector es \\[M(x)=mx^2+nx+p.\\] Hallar dicha expresión y dar el valor de \\(m+n\\).\nSolución: @correcta\nDistractor: @noRA\nDistractor: @distribuida2qporxporx2\nDistractor: @distribuidasporxporx2\n\nParametro: a\nMínimo: 0.5\nMáximo: 1\nDecimales: 1\n\nParametro: b\nMínimo: 0.5\nMáximo: 1\nDecimales: 1\n\nParametro: Q\nConjunto: 200, 250, 300, 350\n\nParametro: q\nMínimo: 100\nMáximo: 200\nDecimales: 0\n\nParametro: a\nConjunto: 0.5, 1, 1.5, 2, 2.5\n\nParametro: q\nConjunto: 100, 200, 300, 400, 500, 150, 250, 350, 450, 50\n\nParametro: a\nConjunto: 0.5, 1, 1.5, 2, 2.5\n\nParametro: q\nConjunto: 100, 200, 300, 400, 500, 150, 250, 350, 450, 50\n\n\nComputo: correcta\nFormula: (q*(2*a*a+4*a*b+2*b*b)+Q*b)/(a+2*b)\nDecimales: 0\n\nComputo: noQ\nFormula: (q*(2*a*a+4*a*b+2*b*b))/(a+2*b)\nDecimales: 0\n\nComputo: esRB\nFormula: (Q*(a+b)+q*(2*a*b+2*b*b))/(a+2*b)\nDecimales: 0\n\nComputo: resultantedeqenmitadtramo\nFormula: (q*(a+b)*(a+2*b))/(a+2*b)\nDecimales: 0\n\nComputo: L\nFormula: 2*(a+b)\nDecimales: 0\n\nComputo: correcta\nFormula: q*(0.5+29*a/8)\nDecimales: 1\n\nComputo: noRA\nFormula: -2*q\nDecimales: 1\n\nComputo: puntualesporx\nFormula: a*q*(-2.5-29*a/8)\nDecimales: 1\n\nComputo: sinpuntuales\nFormula: 0\nDecimales: 0\n\nComputo: RA\nFormula: q*(2.5+29*a/8)\nDecimales: 2\n\nComputo: correcta\nFormula: q*(-0.5+53*a/8)\nDecimales: 1\n\nComputo: noRA\nFormula: 3*q*(a-1)\nDecimales: 1\n\nComputo: distribuida2qporxporx2\nFormula: a*q*(-2.5-29*a/8)\nDecimales: 1\n\nComputo: RA\nFormula: q*(2.5+29*a/8)\nDecimales: 2\n\nComputo: i\nFormula: 3*a\nDecimales: 1\n\nComputo: s\nFormula: 5*a\nDecimales: 1\n\nComputo: distribuidasporxporx2\nFormula: q*(-0.5+5*a/8)\nDecimales: 2\n',
                'Titulo: Integrales indefinidas\nImagen: https://tiantian.io/uploads/optimizacion.png\nProblema: La función \\[F(x)= \\int_{-1}^{x}{(|1-x|-x)dx}\\] admite para \\(x \\leq @menorigual\\) una expresión \\(F(x)=ax^2+bx + c\\), en forma de un polinomio de grado menor o igual a 2.\nDeterminar la suma a + b + c de los coeficientes de ese polinomio.\nSolución: @correcto\nDistractor: @distractor_a \nDistractor: @distractor_b \nDistractor: Ningúna de las demás es correcta\nParámetro: limiteinferior\nMáximo: -1\nMinimo: -10\nDecimales:2\nParámetro: constanteintegracion\nMáximo: 20\nMinimo: 1\nDecimales:2\nParámetro: menorigual\nMáximo: 9\nMinimo: 3\nComputo: correcto\nFórmula: limiteinferior*constanteintegracion-menorigual\nDecimales:1\nComputo: distractor_a\nFórmula: limiteinferior*constanteintegracion\nDecimales: 1\nComputo: distractor_b\nFórmula: limiteinferior*menorigual\nDecimales: 1'
            ]
            var parseado = this.parse(ejercicios[i].split("\n"));
            this.mostrar_ejercicio(parseado);
        },
        espaciarLatex(text) {
            return text.replace('\\[', '<p style="text-align: center; padding-top: 16px; padding-bottom:16px;">\\[').replace('\\]', '\\]</p>')
        },
        traducirSintaxis(texto) {
           // parametros
            this.parametros.forEach(parametro => {
                let regexParametro = new RegExp(SIMBOLO_VAR + parametro.nombre + '(\\W|$)', 'g');
                texto = texto.replace(regexParametro, '{' + parametro.nombre + '}$1')
            })

            // formulas
            this.computos.forEach(computo => {
                let formula_parcial = computo.formula
                
                this.parametros.forEach(paramentro => {
                    let regexComputo = new RegExp('(\\W|^)' + paramentro.nombre + '(\\W|$)', 'g');
                    formula_parcial = formula_parcial.replace(regexComputo, '$1{' + paramentro.nombre + '}$2')
                })
                while (formula_parcial.includes('{{'))
                    formula_parcial = formula_parcial.replace('{{', '{').replace('}}', '}')
                let formula_eva = `{= round(${formula_parcial}, ${computo.decimales})}` // convert_eva_operators
                let regexComputoFinal = new RegExp(SIMBOLO_VAR + computo.nombre + '(?!\\w])', 'g');
                texto = texto.replace(regexComputoFinal, formula_eva)
            })

            return texto
        },
        mostrar_ejercicio(ejercicio) {
            this.reinicializar()

            this.parseado = ejercicio[0]
            this.titulo = ejercicio.titulo[0];
            if (ejercicio.imagen) {
                console.log(ejercicio.imagen)
                this.imagen = ejercicio.imagen[0]
            } else {
                this.imagen = ''
            }
            this.problema = ejercicio.problema[0];
            this.solucion = ejercicio.solucion[0];
            
            this.distractores = []

            if (ejercicio.distractor)
                ejercicio.distractor.forEach(distractor => {
                    this.distractores.push(distractor)
                })
            
            if (ejercicio.parametro)
                ejercicio.parametro.forEach(parametro => {
                    if ('conjunto' in parametro) {
                        this.parametros.push({
                            esIntervalo: false,
                            nombre: parametro.base[0],
                            minimo: null, 
                            maximo: null, 
                            decimales: 2,
                            conjunto: parametro.conjunto[0].split(',').map(literal => parseFloat(literal))
                        })
                    } else {
                        this.parametros.push({
                            esIntervalo: true,
                            nombre: parametro.base[0], 
                            minimo: parseFloat(parametro.minimo[0]), 
                            maximo: parseFloat(parametro.maximo[0]), 
                            decimales: 'decimales' in parametro? parseInt(parametro.decimales[0]) : 2,
                            conjunto: []
                        })
                    }
                })

            if (ejercicio.computo)
                ejercicio.computo.forEach(computo => {
                    this.computos.push({
                        nombre: computo.base[0], 
                        formula: computo.formula[0], 
                        decimales: 'decimales' in computo? parseInt(computo.decimales[0]) : 2
                    })
                })

            var thisVue = this
            this.$nextTick(() => {
                thisVue.renderizar()
            })
            
        },
        splited(keys, text_array) {
            // base case
            if (Object.keys(keys).length == 0) {
                return text_array.join("\n");
            }

            // iterative caise
            var spliting = {};
            var last_key = null;
            var last_value = [];

            for (var i = 0; i < text_array.length; i++) {
                var line = text_array[i]
                var valores = this.keyValue(Object.keys(keys), line);
                var key = valores["key"];
                var value = valores["value"];
                if (key){
                    if (last_key){
                        var new_dict = keys[last_key]
                        // new_dict[last_key] = {}
                        if (spliting[last_key]) {
                            spliting[last_key].push(this.splited(new_dict, last_value))
                        } else {
                            spliting[last_key] = [this.splited(new_dict, last_value)]
                        }
                    } else {
                        if (last_value.length > 0) {
                            spliting["base"] = [this.splited({}, last_value)]
                        }
                    }
                    last_key = key
                    last_value = [value]
                } else {
                    last_value.push(value)
                }
            }
            if (last_key){
                new_dict = keys[last_key]
                // new_dict[last_key] = {}
                if (spliting[last_key]) {
                    spliting[last_key].push(this.splited(new_dict, last_value))
                } else {
                    spliting[last_key] = [this.splited(new_dict, last_value)]
                }
            }
            return spliting
        },
        parse(text_array) {
            var keys = {
                'titulo': {},
                'imagen': {},
                'comentario': {},
                'problema': {},
                'solucion': {},
                'distractor': {},
                'parametro': {'minimo': {}, 'maximo': {}, 'decimales': {}, 'conjunto': {}}, 
                'computo': {'formula': {}, 'decimales': {}}
            };
            
            return this.splited(keys, text_array);
        },
        keyValue(keys, line) {
            var key = false;
            var value = null;
            var splited = line.split(':');
            if (splited.length > 1 && keys.indexOf(this.normalized(splited[0])) >= 0) {
                key = this.normalized(splited[0])
                value = splited.splice(1).join(':').trim();
            } else {
                value = line;
            }
            return {"key": key, "value": value};
        },
        normalized(text) {
            return text.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        },
        renderizar() {
            if (this.problema != '') {
                this.editando = false;
                this.$refs.problemaVisual.innerText = this.problema
            }
        },
         aplanar(){
            this.editando = true
            var input = this.$refs.problemaInput
            this.$nextTick(() => {
                input.focus()
            })
        },
        fileLoaded(event) {
            var fileInput = event.target
            var file = fileInput.files[0];
            var textType = /text.*/;

            if (file.type.match(textType)) {
                var reader = new FileReader();
                var vueThis = this
                reader.onload = function() {
                    var parseado = vueThis.parse(reader.result.split("\n"));
                    vueThis.mostrar_ejercicio(parseado);
                }

                reader.readAsText(file);    
            } else {
                alert("Archivo no sorportado!")
            }
        },
        tituloValido() {
            if (this.titulo != '') this.errorTitulo = '';
        },
        problemaValido() {
            if (this.problema != '') this.errorProblema = '';
        },
        solucionValida() {
            if (this.solucion != '') this.errorSolucion = '';
        }
    }
}
</script>

<style scoped>


    footer {
        font-size: 1em;
        color: gray;
        font-style: italic;
    }

    .out {
        width: 100%;
        min-height: 13pt;
        border-bottom: 2px solid #7f8c8d;
        padding: 10pt;
    }

</style>