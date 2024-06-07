using backend_todo.DTOs.Tarea;
using backend_todo.Models;
using System;
using Xunit;

namespace TestGestor
{
    public class TareaDtoTests
    {
        [Fact]
        public void CrearTareaDto_ShouldSetPropertiesCorrectly()
        {
            // Arrange
            var titulo = "Nueva Tarea";
            var descripcion = "Descripción de la nueva tarea";
            var fechaFinalizacion = DateTime.Now.AddDays(7);
            var estado = EstadoTarea.Pendiente;
            var categoriaId = 1;

            // Act
            var crearTareaDto = new CrearTareaDto
            {
                Titulo = titulo,
                Descripcion = descripcion,
                FechaFinalizacion = fechaFinalizacion,
                Estado = estado,
                CategoriaId = categoriaId
            };

            // Assert
            Assert.Equal(titulo, crearTareaDto.Titulo);
            Assert.Equal(descripcion, crearTareaDto.Descripcion);
            Assert.Equal(fechaFinalizacion, crearTareaDto.FechaFinalizacion);
            Assert.Equal(estado, crearTareaDto.Estado);
            Assert.Equal(categoriaId, crearTareaDto.CategoriaId);
        }

        [Fact]
        public void TareaDto_ShouldSetPropertiesCorrectly()
        {
            // Arrange
            var id = 1;
            var titulo = "Tarea de Prueba";
            var descripcion = "Descripción de la tarea de prueba";
            var fechaFinalizacion = DateTime.Now.AddDays(2);
            var estado = "Pendiente";
            var categoriaId = 2;
            var categoriaNombre = "Categoria de Prueba";

            // Act
            var tareaDto = new TareaDto
            {
                Id = id,
                Titulo = titulo,
                Descripcion = descripcion,
                FechaFinalizacion = fechaFinalizacion,
                Estado = estado,
                CategoriaId = categoriaId,
                CategoriaNombre = categoriaNombre
            };

            // Assert
            Assert.Equal(id, tareaDto.Id);
            Assert.Equal(titulo, tareaDto.Titulo);
            Assert.Equal(descripcion, tareaDto.Descripcion);
            Assert.Equal(fechaFinalizacion, tareaDto.FechaFinalizacion);
            Assert.Equal(estado, tareaDto.Estado);
            Assert.Equal(categoriaId, tareaDto.CategoriaId);
            Assert.Equal(categoriaNombre, tareaDto.CategoriaNombre);
        }

        // [Fact]
        // public void ActualizarTareaDto_ShouldSetPropertiesCorrectly()
        // {
        //     // Arrange
        //     var titulo = "Tarea Actualizada";
        //     var descripcion = "Descripción de la tarea actualizada";
        //     var fechaFinalizacion = DateTime.Now.AddDays(5);
        //     var estado = EstadoTarea.EnProgreso;
        //     var categoriaId = 3;

        //     // Act
        //     var actualizarTareaDto = new ActualizarTareaDto
        //     {
        //         Titulo = titulo,
        //         Descripcion = descripcion,
        //         FechaFinalizacion = fechaFinalizacion,
        //         Estado = estado,
        //         CategoriaId = categoriaId
        //     };

        //     // Assert
        //     Assert.Equal(titulo, actualizarTareaDto.Titulo);
        //     Assert.Equal(descripcion, actualizarTareaDto.Descripcion);
        //     Assert.Equal(fechaFinalizacion, actualizarTareaDto.FechaFinalizacion);
        //     Assert.Equal(estado, actualizarTareaDto.Estado);
        //     Assert.Equal(categoriaId, actualizarTareaDto.CategoriaId);
        // }
    }
}
