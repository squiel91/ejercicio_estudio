<template>
    <div>
        <div class="card mb-3">
            <div class="card-header">
                <div class="pb-3">Parametro
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
                        <label for="minimo-computo">Minimo</label>
                        <div class="input-group">
                        <input 
                        :class="{'is-invalid': errorMinimo != ''}" 
                        @keyup="errorMinimo = ''"
                        type="number" class="form-control" id="minimo-computo" v-model.number="value.minimo">
                        <div class="input-group-append">
                            <span class="input-group-text" id="basic-addon1">&lt;</span>
                        </div>
                        <div class="invalid-feedback">
                                {{ errorMinimo }}
                            </div>
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
                        type="text" class="form-control" key="nombre" id="formula" v-model="value.nombre">
                        <div class="invalid-feedback">
                            {{ errorNombre }}
                        </div>
                        </div>
                    </div>
                    <div class="form-group col-12 col-lg-2">
                        <label for="maximo-computo">Maximo</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">&lt;</span>
                            </div>
                            <input 
                                :class="{'is-invalid': errorMaximo != ''}" 
                                @keyup="errorMaximo = ''"
                                type="number" 
                                class="form-control" 
                                id="maximo-computo" 
                                v-model.number="value.maximo"
                            >
                            <div class="invalid-feedback">
                                {{ errorMaximo }}
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-12 col-lg-3">
                        <label for="decimales">Decimales</label>
                        <select id="decimales" class="form-control" v-model.number="value.decimales">
                            <option value="0">Sin decimales</option>
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
                        <div class="invalid-feedback">
                            {{ errorNombre }}
                        </div>
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
        esValido() {
            var todoOk = true
            if (this.value.minimo == '') {
                this.errorMinimo = 'Se debe asignar una cota inferior.'
                todoOk = false
            }
            if (this.value.nombre == '') {
                this.errorNombre = 'Se debe asignar un nombre al parametro.'
                todoOk = false
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