<template>
    <div>
        <div class="card mb-3">
            <div class="card-header">
                <div class="pb-3">Parámetro
                    <svg @click="$emit('arriba')" width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-arrow-up ml-2" fill="#007bff" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
                        <path fill-rule="evenodd" d="M7.646 2.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8 3.707 5.354 6.354a.5.5 0 1 1-.708-.708l3-3z"/>
                    </svg>
                    <svg @click="$emit('abajo')" width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-arrow-down" fill="#007bff" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M4.646 9.646a.5.5 0 0 1 .708 0L8 12.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z"/>
                        <path fill-rule="evenodd" d="M8 2.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V3a.5.5 0 0 1 .5-.5z"/>
                    </svg>
                    <button @click="$emit('eliminar');" class="btn btn-outline-danger btn-sm float-right">Eliminar</button>
                </div>
                <ul class="nav nav-tabs card-header-tabs">
                <li class="nav-item">
                    <span class="nav-link" @click="value.esIntervalo=true" :class="{active: value.esIntervalo}">Intervalo</span>
                </li>
                <li class="nav-item">
                    <span class="nav-link" @click="value.esIntervalo=false" :class="{active: !value.esIntervalo}">Conjunto</span>
                </li>
                </ul>
            </div>
            <div v-if="value.esIntervalo" class="card-body">
                <div v-if="value.esIntervalo" class="row">
                    <div class="form-group col-12 col-lg-2">
                        <label for="minimo-computo">Mínimo</label>
                        <div class="input-group">
                        <input 
                        :class="{'is-invalid': errorMinimo != ''}" 
                        @keyup="errorMinimo = ''"
                        type="number" class="form-control" id="minimo-computo" v-model.number="value.minimo">
                        <div class="input-group-append">
                            <span class="input-group-text" id="basic-addon1">&le;</span>
                        </div>
                        </div>
                        <div :style="{display: 'block'}" class="invalid-feedback">
                                {{ errorMinimo }}
                            </div>
                    </div>
                    <div class="form-group col-12 col-lg-5">
                        <label for="formula">Nombre</label>
                        <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">@</span>
                        </div>
                        <input 
                        :class="{'is-invalid': errorNombre != ''}" 
                        @keyup="errorMaximo = ''"
                        type="text" class="form-control" key="nombre" id="formula" v-model.trim="value.nombre">
                        </div>
                        <div :style="{display: 'block'}" class="invalid-feedback">
                            {{ errorNombre }}
                        </div>
                    </div>
                    <div class="form-group col-12 col-lg-2">
                        <label for="maximo-computo">Máximo</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">&le;</span>
                            </div>
                            <input 
                                :class="{'is-invalid': errorMaximo != ''}" 
                                @keyup="errorMaximo = ''"
                                type="number" 
                                class="form-control" 
                                id="maximo-computo" 
                                v-model.number="value.maximo"
                            >
                        </div>
                        <div :style="{display: 'block'}" class="invalid-feedback">
                            {{ errorMaximo }}
                        </div>
                    </div>
                    <div class="form-group col-12 col-lg-3">
                        <label for="decimales">Decimales</label>
                        <select id="decimales" class="form-control" v-model.number="value.decimales">
                            <option value="0">0 decimales</option>
                            <option value="1">1 decimal</option>
                            <option value="2">2 decimales</option>
                            <option value="3">3 decimales</option>
                            <option value="4">4 decimales</option>
                        </select>
                    </div>
                </div>
                  <div v-if="errorTamanio" class="alert alert-danger" role="alert">
                        El valor minimo debe ser menor al maximo.
                        </div>
            </div>
            <div v-else class="card-body">
                <div class="row">
                    <div class="form-group col-12 col-lg-6">
                        <label for="solucion">Nombre</label>
                        <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">@</span>
                        </div>
                        <input 
                        :class="{'is-invalid': errorNombre != ''}" 
                        @keyup="errorNombre = ''"
                        type="text" class="form-control" id="nombre-computo" key="nombre" v-model="value.nombre">
                        </div>
                        <div :style="{display: 'block'}" class="invalid-feedback">
                            {{ errorNombre }}
                        </div>
                    </div>
                    <div class="form-group col-12 col-lg-6">
                        <label for="solucion">Nuevo valor</label>
                        <div class="input-group">
                        <input ref="agregarConjunto" @keydown.enter="agregarAConjunto" type="number" class="form-control">
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary" @click="agregarAConjunto" type="button">Agregar</button>
                        </div>
                        </div>
                    </div>
                </div>
                <div v-if="value.conjunto.length > 0" class="btn-group" role="group">
                    <button v-for="(elemento, indice) in value.conjunto" @click="value.conjunto.splice(indice, 1)" :key="indice" type="button" class="btn btn-outline-secondary" data-toggle="tooltip" data-placement="top" title="Tooltip on top">{{ elemento }}</button>
                </div>
                <div v-else class="alert alert-danger" role="alert">
                        Se debe al menos agregar un elemento al conjunto.
                </div>

            </div>
        </div>
    </div>
