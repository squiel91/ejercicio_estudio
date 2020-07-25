# Log de cambios
## 0.10
Esta versíon no agrega nuevas funcionalidades. Si se agregan nuevos chequeos, se mejora la forma de mostrar los computos en las opciones (solución y distractores) gracias a Gaston Ibarburu y se introducen correciones mínimas.

### Cómputos en opciones (solución y distractor)
- Ahora cómo se muestran los decimales para los computos en las opciones  se adaptan automáticamente. Antes siempre mostraban 2 decimales y ahora se utiliza la siguiente regla:
  -  Si se utiliza solo un cómputo por opción o más de uno pero con igual número de decimales se muestran con los decimales especificados tal cúal se espera. Ejemplo: ``Solución: @computo1Decimal y @otroComputo1Decimal => 2.1 y 3.5``
  - Si se utiliza más de un cómputo con diferente cantidad de decimales en la misma opción entonces todos estos se muestran con la cantidad de decimales del cómputo que tiene la mayor cantidad especificada de la opción. Ejemplo: ``solución: @computo2Decimales y @computo1Decimal => 2.12 y 3.50``  
  
Notar que las **variables siempre se muestran con la cantidad de decimales especificados** y no modifican de ninguna forma como se muesta el cómputo.

### Chequeos (realizados antes de descargar y vista previa)
- Se chequea el largo del nombre de los _parámetros_ (un nombre de largo mayor de 24 caracteres daba error al importar al Moodle). Esta restricción no aplica para los _cómputos_.
- Se chequea que no haya variables (_parametros_ y _computos_) con el mismo nombre. Este error pasaba silenciosamente hasta en el Moodle y era dificil de detectar.
- Se muestra un error si se utiliza el símbolo "^" en la fórmula del cómputo, sugiriendo usar la función pow(base, exponenete).

### Otros

- Se agrega ejemplo precargado de contabilidad
- Se modifica ejemplo precargado de programación y estabilidad
- Se muestra un error si aparece un error al parsear un archivo de especificación de ejercicio (aún no da detalles de donde se encuentra el error).
- Se cambia el nombre EVA por Moodle en algunos lugares que faltaba cambiar 
- Se recorta los espacios y saltos de página al principio y al final para los nombre de las variables, problema, solución y distractores al cargar un archivo de especificación.
