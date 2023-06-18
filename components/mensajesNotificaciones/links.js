//--> Crear usuario
export const nuevoUsuario = "http://localhost:4000/api/cliente"
export const validarToken = "http://localhost:4000/api/cliente/confirmar/"

//--> Iniciar sesion
export const iniciarSesion = "http://localhost:4000/api/cliente/iniSes"

//--> Resetear password
export const resetearPassword = "http://localhost:4000/api/cliente/olvide-password"
export const tokenResetearPassword = "http://localhost:4000/api/cliente/olvide-password/"
export const cambiarPassword = "http://localhost:4000/api/cliente/olvide-password/"

// --> Catalogo flores
export const mostrarFlores = "http://localhost:4000/api/productos/mostrarFlores"

// --> Catalogo peluches
export const mostrarPeluches = "http://localhost:4000/api/productos/mostrarPeluches"

// --> Cambiar nombre
export const modificarNombre = "http://localhost:4000/api/cliente/modificar/username"

// --> Interaccion con productos
export const agregarFavoritos = "http://localhost:4000/api/productos/agregarFavoritos"
export const verFavoritos = "http://localhost:4000/api/productos/verFavoritos"
export const visualizarVC = "http://localhost:4000/api/cliente/interaccionPro/visualizarVC"
// --> Personalizar producto
export const verPeluches = "http://localhost:4000/api/productos/verPeluches"
export const verFlores = "http://localhost:4000/api/productos/verFlores"

// --> Interaccion con pedidos
export const verTarjetas = "http://localhost:4000/api/productos/verTarjetas"
export const verDirecciones = "http://localhost:4000/api/productos/verDirecciones"
export const visualizarPedidos = "http://localhost:4000/api/productos/visualizar"