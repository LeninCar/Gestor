using backend_todo.DTOs.Categoria;
using Xunit;

namespace TestGestor
{
    public class CategoriaDtoTests
    {
        [Fact]
        public void CrearCategoriaDto_ShouldSetPropertiesCorrectly()
        {
            // Arrange
            var nombre = "Nueva Categoría";

            // Act
            var crearCategoriaDto = new CrearCategoriaDto
            {
                Nombre = nombre
            };

            // Assert
            Assert.Equal(nombre, crearCategoriaDto.Nombre);
        }

        [Fact]
        public void CategoriaDto_ShouldSetPropertiesCorrectly()
        {
            // Arrange
            var id = 1;
            var nombre = "Categoría de Prueba";

            // Act
            var categoriaDto = new CategoriaDto
            {
                Id = id,
                Nombre = nombre
            };

            // Assert
            Assert.Equal(id, categoriaDto.Id);
            Assert.Equal(nombre, categoriaDto.Nombre);
        }

        [Fact]
        public void ActualizarCategoriaDto_ShouldSetPropertiesCorrectly()
        {
            // Arrange
            var nombre = "Categoría Actualizada";

            // Act
            var actualizarCategoriaDto = new ActualizarCategoriaDto
            {
                Nombre = nombre
            };

            // Assert
            Assert.Equal(nombre, actualizarCategoriaDto.Nombre);
        }
    }
}
