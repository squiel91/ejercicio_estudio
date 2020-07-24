<template>
    <div class="card mb-3">
        <div class="card-header">
            Distractor
            <button @click="$emit('eliminar')" class="btn btn-outline-danger btn-sm float-right">Eliminar</button>
        </div>
        <div class="card-body">
            <textarea
                :class="{'is-invalid': error != ''}" 
                @keyup="cambioDistractor"
                class="form-control" 
                rows="2" 
                :value="value">
            </textarea>
            <div class="invalid-feedback">
                {{ error }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['value'],
    data() {
        return {
            error: ''
        }
    },
    methods: {
        cambioDistractor(event) {
            if (event.target.value != '') this.error = ''
            this.$emit('input', event.target.value)
        },
        reset() {
            this.error = ''
        },
        esValido() {
            if (this.value == '') {
                this.error = 'El distractor no puede ser vacio. Lo puedes eliminar sino.'
                return false
            }
            return true
        }
    }
}
</script>