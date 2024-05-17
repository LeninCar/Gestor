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

        [Fact]
        public void Categoria_Nombre_ShouldNotExceedMaxLength()
        {
            // Arrange
            var categoria = new Categoria();
            var nombreLargo = new string('A', 101); // String de longitud 101

            // Act
            categoria.Nombre = nombreLargo;

            // Assert
            var context = new ValidationContext(categoria);
            var results = new List<ValidationResult>();
            var isValid = Validator.TryValidateObject(categoria, context, results, true);

            Assert.False(isValid);
            Assert.Contains(results, v => v.MemberNames.Contains(nameof(Categoria.Nombre)) && v.ErrorMessage.Contains("The field Nombre must be a string or array type with a maximum length of '100'."));
        }
    }
}


// dotnet test
