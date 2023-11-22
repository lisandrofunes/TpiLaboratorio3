import { categoriasServices } from "../../../servicios/categorias-servicios.js";
import { productosServices } from "../../../servicios/productos-servicios.js";

function htmlCategoria(id, categoria){
    /*ESTA FUNCION RECIBE DOS PARAMETROS ID Y CATEGORIA*/
    /*EN ESTA SE GENERA UNA CADENA DE CARACTERES CON EL CODIGO HTML CORRESPONDIENTE A LA CATEGORIA (ESTA EN ASSETS/MODULOS/listarProducto.html)*/
    /*SE DEBERÁ CONCATENAR PARA INCORPORAR EL id DE LA CATEGORIA AL ATRIBUTO data-idCategoria  */
    /*Y ADEMAS REEMPLAZAR EL TEXTO Nombre de Categoría POR EL VALOR QUE LLEGA AL PARAMETRO CATEGORIA DE LA FUNCION*/
    /*POR ULTIMO, LA FUNCION DEVOLVERA LA CADENA RESULTANTE*/   
    

}

function htmlItemProducto(id, imagen, nombre, precio){
    /**1- ESTA FUNCION RECIBE COMO PARAMETRO los siguiente datos id, imagen, nombre y precio del producto */
    /**2- A ESTOS PARAMETROS LOS CONCATENA DENTRO DEL CODIGO CORRESPONDIENTE AL COMPONENTE itemProducto ( ASSETS/MODULOS/itemProducto.html)*/
    /**3- POR ULTIMO DEVUELVE LA CADENA RESULTANTE. */
    /**4- SE RECUERDA QUE PARA PODER HACER LA INTERPOLACION DE CADENAS ${NOMBRE_VARIABLE} EL TEXTO DEBE ESTAR ENTRE LAS COMILLAS ` `. 
     *  
     *  ejemplo
     *   let titulo = 'Señora';  
     *   let cadena = `Hola, ${titulo} Claudia  en que podemos ayudarla`;
     *   
    */
    


}

async function asignarProducto(id){
    /*1- ESTA FUNCION DEBERA CONSULTAR EN EL API-REST TODOS LOS PRODUCTOS PERTENECIENTES A LA CATEGORIA CON CODIGO ID  */
    /*2- HACER UN BUCLE CON EL RESULTADO DE LA CONSULTA Y RECORRELO PRODUCTO POR PRODUCTO*/
    /*3- EN EL INTERIOR DEL BUCLE DEBERA LLAMAR A LA FUNCION htmlItemProducto y acumular su resultado en una cadena de caracteres */
    /*4- LUEGO DEL BUCLE Y CON LA CADENA RESULTANTE SE DEBE CAPTURAR EL ELEMENTO DEL DOM PARA ASIGNAR ESTOS PRODUCTOS DENTRO DE LA CATEGORIA CORRESPONDIENTE */
    /*5- PARA ELLO PODEMOS HACER USO DE UN SELECTOR CSS QUE SELECCIONE EL ATRIBUTO data-idCategoria=X, Ó LA CLASE .productos  .SIENDO X EL VALOR LA CATEGORIA EN CUESTION.*/ 
     
     
        

} 
export async function listarProductos(){
    /************************** .
     /* 1- ESTA FUNCION DEBERA SELECCIONAR DESDE DEL DOM  LA CLASE .seccionProductos. */
     /* 2- DEBERÁ CONSULTAR LA API-REST PARA TRAER LAS CATEGORIAS Y  CONSTRUIR UN BUCLE PARA RECORRERLAS UNA A UNA. */
     /* 3- EN EL INTERIOR DE ESTE BUCLE LLAMARA A LA FUNCION htmlCategoria PARA ASIGNAR EL NOMBRE DE LA CATEGORIA Y SU ID*/
     /* 4- SE DEBERA ASIGNAR EL RESULTADO DE FUNCION ANTERIOR AL ELEMENTO DEL DOM .seccionProductos */
     /* 5- LUEGO DEBERÁ LLAMAR UNA FUNCION, asignarProducto, QUE RECIBA COMO PARAMETRO EL ID DE LA CATEGORIA  */
     /* 6- FIN DEL BUCLE Y FIN DE LA FUNCION */   

     
}  

