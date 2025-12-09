import React, { useState } from 'react';
import { FaTrash, FaPlus, FaChevronRight, FaChevronDown } from 'react-icons/fa';

const JsonNode = ({ name, value, path, onUpdate, onDelete, onAdd }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    // Detectar tipos de datos
    const isObject = value !== null && typeof value === 'object' && !Array.isArray(value);
    const isArray = Array.isArray(value);
    const isPrimitive = !isObject && !isArray;

    // Manejar edición de valores primitivos
    const handleChange = (e) => {
        let newValue = e.target.value;
        // Conversión automática de tipos simples
        if (!isNaN(newValue) && newValue.trim() !== '') newValue = Number(newValue);
        if (newValue === 'true') newValue = true;
        if (newValue === 'false') newValue = false;

        onUpdate(path, newValue);
    };

    return (
        <div className="ml-5 border-l-2 border-slate-300 pl-3 py-1 transition-all">
            <div className="flex items-center gap-2 group">

                {/* Toggle Expansión */}
                {(isObject || isArray) ? (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                        {isExpanded ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
                    </button>
                ) : (
                    <span className="w-3"></span>
                )}

                {/* Nombre de la Llave (Key) */}
                <span className="font-bold text-slate-700 text-sm select-none">
                    {name}:
                </span>

                {/* Valor o Etiqueta de Estructura */}
                {isPrimitive ? (
                    <input
                        type="text"
                        defaultValue={value}
                        onBlur={handleChange}
                        className="bg-transparent border-b border-dashed border-slate-300 px-1 py-0.5 text-sm text-blue-900 focus:outline-none focus:border-blue-500 focus:border-b-2 hover:border-slate-400 w-full max-w-[250px] transition-colors placeholder-slate-300"
                        placeholder="null"
                    />
                ) : (
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-sm">
                        {isArray ? `Lista [${value.length}]` : 'Objeto'}
                    </span>
                )}

                {/* Botones de Acción (Visibles al pasar el mouse) */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity ml-auto mr-2">
                    {(isObject || isArray) && (
                        <button
                            onClick={() => onAdd(path, isArray)}
                            className="text-green-600 hover:bg-green-100 p-1 rounded cursor-pointer"
                            title="Agregar elemento"
                        >
                            <FaPlus size={10} />
                        </button>
                    )}
                    <button
                        onClick={() => onDelete(path)}
                        className="text-red-500 hover:bg-red-100 p-1 rounded cursor-pointer"
                        title="Eliminar nodo"
                    >
                        <FaTrash size={10} />
                    </button>
                </div>
            </div>

            {/* Recursividad: Renderizar hijos si está expandido */}
            {isExpanded && isObject && Object.entries(value).map(([key, val]) => (
                <JsonNode
                    key={key}
                    name={key}
                    value={val}
                    path={[...path, key]}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    onAdd={onAdd}
                />
            ))}

            {isExpanded && isArray && value.map((val, index) => (
                <JsonNode
                    key={index}
                    name={`#${index}`}
                    value={val}
                    path={[...path, index]}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    onAdd={onAdd}
                />
            ))}
        </div>
    );
};

export default JsonNode;