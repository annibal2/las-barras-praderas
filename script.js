const app = Vue.createApp({
    // Definición de los datos  de la aplicación
    data() {
        return {
            titulo: 'Inventario de Suplementos - Las Barras Praderas', // Título que se muestra en la interfaz
            nuevoProducto: { // Objeto que representa un producto nuevo a agregar
                nombre: '', // Nombre del producto
                precio: 0, // Precio del producto 
                cantidad: 0, // Cantidad del producto 
            },
            productos: [] // Array para almacenar la lista de productos
        };
    },
    // Computed es para calcular valores derivados
    computed: {
        totalStock() {
            // Calcula el total de unidades de todos los productos en inventario
            return this.productos.reduce((total, producto) => total + producto.cantidad, 0);
        },
        inversion() {
            // Calcula el total invertido multiplicando precio por cantidad de cada producto
            return this.productos.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
        }
    },
    // Métodos que definen la funcionalidad de la aplicación
    methods: {
        agregarProducto() {
            // Verifica que los datos del nuevo producto sean válidos antes de agregarlo
            if (this.nuevoProducto.nombre && 
                this.nuevoProducto.precio > 0 && 
                this.nuevoProducto.cantidad > 0 && 
                this.nuevoProducto.cantidad <= 12) {
                // Agrega el nuevo producto al array productos
                this.productos.push({
                    nombre: this.nuevoProducto.nombre,
                    precio: this.nuevoProducto.precio,
                    cantidad: this.nuevoProducto.cantidad
                });
                // Llama a la función para resetear el formulario después de agregar el producto
                this.resetNuevoProducto();
            } else {
                // Mensaje de error si los datos no son válidos o la cantidad excede el límite de 12
                this.mensajeError = "Datos inválidos o la cantidad de cada producto no puede exceder las 12 unidades.";
            }
        },
        resetNuevoProducto() {
            // Resetea el objeto nuevoProducto a sus valores iniciales 
            this.nuevoProducto = { nombre: '', precio: 0, cantidad: 0 };
        },
        calcularImporte(producto) {
            // calcula el importe de la cantidad x el producto
            return producto.cantidad * producto.precio;
        },
        eliminarProducto(index) {
            // Elimina un producto del array productos en la posición indicada por index
            this.productos.splice(index, 1);
        },
        currency(value) {
            // Formatea un número como moneda, agregando el símbolo "$" y dos decimales
            return '$' + parseFloat(value).toFixed(2);
        },
    }
});
// conecta la aplicación en el elemento HTML con el id 'inventario'
app.mount('#inventario');
