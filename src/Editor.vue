<template>
    <div v-cloak @drop.prevent="addFile" @dragover.prevent @dragenter.prevent="dragEnter" @dragleave.prevent="dragLeave">
        <nav style="background-color: #f8f9fa">
            <div class="container p-2">
                <div class="row">
                    <div class="col-12 col-md-6">
                        <router-link to="/">
                            <svg class="bi bi-chevron-left" width="2em" height="2em" viewBox="0 0 16 16" fill="#007bff" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                        </svg>
                        </router-link>
                        <img :src="require('./img/main_logo.png')" style="height:10vh;" alt="main logo">
                    </div>
                    <div class="col-12 col-md-6 my-auto py-2">
                        <div style="display: inline-block" class="dropdown float-right mr-2">
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
        <div class="drop-sign" v-if="dragCount != 0">
            <svg width="4em" height="4em" viewBox="0 0 16 16" class="bi bi-download" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M.5 8a.5.5 0 0 1 .5.5V12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8.5a.5.5 0 0 1 1 0V12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8.5A.5.5 0 0 1 .5 8z"/>
                <path fill-rule="evenodd" d="M5 7.5a.5.5 0 0 1 .707 0L8 9.793 10.293 7.5a.5.5 0 1 1 .707.707l-2.646 2.647a.5.5 0 0 1-.708 0L5 8.207A.5.5 0 0 1 5 7.5z"/>
                <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0v-8A.5.5 0 0 1 8 1z"/>
            </svg>
            <p>Suelta el archivo para cargarlo</p>
        </div>
        <div class="container">
            <b-sidebar right id="sidebar-1" title="Vista previa" shadow>
                <div class="px-3 py-2">
                    <div v-show="sinErrores">
                        <b-img class="mb-3" v-if="imagen != ''" :src="imagen" fluid thumbnail></b-img>
                        <div class="mb-4" ref="problemaEjemplo" v-katex:auto></div>
                        <p><input type="radio" checked=true disabled> {{ solucion_preview }} <b-badge>Solución</b-badge></p>
                        <p v-for="(distractor, indice) in distractores_preview" :key="indice"><input type="radio" disabled> {{ distractor }}</p>
                    </div>
                    <div v-show="!sinErrores">
                        <img class="card-img pl-5 pr-5 pt-5 pb-3" :src="require('./img/error_preview.png')">
                        <p><strong>Es necesario actualizar y que la especificación no contenga errores.</strong></p>
                    </div>
                    <button class="btn btn-primary" @click="preview">
                        <svg width="1.4em" height="1.4em" viewBox="0 0 16 16" class="bi bi-arrow-counterclockwise" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M12.83 6.706a5 5 0 0 0-7.103-3.16.5.5 0 1 1-.454-.892A6 6 0 1 1 2.545 5.5a.5.5 0 1 1 .91.417 5 5 0 1 0 9.375.789z"/>
                            <path fill-rule="evenodd" d="M7.854.146a.5.5 0 0 0-.708 0l-2.5 2.5a.5.5 0 0 0 0 .708l2.5 2.5a.5.5 0 1 0 .708-.708L5.707 3 7.854.854a.5.5 0 0 0 0-.708z"/>
                        </svg>
                        Actualizar
                    </button>
                </div>
            </b-sidebar>
            <div v-if="contieneErrores" @click="contieneErrores = 0" class="alert alert-danger" role="alert">
                <strong>La especificación del ejercicio contiene {{ contieneErrores }} {{ contieneErrores == 1? "error" : "errores" }}!</strong><br>
                <ul class="mt-3" v-if="mensajeErrores.length > 0">
                    <li v-for="(error, index) in mensajeErrores" :key="index">{{ error }}</li>
                </ul>
                Corrige todos los errores para poder proceder a descargar. Vas a ver los campos con error aquí o marcados en rojo en el campo respectivo.

            </div>
            <div  style="text-align: center;" class="mt-2">
            <b-button size="sm" variant="light" pill v-b-toggle.sidebar-1>
                <svg width="0.8em" height="0.8em" viewBox="0 0 16 16" class="bi bi-search" fill="black" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                    <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                </svg>
                Vista Previa
            </b-button>
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
                Imagen opcional que se muestra arriba del texto problema. Dado que es una imágen estática recomendamos nombrar los parámetros por nombre y no un valor que podría variar.<br><br>
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
                Se puede usar una variable antes definida (parámetro o cómputo) antecediendolo por un símbolo "@" (ejemplo: @largo).<br><br>
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
                Por limitaciones actuales del EVA en las opciones de ejercicios parametrizados no se admite el uso de LaTeX (Solución ni Distractor)<br><br>
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
                Por limitaciones actuales del EVA en las opciones de ejercicios parametrizados no se admite el uso de LaTeX (Solución ni Distractor)<br><br>
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
            <draggable v-model="parametros" group="parametro" @start="drag=true" @end="drag=false">
                <parametro 
                    v-for="(parametro, indice) in parametros" 
                    @eliminar="parametros.splice(indice, 1)"
                    v-model="parametros[indice]"
                    ref="parametros"
                    :key="indice"
                />
            </draggable>
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
            <draggable v-model="computos" group="computo" @start="drag=true" @end="drag=false">
                <computo 
                    v-for="(computo, indice) in computos" 
                    v-model="computos[indice]"
                    @eliminar="computos.splice(indice, 1)"
                    ref="computos"
                    :key="indice"/>
            </draggable>
            <div v-if="ayudaComputos" @click="ayudaComputos = false" class="alert alert-primary" role="alert">
                Los <strong>cómputos</strong> permiten introducir cálculos complejos a los ejercicios. El cómputo se instancia en base a la especificación de su fórmula y con la cantidad de decimales especificados.<br><br>
                Se pueden utilizar numeros, parámetros, cómputos antes definidos, operadores y fórmulas matematicas (la lista exhaustiva se pueden conultar al final de la <a target="_blank" href="https://docs.google.com/document/d/e/2PACX-1vRGg1dQgZehG6qdyqndAajXpSiR3Ke0ncQDssaZgzz9vRTT_7xCIG0CrSTL8cgtu_6MvjMUQ_AWIwHY/pub">Guía de usuario</a>).
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
    <footer style="background-color:#f8f9fa" class= "pt-4 mt-5">
        <div class="container">
            <div class="row">
                <div class="col-12 col-lg-6 pb-5">
                    <h4>Ejercicio Estudio v 0.8</h4>
                    <p>Este software surge como una colaboración entre la Facultad de Ingeniería y la FADU para generar ejericicos parametrizados.</p>
                    <p>Dedicado a <a href="https://www.youtube.com/watch?v=E8WFA_B_Ci4&fbclid=IwAR3PHGQ4qZYrji1UCK-VXQVhE8zVH5aEZzN6-DHoihrtUR1QUfANFWsWQXk">Omar Gil</a>, precursor de este proyecto.</p>
                    <a href="http://udelar.edu.uy/portal/">Universidad de la Repúbica</a> 2020 ©
                </div>
                <div class="col-4 col-lg-2 pb-5">
                    <h5>Resursos</h5>
                    <a target="_blank" href="https://docs.google.com/document/d/e/2PACX-1vRGg1dQgZehG6qdyqndAajXpSiR3Ke0ncQDssaZgzz9vRTT_7xCIG0CrSTL8cgtu_6MvjMUQ_AWIwHY/pub">Guia de usuario</a><br>
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
const NAMESPACING = "EE_PAR_"

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

