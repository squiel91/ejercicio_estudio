# Ejercicio Estudio
[Ejercicio Estudio](https://ejercicioestudio.edu.uy/) es una nueva herramienta de uso libre que permite crear evaluaciones en Moodle únicas para cada estudiante, dificultando la copia y a la vez facilitando la colaboración entre docentes para su especificación.

> Podes consultar la guia completa que se mantiene siempre actualizada [aquí](https://docs.google.com/document/d/e/2PACX-1vRGg1dQgZehG6qdyqndAajXpSiR3Ke0ncQDssaZgzz9vRTT_7xCIG0CrSTL8cgtu_6MvjMUQ_AWIwHY/pub). Tambien podes acceder al articulo cientifico publicado en LACLO 2017 [aquí](https://ejercicioestudio.edu.uy/exercise_standard_specification_which_promotes_collaboration_and_reusing.pdf) pero hay que notar ha cambiado la sintaxis desde su publicación.

## Introduccion
En teoría los ejercicios se pueden especificar utilizando un editor de texto siguiendo el micro-formato (similar a [YAML](https://en.wikipedia.org/wiki/YAML)) especificado en la [guía de usuario](https://docs.google.com/document/d/e/2PACX-1vRGg1dQgZehG6qdyqndAajXpSiR3Ke0ncQDssaZgzz9vRTT_7xCIG0CrSTL8cgtu_6MvjMUQ_AWIwHY/pub). Esta no es la forma mas conveniente ni recomendada ya que esta herramienta [Ejercicio Estudio](https://ejercicioestudio.edu.uy/) lo hace mas intuitivo, realiza chequeos sintacticos y semanticos y permite ver una vista previa del ejercicio.

Luego de definir el ejercicio podemos bajar la especificación del ejercicio (un archivo de texto) para compartirlo o guardarlo. Este ejercicio lo podemos importar al Ejercicio Estudio y seguir modificandolo luego. En cualquier momento en la misma herramienta podemos exportarlo a formato Moodle (bajando un archivo XML) para luego importarlo al banco de preguntas del Moodle. Finalmente cuando creamos una nueva evaluación podemos agregandolo del banco de preguntas como cualquier otro ejercicio.

A continuación se resumen las principales secciones para la especificación del ejercicio:

||Descripción|Ejemplo|
|-|-|-|
|Titulo|Título identificativo del ejercicio para conveniencia de los docentes, el estudiante NO lo verá.|`Titulo: Área de un triángulo`|
|Imagen|Imagen opcional que se muestra arriba del texto problema.|`Imagen: https://tiantian.io/uploads /17748909097678967.jpg`|
|Problema|Texto principal que especifica el problema.|`Titulo: Cuál es el área de un triángulo de base @base metros y altura @altura metros?`|
|Solución|Texto que especifica la solución correcta al problema antes planteado. Debe ser la opción seleccionada por los alumnos para que se les tome el ejercicio como correcto.|`Problema: @area metros cuadrados.`|
|Distractor|Los **distractores** son las opciones que "distraen" a los alumnos. Aquellos que elijan un distractor como respuesta se les tomará el ejercicio como incorrecto.|`Distractor: @doble metros cuadrados`<br><br>`Distractor: Ninguna de las anteriores`|
|Parámetro|Al momento de mostrarse al estudiante, el parámetro se instanciará de forma aleatoria de acuerdo a la especificación. Lo puedes usar en las secciones Problemas, Solución y Distractores o en la fórmula del cómputo como un número. Se soportan dos tipos de especificacion: **Intervalo:**  y **Conjunto:** .|`Parametro: base`<br>`Mínimo: 1`<br>`Maximo: 10`<br>`Decimales: 2`<br><br>`Parametro: altura`<br>`Conjunto: 2, 2.5, 4.1, 5, 6.23`|
|Cómputo|Permiten introducir cálculos complejos a los ejercicios. El cómputo se instancia en base a la especificación de su fórmula. Se pueden utilizar numeros, parámetros, cómputos antes definidos, operadores y fórmulas matematicas. Se utiliza igual que **Parámetro**|`Computo: area`<br>`Formula: (base * altura) / 2`<br><br>`Computo: doble`<br>`Formula: base + altura`|

### KaTeX
El ejercicio soporta LaTeX pero solo en la sección problema, debido a las limitantes de Moodle delimitandolas con \( y \) para fórmulas en la misma línea o \[ y \] para fórmulas espaciadas centradas.

La siguiente es una función en la misma linea: $\Gamma(n) = (n-1)!\quad\forall n\in\mathbb N$

La de abajo es una función centrada:
$$
\Gamma(z) = \int_0^\infty t^{z-1}e^{-t}dt\,.
$$
> Podes encontrar un tutorial basico de**LaTeX** [acá](http://meta.math.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference).

## Utilización

Podes utilizar la plataforma sin instalar nada o hacerte un usuario. Solo necesitas un navegador web moderno como Google Chrome, Mozilla Firefox o Windows Edge y visitar [https://ejercicioestudio.edu.uy/](https://ejercicioestudio.edu.uy/).

Además podes acceder a la biblioteca oficial de ejericicios [aquí](https://drive.google.com/drive/folders/1Zyl54X1ouMuxMe5PKITVViMtSKmVo1Sy).

  

## Instalación
Si prefieres alojarlo en tu propio servidor tambien es muy facil, solo necesitas un servidor web.

La plataforma esta casi enteramente desarrollada en VueJs con unicamente un servicio de guardado de imagenes (un archivo PHP).
```
# Setup del proyecto
npm install

# Para correrlo local
npm run serve

# Para generar los archivos de produccion en la carpeta dist
npm run build
```

## Ideadores
- Omar Gil 
- Regina Motz
- Federico Gimenez
- Ezequiel Santiago Sanchez [(Twitter)](https://twitter.com/squiel91)

## Colaboradores
- Mary Reimondo

## Desarrollador
- Ezequiel Santiago Sanchez [(Twitter)](https://twitter.com/squiel91)

## Funcionalidades futuras
Las siguientes son las funcionalidades que se piensan desarrollar en el futuro listadas por prioridad. Si queres proponer nuevas o errores que encontras podes hacerlo a traves de Github. Tambien sse aceptan Pull requests con correciones o nuevas funcionalidades.
- Refactor de codigo de Editor (separar en diferentes archivos y módulos)
- Agregar soporte para ejericicos de respuesta simple (no multiple opción)
- Soporte para Ctl+Z y Ctl+Shift+Z
- Exportar a pdf para hacer una prueba escrita
- Guardar el ejercicio automaticamente por si se cierra la pestaña del navegador
- Agregar soporte para Schoology

## Licencia
Esta plataforma se ofrece bajo licencia  [CC BY-NC-SA 3.0](https://creativecommons.org/licenses/by-nc-sa/3.0/deed.es); podes usarlo, compartirlo y adaptarlo respetando los término. Los ejercicios desarrollados son enteramente propiedad del docente y no están comprendidos dentro de la licencia.

Todas las contribuciones al software son bienvenidas en  [Github](https://github.com/squiel91/ejercicio_estudio). Podes contribuir reportando errores o corrigiendolos, sugiriendo nuevas funcionalidades o desarrollando alguna de las de la lista en el  [README](https://github.com/squiel91/ejercicio_estudio/blob/master/README.md).