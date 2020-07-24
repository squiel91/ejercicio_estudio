<template>
    <div>
        <div class="card mb-3">
            <div class="card-header">
                Cómputo
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
            <div class="card-body">
                <div class="row">
                    <div class="form-group col-12 col-lg-3">
                        <label for="nombre-computo">Nombre</label>
                        <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">@</span>
                        </div>
                        <input type="text" 
                        :class="{'is-invalid': errorNombre != ''}" 
                        @keyup="nombreValido"
                        class="form-control" 
                        id="nombre-computo" 
                        v-model.trim="value.nombre">
                        </div>
                        <div :style="{display: 'block'}" class="invalid-feedback">
                            {{ errorNombre }}
                        </div>
                    </div>
                    <div class="form-group col-12 col-lg-6">
                        <label for="formula">Fórmula</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">=</span>
                            </div>
                            <input 
                            type="text" 
                            :class="{'is-invalid': errorFormula != ''}" 
                            @keyup="formulaValida"
                            class="form-control" 
                            id="formula" 
                            v-model="value.formula">
                        </div>
                        <div :style="{display: 'block'}" class="invalid-feedback">
                            {{ errorFormula }}
                        </div>
                    </div>
                    <div class="form-group col-12 col-lg-3">
                        <label for="decimales">Decimales</label>
                        <select id="decimales" v-model.number="value.decimales" class="form-control">
                            <option value="0">Sin decimales</option>
                            <option value="1">1 decimal</option>
                            <option value="2">2 decimales</option>
                            <option value="3">3 decimales</option>
                            <option value="4">4 decimales</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

var NOMBRES_RESERVADOS = ['break', 'case', 'catch', 'continue', 'debugger', 'default', 'delete', 'do', 'else', 'finally', 'for', 'function', 'if', 'in', 'instanceof', 'new', 'return', 'switch', 'this', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'with', 'class', 'const', 'enum', 'export', 'extends', 'import', 'super', 'implements', 'interface', 'let', 'package', 'private', 'protected', 'public', 'static', 'yield', 'null', 'true', 'false']

export default {
    props: ['value'],
    data() {
        return {
            errorNombre: '',
            errorFormula: ''
        }
    },
    methods: {
        reset() {
            this.errorNombre = ''
            this.errorFormula = ''
        },
        setearErrorParseo(error) {
            this.errorFormula = error
        },
        nombreValido() {
            if (this.value.nombre != '') this.errorNombre = ''
        },
        formulaValida() {
            if (this.value.formula != '') this.errorFormula = ''
        },
        esValido() {
            var todoOk = true
            if (this.value.nombre == '') {
                todoOk = false
                this.errorNombre = 'Se debe asignar un nombre al computo.'
            } else {
                if (!this.value.nombre.match(/^[a-zA-Z][a-zA-Z0-9]*$/)) {
                    todoOk = false
                    this.errorNombre = 'Los nombres solo pueden estar formado por caracteres alfanumericos y empezar con una letra.'
                } else {
                    if (NOMBRES_RESERVADOS.includes(this.value.nombre)) {
                        todoOk = false
                        this.errorNombre = 'El nombre elegido forma parte de los nombres reservados de Moodle. Elige otro!.'
                    }   
                }
            }
            if (this.value.formula == '') {
                todoOk = false
                this.errorFormula = 'Se debe asignar una formula al computo.'
            } else {
                if (this.value.formula.includes('^')) {
                    todoOk = false
                    this.errorFormula = '¿Queres usar la potencia? El simbolo ^ no es válido, usa la función pow(base, exponente) en vez. Ejemplo: pow(4,3) = 4 * 4 * 4.'
                }
            }

            return todoOk
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