function parsearVariables(campos) {
    var variable_re = /@[\w]+/g
    var variables_usadas = []
    campos.forEach((campo) => {
        let matches = campo.match(variable_re)
        if (matches) variables_usadas = variables_usadas.concat(matches)
    })
    return new Set(variables_usadas.map((el) => el.substr(1))) // les saco el # inicial y las transformo en un set
}

import draggable from 'vuedraggable'

export default {
    name: 'App',
    data() {
        return {
            editando: true,
            mostrarTutorial: true,
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

            solucion_preview: '',
            distractores_preview: [],

            mensajeImagen: 'Elige una imágen',
            errorTitulo: '',
            errorProblema: '',
            errorSolucion: '',
            contieneErrores: 0,
            mensajeErrores: [],

            sinErrores: false,
            dragCount: 0
        }
    },
    created() {
        this.agregarFunciones()
    },
    components: {
        draggable,
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
        dragLeave() {
            this.dragCount += 1
        },
        dragEnter() {
            this.dragCount -= 1
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
        addFile(e) {
            this.dragCount = 0
            let droppedFiles = e.dataTransfer.files;
            if(!droppedFiles) return;
            var file = droppedFiles[0];

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
            this.contieneErrores = 0
            this.mensajeErrores = []

            this.solucion_preview = ''
            this.distractores_preview = []

            this.sinErrores = false

        },
        chequear() {
            var cantidadErrores = 0
            this.mensajeErrores = []

            // basic_errors
            if (this.titulo == '') {
                cantidadErrores += 1;
                this.errorTitulo = 'El titulo no puede ser vacio.' 
            }
           if (this.problema == '') {
                cantidadErrores += 1;
                this.errorProblema = 'El problema no puede ser vacio.' 
            }
           if (this.solucion == '') {
                cantidadErrores += 1;
                this.errorSolucion = 'La solucion no puede ser vacia.' 
            }
            if (this.distractores.length > 0) {
                for (var i in this.distractores)
                    if (!this.$refs.distractores[i].esValido()) cantidadErrores += 1
            } else cantidadErrores += 1
            
            for (var t in this.parametros)
                if (!this.$refs.parametros[t].esValido()) cantidadErrores += 1
            
            for (var j in this.computos)
                if (!this.$refs.computos[j].esValido()) cantidadErrores += 1

            if (cantidadErrores == 0) {
                this.parametros.forEach(parametro => {
                    var value
                    if (parametro.esIntervalo) {
                        value = round((parametro.maximo - parametro.minimo)/2 + parametro.minimo, parametro.decimales) 
                    } else {
                        value = parametro.conjunto[0]
                    }
                    eval("window." + parametro.nombre + " = " + value)
                })

                var indice = -1
                this.computos.forEach(computo => {
                    indice += 1
                    try {
                        var value = round(eval(computo.formula), computo.decimales)
                        if (isNaN(value)) throw Error('La fórmula contiene un error. Definiste bien las funciones con sus respectivos parametros? Perdon por no poder ser mas especifico!')
                        console.log(computo.nombre + " = " + value)
                        eval("window." + computo.nombre + " = " + value)
                    } catch(err) {
                        // aaa is not defined
                        // Unexpected token ')'
                        // Invalid or unexpected token
                        let noDefinido = /([^ ]+) is not defined/
                        let tokenInesperadoDetalle = /Unexpected token '([^']+)'/
                        let tokenInesperado = 'Invalid or unexpected token'
                        var mensajeError = err.message
                        let resultado = err.message.match(noDefinido)
                        if (resultado) {
                            mensajeError = "La variable '" + resultado[1] + "' no está definida. Recuerda que debes definir el parámetro o el cómputo antes de usarlo."
                        } else {
                            let resultado = err.message.match(tokenInesperadoDetalle)
                            if (resultado) {
                                mensajeError = "Estas seguro que el símbolo '" + resultado[1] + "' esta bien colocado?"
                            } else {
                                if (tokenInesperado == err.message) {
                                    mensajeError = "Hay un simbolo inesperado! Resuerda que en la formula no debes anteponer el @ a las variables. Solo se antepone en la sección Problema, Solucion y Distractores."
                                }
                            }
                        }
                        this.$refs.computos[indice].setearErrorParseo(mensajeError)
                        cantidadErrores += 1
                    }
                })

                // TODO: Todas las variables definidas son usadas
                var ya_usadas = parsearVariables([this.problema, this.solucion, ...this.distractores])
                var tienen_que_aparecer = new Set()
                
                this.parametros.map((par) => {
                    if (!ya_usadas.has(par.nombre)) tienen_que_aparecer.add(par.nombre)
                })

                this.computos.map((comp) => {
                    tienen_que_aparecer.forEach((nombre_var) => {
                        if (comp.formula.includes(nombre_var)) tienen_que_aparecer.delete(nombre_var)
                    })
                    if (!ya_usadas.has(comp.nombre)) tienen_que_aparecer.add(comp.nombre)
                })

                cantidadErrores += tienen_que_aparecer.size
                tienen_que_aparecer.forEach((noUtilizada) => {
                    this.mensajeErrores.push("La variable (parámetro o cómputo) '" + noUtilizada + "' se ha definido pero no lo has utilizado.")
                })

                // TODO: Todas las variables usadas estan definidas
                var variables_usadas = parsearVariables([this.problema, this.solucion, ...this.distractores])
                var variables_definidas = this.parametros.map((par) => par.nombre).concat(this.computos.map((comp) => comp.nombre))

                variables_definidas.forEach((el) => { // sustraigo las variables definidas, quedan las no definidas
                    variables_usadas.delete(el)
                })

                cantidadErrores += variables_usadas.size
                variables_usadas.forEach((noDefinida) => {
                    this.mensajeErrores.push("La variable (parámetro o cómputo) '" + noDefinida + "' la has usado pero no la has definido!")
                })
            }

            this.sinErrores = cantidadErrores == 0
            return cantidadErrores
        },
        agregarFunciones() {
            

            window.pow = (base, exponente) => {
                var resultado = Math.pow(base, exponente)
                if (isNaN(resultado)) throw Error('Los argumentos de \'pow\' no son correctos. Recuerda que debes proporcionar la base y el exponente. Ejemplo: pow(4,2) que es igual a 16')
                else return resultado
            }
            window.abs = Math.abs
            window.pi = () => Math.PI
            window.sqrt = Math.sqrt
            window.sin = Math.sin
            window.tan = Math.tan
            window.atan = Math.atan
            window.atanh = Math.tanh
            window.atanh2 = Math.atanh2
            window.cos = Math.cos
            window.cosh = Math.cosh
            window.acos = Math.acos
            window.acosh = Math.acosh
            window.asin = Math.asin
            window.asinh = Math.asinh
            window.asinh = Math.asinh
            window.sinh = Math.sinh
            window.max = Math.max
            window.min = Math.min
            window.floor = Math.floor
            window.ceil = Math.ceil
            window.rand = Math.random
            window.octdec = (numero) => parseInt(numero, 8)
            window.bindec = (numero) => parseInt(numero, 2)
            window.decbin = (base10) => parseInt((base10).toString(2))
            window.decoct = (base10) => parseInt((base10).toString(8))
            window.deg2rad = (degrees) => degrees * (Math.PI/180)
            window.rad2deg = (radians) => radians * (180/Math.PI)
            window.round = (base, decimales) => Math.round(base * Math.pow(10, decimales)) / Math.pow(10, decimales)
            window.log = Math.log
            window.log1p = Math.log1p
            window.log10 = Math.log10
            window.exp = Math.exp
            window.expm1 = Math.expm1
            window.fmod = function (x, y) {
                //  discuss at: https://locutus.io/php/fmod/
                // original by: Onno Marsman (https://twitter.com/onnomarsman)
                //    input by: Brett Zamir (https://brett-zamir.me)
                // bugfixed by: Kevin van Zonneveld (https://kvz.io)
                //   example 1: fmod(5.7, 1.3)
                //   returns 1: 0.5

                var tmp
                var tmp2
                var p = 0
                var pY = 0
                var l = 0.0
                var l2 = 0.0

                tmp = x.toExponential().match(/^.\.?(.*)e(.+)$/)
                p = parseInt(tmp[2], 10) - (tmp[1] + '').length
                tmp = y.toExponential().match(/^.\.?(.*)e(.+)$/)
                pY = parseInt(tmp[2], 10) - (tmp[1] + '').length

                if (pY > p) {
                    p = pY
                }

                tmp2 = (x % y)

                if (p < -100 || p > 20) {
                    // toFixed will give an out of bound error so we fix it like this:
                    l = Math.round(Math.log(tmp2) / Math.log(10))
                    l2 = Math.pow(10, l)

                    return (tmp2 / l2).toFixed(l - p) * l2
                } else {
                    return parseFloat(tmp2.toFixed(-p))
                }
            }
        },
        preview() {
            this.contieneErrores = this.chequear()
            if (this.contieneErrores == 0) {
                this.parametros.forEach(parametro => {
                    var valor_parametro
                    if (parametro.esIntervalo)
                        valor_parametro = valor_parametro = round(Math.random() * (parametro.maximo - parametro.minimo) + parametro.minimo, parametro.decimales) 
                    else
                        valor_parametro = parametro.conjunto[Math.floor(Math.random() * parametro.conjunto.length)]
                    eval("window." + parametro.nombre + " = " + valor_parametro)
                })

                this.computos.forEach(computo => {
                    var valor_computo = round(eval(computo.formula), computo.decimales)
                    eval("window." + computo.nombre + " = " + valor_computo)
                        
                })
                var problema_preview = this.problema
                var solucion_preview = this.solucion
                var distractores_preview = []
                this.distractores.forEach((distractor) => distractores_preview.push(distractor))

                this.parametros.forEach(parametro => {
                    let regexParametro = new RegExp(SIMBOLO_VAR + parametro.nombre + '(\\W|$)', 'g');
                    problema_preview = problema_preview.replace(regexParametro, eval(parametro.nombre) + '$1')
                    solucion_preview = solucion_preview.replace(regexParametro, eval(parametro.nombre) + '$1')
                    distractores_preview = distractores_preview.map( (distractor) => distractor.replace(regexParametro, eval(parametro.nombre) + '$1'))
                
                })
                this.computos.forEach(computo => {
                    let regexComputo = new RegExp(SIMBOLO_VAR + computo.nombre + '(\\W|$)', 'g');
                    problema_preview = problema_preview.replace(regexComputo, eval(computo.nombre) + '$1')
                    solucion_preview = solucion_preview.replace(regexComputo, eval(computo.nombre) + '$1')
                    distractores_preview = distractores_preview.map( (distractor) => distractor.replace(regexComputo, eval(computo.nombre) + '$1'))
                })
                this.$refs.problemaEjemplo.innerText = problema_preview
                this.solucion_preview = solucion_preview    
                this.distractores_preview = distractores_preview    

                this.$forceUpdate();
            }
        },
        descargarEva() {
            this.contieneErrores = this.chequear()
            if (this.contieneErrores == 0) {

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
                    <name><text>${NAMESPACING + parametro.nombre}</text></name>
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
            this.contieneErrores = this.chequear() 
            if (this.contieneErrores == 0) {
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
                texto = texto.replace(regexParametro, '{' + NAMESPACING + parametro.nombre + '}$1')
            })

            // formulas
            this.computos.forEach(computo => {
                let formula_parcial = computo.formula
                
                this.parametros.forEach(paramentro => {
                    let regexComputo = new RegExp('(\\W|^)' + paramentro.nombre + '(?=\\W|$)', 'g');
                    formula_parcial = formula_parcial.replace(regexComputo, '$1{' + NAMESPACING + paramentro.nombre + '}')
                })
                while (formula_parcial.includes('{{'))
                    formula_parcial = formula_parcial.replace('{{', '{').replace('}}', '}')
                let formula_eva = `{= round(${formula_parcial}, ${computo.decimales})}` // convert_eva_operators
                let regexComputoFinal = new RegExp(SIMBOLO_VAR + computo.nombre + '(\\W|$)', 'g');
                texto = texto.replace(regexComputoFinal, formula_eva + '$1')
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

    .btn-circle.btn-xl {
        width: 70px;
        height: 70px;
        padding: 10px 16px;
        border-radius: 35px;
        font-size: 24px;
        line-height: 1.33;
    }

    .btn-circle {
        width: 30px;
        height: 30px;
        padding: 6px 0px;
        border-radius: 15px;
        text-align: center;
        font-size: 12px;
        line-height: 1.42857;
    }

    .drop-sign {
        font-size: 20px;
        padding-bottom: 20pt;
        padding-top: 20pt;
        text-align: center;
        background-color: #e9ecef;
    }

    .drop-sign p {
        margin-top: 15pt;
    }


</style>