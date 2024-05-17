using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using backend_todo.Models;
using Xunit;

namespace backend_todo.Tests
{
    public class CategoriaTests
    {
        [Fact]
        public void Categoria_ShouldInitializeWithEmptyTareas()
        {
            // Arrange & Act
            var categoria = new Categoria();

            // Assert
            Assert.NotNull(categoria.Tareas);
            Assert.Empty(categoria.Tareas);
        }

        [Fact]
        public void Categoria_ShouldSetNombreCorrectly()
        {
            // Arrange
            var categoria = new Categoria();
            var nombreEsperado = "Trabajo";

            // Act
            categoria.Nombre = nombreEsperado;

            // Assert
            Assert.Equal(nombreEsperado, categoria.Nombre);
        }
    }
}


// dotnet test
