import { useState } from "react";
import s from "./style.module.scss";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export const Table = ({
  columns,
  data = [],
  onApprove,
  onReject,
  itemsPerPage = 5,
  showActions = true,
  pagination = true,
  options = [],
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState(null);
  const isAdmin = useSelector(state => state.user.isAdmin);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = Array.isArray(data) ? data.slice(startIndex, endIndex) : [];

  const getNestedValue = (obj, accessor) => {
    if (!obj || !accessor) return '';
    return accessor.split('.').reduce((value, key) => (value && value[key] !== undefined ? value[key] : ''), obj);
  };

  const handleApproveClick = async (id) => {
    console.log('handleApproveClick chamado com ID:', id);
    if (onApprove) {
      await onApprove(id);
    }
  };

  const handleRejectClick = async (id) => {
    console.log('handleRejectClick chamado com ID:', id);
    if (onReject) {
      await onReject(id);
    }
  };

  return (
    <div className={s.tableContainer}>
      <table>
        <thead>
          <tr>
            {columns?.map((column, index) => (
              <th key={index}>{column.title}</th>
            ))}
            {showActions && isAdmin && <th>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns?.map((column, colIndex) => (
                <td key={colIndex} style={{ cursor: colIndex === 0 ? 'pointer' : 'default' }}>
                  {column.accessor === 'status'
                    ? row[column.accessor]
                    : getNestedValue(row, column.accessor)
                  }
                </td>
              ))}
              {showActions && isAdmin && (
                <td>
                  <div className={s.actionsContainer}>
                    {row.status === 'pendente' && (
                      <>
                        {onApprove && (
                          <button
                            onClick={() => handleApproveClick(row._id)}
                            className={`${s.actionButton} ${s.approveButton}`}
                            title="Aprovar agendamento"
                          >
                            <FontAwesomeIcon icon="fa-solid fa-check" className={s.iconApprove} style={{ fill: '#10b981', color: '#10b981' }} />
                          </button>
                        )}
                        {onReject && (
                          <button
                            onClick={() => handleRejectClick(row._id)}
                            className={`${s.actionButton} ${s.rejectButton}`}
                            title="Reprovar agendamento"
                          >
                            <FontAwesomeIcon icon="fa-solid fa-xmark" className={s.iconReject} style={{ fill: '#ef4444', color: '#ef4444' }} />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {pagination && data.length > 0 && (
        <div className={s.pagination}>
          <button disabled>Anterior</button>
          <span>Mostrando de 1° ao {endIndex}° de resultados</span>
          <button>Próximo</button>
        </div>
      )}

    </div>
  );
};
