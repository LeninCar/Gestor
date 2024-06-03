using System.Collections.Generic;
using System.Threading.Tasks;
using backend_todo.Controllers;
using backend_todo.DTOs.Categoria;
using backend_todo.Interface;
using backend_todo.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace TestGestor
{
    public class CategoriasControllerTests
    {
    //    [Fact]
    //     public async Task GetCategoria_ReturnsOkObjectResult_WhenCategoriaExists()
    //     {
    //         // Arrange
    //         var categoriaDto = new CategoriaDto { Id = 1, Nombre = "Categoría de Prueba" };
    //         var mockCategoriaService = new Mock<ICategoriaService>();
    //         mockCategoriaService.Setup(service => service.GetCategoriaAsync(1)).ReturnsAsync(categoriaDto);
            
    //         var controller = new CategoriasController(mockCategoriaService.Object);

    //         // Act
    //         var actionResult = await controller.GetCategoria(1);
            
    //         // Assert
    //         var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
    //         var returnedCategoria = Assert.IsAssignableFrom<CategoriaDto>(okResult.Value);

    //         Assert.Equal(categoriaDto.Id, returnedCategoria.Id);
    //         Assert.Equal(categoriaDto.Nombre, returnedCategoria.Nombre);
    //     }


        [Fact]
        public async Task GetCategoria_ReturnsNotFound_WhenCategoriaDoesNotExist()
        {
            // Arrange
            var mockCategoriaService = new Mock<ICategoriaService>();
            mockCategoriaService.Setup(service => service.GetCategoriaAsync(It.IsAny<int>())).ReturnsAsync((CategoriaDto)null);
            var controller = new CategoriasController(mockCategoriaService.Object);

            // Act
            var result = await controller.GetCategoria(1);

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);
        }

        // Similar tests for other actions (GetCategorias, PostCategoria, PutCategoria, DeleteCategoria)...
    }
}
