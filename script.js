Vue.createApp({
    data() {
        return {
            titulo: 'Inventario de Suplementos - Las Barras Praderas',
            nuevoProducto: {
                nombre: '',
                precio: 0,
                cantidad: 0,
            },
            productos: [] // Array para almacenar los productos
        };
    },
    computed: {
        totalStock() {
            return this.productos.reduce((total, producto) => total + producto.cantidad, 0);
        },
        inversion() {
            return this.productos.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
        }
    },
    methods: {
        agregarProducto() {
            if (this.nuevoProducto.nombre && 
                this.nuevoProducto.precio > 0 && 
                this.nuevoProducto.cantidad > 0 && 
                this.nuevoProducto.cantidad <= 12) {
                this.productos.push({
                    nombre: this.nuevoProducto.nombre,
                    precio: this.nuevoProducto.precio,
                    cantidad: this.nuevoProducto.cantidad
                });
                this.resetNuevoProducto();
            } else {
                this.mensajeError = "Datos inválidos o la cantidad de cada producto no puede exceder las 12 unidades.";
            }
        },
        resetNuevoProducto() {
            this.nuevoProducto = { nombre: '', precio: 0, cantidad: 0 };
        },
        calcularImporte(producto) {
            return producto.cantidad * producto.precio;
        },
        eliminarProducto(index) {
            this.productos.splice(index, 1);
        },
        currency(value) {
            return '$' + parseFloat(value).toFixed(2);
        },
    }
});
app.mount('#inventario'); 
