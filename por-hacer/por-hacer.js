const fs = require('fs');

let listadoPorHacer = [];

const crear = (descripcion) => {
    cargarDb();

    let porHacer = {
        descripcion, // descripcion: descripcion
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDb();
    return porHacer;

}

const guardarDb = () => {
    // convertir a json
    let data = JSON.stringify(listadoPorHacer);

    // Escribir en el archivo
    fs.writeFile(`db/data.json`, data, (err) => {
        if (err) throw new Error(`No se pudo grabar `, err);
    });
}

const cargarDb = () => {
    // leer archivo; lee el json y lo serializa de una al objeto js
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }

}

const getListado = () => {
    cargarDb();
    return listadoPorHacer;

}

const actualizar = (descripcion, completado = true) => {
    cargarDb();

    // buscamos el elemento, si es -1 no lo encontro
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDb();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDb();

    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDb();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}