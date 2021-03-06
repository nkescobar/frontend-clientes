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
    },
    region: {
        required: CAMPO_REQUERIDO
    },
};

export const ERRORES_LOGIN = {
    username: {
        required: CAMPO_REQUERIDO
    },
    password: {
        required: CAMPO_REQUERIDO
    }
};

export const MENSAJES_GENERALES = {
    FORMULARIO_INVALIDO: 'Debe completar la información del formulario.',
    INFORMACION_DEPENDIENTE_INCOMPLETA: 'Verifique que haya guardado toda la información.',
    GUARDADO_EXITOSO: 'Registro almacenado.',
    ACTUALIZADO_EXITOSO: 'Registro actualizado.',
    ELIMINADO_EXITOSO: 'Registro eliminado con éxito.',
    ERROR_PETICION: 'Ha ocurrido un error, comuníquese con el administrador'
};

