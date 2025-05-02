export function usePagination<T>(
  data: T[],
  currentPage: number,
  searchValue: string,
  modelType: 'users' | 'roles' | 'people' | 'session' | 'service'
) {
  const rowsPerPage = 6;

  const getSearchableText = (item: T): string => {
    switch (modelType) {
      case 'users':
        const user = item as { name?: string; email?: string; created_at?: string; updated_at?: string };
        return [
          user.name,
          user.email,
          user.created_at,
          user.updated_at,
        ]
          .filter(Boolean)
          .join(' ');

      case 'roles':
        const roles = item as { name?: string };
        return [
          roles.name
        ]
          .filter(Boolean)
          .join(' ');

      case 'people':
        const person = item as { name?: string; first_surname?: string; last_surname?: string };
        return [
          person.name,
          person.first_surname,
          person.last_surname,
        ]
          .filter(Boolean)
          .join(' ');

      case 'session':
        const session = item as { device?: string; token?: string };
        return [
          session.device,
          session.token,
        ]
          .filter(Boolean)
          .join(' ');

        case 'service':
        const service = item as { name?: string;  };
        return [
          service.name,
          
        ]
          .filter(Boolean)
          .join(' ');
      default:
        return '';
    }
  };

  // Aseguramos que filteredData siempre sea un arreglo
  const filteredData = Array.isArray(data)
    ? searchValue
      ? data.filter((item) =>
        searchValue
          .toLowerCase()
          .split(' ')
          .every((word) =>
            getSearchableText(item).toLowerCase().includes(word)
          )
      )
      : data
    : [];

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  // Verificamos que filteredData sea un arreglo antes de usar .slice()
  const currentRows = Array.isArray(filteredData) ? filteredData.slice(indexOfFirstRow, indexOfLastRow) : [];

  const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));

  return {
    currentRows,
    rowsPerPage,
    currentPage,
    totalPages,
    filteredData,
  };
}