</template>

<script>
var NOMBRES_RESERVADOS = ['break', 'case', 'catch', 'continue', 'debugger', 'default', 'delete', 'do', 'else', 'finally', 'for', 'function', 'if', 'in', 'instanceof', 'new', 'return', 'switch', 'this', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'with', 'class', 'const', 'enum', 'export', 'extends', 'import', 'super', 'implements', 'interface', 'let', 'package', 'private', 'protected', 'public', 'static', 'yield', 'null', 'true', 'false']
var NOMBRE_VAR_LARGO_MAX = 24
export default {
    props: ['value'],
    data() {
        return {
            errorMinimo: '',
            errorNombre: '',
            errorMaximo: '',
            errorTamanio: false
        }
    },
    methods: {
        reset() {
            this.errorMinimo =  ''
            this.errorNombre =  ''
            this.errorMaximo =  ''
            this.errorTamanio = false
        },
        esValido() {
            var todoOk = true
            if (this.value.minimo == '') {
                this.errorMinimo = 'Se debe asignar una cota inferior.'
                todoOk = false
            }
            if (this.value.nombre == '') {
                this.errorNombre = 'Se debe asignar un nombre al parametro.'
                todoOk = false
            } else {
                if (this.value.nombre.length > NOMBRE_VAR_LARGO_MAX) {
                    todoOk = false
                    this.errorNombre = `El nombre del parámetro no puede tener más de ${NOMBRE_VAR_LARGO_MAX} carácteres. Notar que el nombre de cómputo no tiene esta restricción.`
                } else {
                    if (!this.value.nombre.match(/^[a-zA-Z][a-zA-Z0-9]*$/)) {
                        todoOk = false
                        this.errorNombre = 'Los nombres solo pueden estar formado por caracteres alfanumericos y empezar con una letra. No se admiten espacios.'
                    } else {
                        if (NOMBRES_RESERVADOS.includes(this.value.nombre)) {
                            todoOk = false
                            this.errorNombre = 'El nombre elegido forma parte de los nombres reservados de Moodle. Elige otro!.'
                        }   
                    }
                }
            }
            if (this.value.maximo == '') {
                this.errorMaximo = 'Se debe asignar una cota superior.'
                todoOk = false
            }
            if (this.value.esIntervalo) {
                if (this.value.maximo <= this.value.minimo) {
                    this.errorTamanio = true
                    todoOk = false
                }
            } else {
                if (this.value.conjunto.length == 0) todoOk = false
            }
            return todoOk
        },
        agregarAConjunto() {
            this.value.conjunto.push(parseFloat(this.$refs.agregarConjunto.value))
            this.$refs.agregarConjunto.value = ''
        }
    }
}
</script>

<style scoped>
    .pull-up {
        position: relative;
        bottom: 18pt;
    }
</style>