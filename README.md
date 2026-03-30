**Consultas para probar las respuestas de la API - Sistema de gestión de Eventos** 🎫🎟️

**Para obtener los eventos**
https://sistema-eventos-api.onrender.com/api/eventos

1. Consulta 1: Fecha mayor a...
https://sistema-eventos-api.onrender.com/api/eventos/fecha-mayor/2025-06-01 
Resultado esperado: Eventos después del 1 de junio 2025

2. Consulta 2: Categoría Y ciudad
https://sistema-eventos-api.onrender.com/api/eventos/filtro?categoria=música&ciudad=SanSalvador    
Resultado esperado: 3 eventos de música en San Salvador

3. Consulta 3: Precio entre valores
https://sistema-eventos-api.onrender.com/api/eventos/precio-entre?min=10&max=50 
Resultado esperado: Eventos entre $10 y $50

4. Consulta 4: Múltiples categorías
https://sistema-eventos-api.onrender.com/api/eventos/categorias-multiples?categorias=música,deporte 
Resultado esperado: Eventos de música O deporte

5. Consulta 5: Eventos activos
https://sistema-eventos-api.onrender.com/api/eventos/activos 
Resultado esperado: 8 eventos (todos menos "cancelado")

6. Consulta 6: Solo nombre, fecha, lugar
https://sistema-eventos-api.onrender.com/api/eventos/proyectados 
Resultado esperado: Array simplificado


7. Consulta 7: Ordenados por fecha
https://sistema-eventos-api.onrender.com/api/eventos/ordenados?orden=asc 
Resultado esperado: Orden cronológico

8. Consulta 8: Estadísticas categorías
https://sistema-eventos-api.onrender.com/api/eventos/estadisticas/categorias 
Resultado esperado: Conteo por categoría

9. Consulta 9: Tickets vendidos
https://sistema-eventos-api.onrender.com/api/eventos/tickets-vendidos 
Resultado esperado: Tickets por evento

10. Consulta 10: Evento más vendido
https://sistema-eventos-api.onrender.com/api/eventos/mas-vendido 
Resultado esperado: Evento con más tickets
