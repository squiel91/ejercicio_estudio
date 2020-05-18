<template>
    <div>
        <div class="card mb-3">
            <div class="card-header">
                Cómputo
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
                        v-model="value.nombre">
                        </div>
                        <div class="invalid-feedback">
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
                        <div class="invalid-feedback">
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
export default {
    props: ['value'],
    data() {
        return {
            errorNombre: '',
            errorFormula: ''
        }
    },
    methods: {
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
            }
            if (this.value.formula == '') {
                todoOk = false
                this.errorFormula = 'Se debe asignar una formula al computo.'
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