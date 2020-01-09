export const CAMPO_REQUERIDO = 'Campo requerido.';

export const ERRORES_REGISTRAR_CLIENTE = {
    nombre: {
        required: CAMPO_REQUERIDO
    },
    apellido: {
        required: CAMPO_REQUERIDO
    },
    email: {
        email: 'Formato erroneo.'
    }
};

export const MENSAJES_GENERALES = {
    FORMULARIO_INVALIDO: 'Debe completar la información del formulario.',
    INFORMACION_DEPENDIENTE_INCOMPLETA: 'Verifique que haya guardado toda la información.',
    GUARDADO_EXITOSO: 'Registro almacenado con éxito.',
    ACTUALIZADO_EXITOSO: 'Registro actualizado con éxito.',
    ELIMINADO_EXITOSO: 'Registro eliminado con éxito.',
    ERROR_PETICION: 'Ha ocurrido un error, comuníquese con el administrador'
};

