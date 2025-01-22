import React, { useState, useEffect } from 'react';
import { useTable, useSortBy } from 'react-table'; 
import './NearEarthObjects.css';

const NearEarthObjects = () => {
  const [asteroids, setAsteroids] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Control de la página actual
  const ITEMS_PER_PAGE = 5; // Número de asteroides por página (puedes ajustarlo)
  const API_KEY = "2eIeToVxQDNJ9a7v9CxVTze7UIMh1nvJd7drR5q6";

  useEffect(() => {
    const fetchAsteroids = async () => {
      try {
        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - 7); // Últimos 7 días
        const endDate = today.toISOString().split('T')[0];

        const response = await fetch(
          `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate.toISOString().split('T')[0]}&end_date=${endDate}&api_key=${API_KEY}`
        );
        const data = await response.json();
        setAsteroids(Object.values(data.near_earth_objects).flat());
      } catch (error) {
        console.error("Error fetching asteroid data:", error);
      }
    };

    fetchAsteroids();
  }, []);

  // Definir las columnas para la tabla
  const columns = React.useMemo(
    () => [
      {
        Header: 'Nombre',
        accessor: 'name',
      },
      {
        Header: 'Distancia (km)',
        accessor: (asteroid) => asteroid.close_approach_data[0].miss_distance.kilometers,
      },
      {
        Header: 'Tamaño (km)',
        accessor: (asteroid) => asteroid.estimated_diameter.kilometers.estimated_diameter_max,
      },
      {
        Header: 'Velocidad (km/h)',
        accessor: (asteroid) => asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour,
      },
    ],
    []
  );

  // Usar react-table para crear la tabla con soporte de ordenación
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,  // Este es el estado que contiene sortBy
  } = useTable(
    {
      columns,
      data: asteroids,
    },
    useSortBy // Aquí se agrega el hook useSortBy para habilitar la ordenación
  );

  // Accedemos al estado de la ordenación correctamente
  // eslint-disable-next-line no-unused-vars
  const { sortBy } = state;

  // Establecer los asteroides a mostrar para la página actual
  const displayedAsteroids = asteroids.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  // Función para pasar a la siguiente página
  const nextPage = () => {
    if ((currentPage + 1) * ITEMS_PER_PAGE < asteroids.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Función para volver a la página anterior
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="asteroids">
      <h2>Asteroides Cercanos a la Tierra</h2>

      {/* Contenedor de la tabla */}
      <div className="table-container">
        <table {...getTableProps()} className="asteroid-table">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {displayedAsteroids.map((asteroid, index) => {
              const row = rows[index]; // Usamos el índice para acceder a la fila
              prepareRow(row); // Preparar la fila

              return (
                <tr {...row.getRowProps()} key={asteroid.id}> {/* Asignamos el key aquí */}
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 0}>&lt; Anterior</button>
        <span>Página {currentPage + 1}</span>
        <button onClick={nextPage} disabled={(currentPage + 1) * ITEMS_PER_PAGE >= asteroids.length}>Siguiente &gt;</button>
      </div>
    </div>
  );
};

export default NearEarthObjects;
