import React, { useState } from 'react';
import { FaTrash, FaPlus, FaChevronRight, FaChevronDown } from 'react-icons/fa';

const JsonNode = ({ name, value, path, onUpdate, onDelete, onAdd }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const isObject = value !== null && typeof value === 'object' && !Array.isArray(value);
    const isArray = Array.isArray(value);
    const isPrimitive = !isObject && !isArray;

    const handleChange = (e) => {
        let newValue = e.target.value;
        if (!isNaN(newValue) && newValue.trim() !== '') newValue = Number(newValue);
        if (newValue === 'true') newValue = true;
        if (newValue === 'false') newValue = false;
        onUpdate(path, newValue);
    };

    return (
        // USO DE VARIABLE: border-border (definida en CSS)
        <div className="ml-5 border-l-2 border-border pl-3 py-1 transition-all">
            <div className="flex items-center gap-2 group">

                {/* Toggle */}
                {(isObject || isArray) ? (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-text-muted hover:text-primary transition-colors cursor-pointer"
                    >
                        {isExpanded ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
                    </button>
                ) : (
                    <span className="w-3"></span>
                )}

                {/* Key Name */}
                <span className="font-bold text-text-main text-sm select-none">
                    {name}:
                </span>

                {/* Value Input or Label */}
                {isPrimitive ? (
                    // REFACTORIZACIÓN: Usamos la clase .input-minimal
                    <input
                        type="text"
                        defaultValue={value}
                        onBlur={handleChange}
                        className="input-minimal"
                        placeholder="null"
                    />
                ) : (
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-sm">
                        {isArray ? `Lista [${value.length}]` : 'Objeto'}
                    </span>
                )}

                {/* Actions */}
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

            {/* Recursion */}
            {isExpanded && isObject && Object.entries(value).map(([key, val]) => (
                <JsonNode
                    key={key} name={key} value={val} path={[...path, key]}
                    onUpdate={onUpdate} onDelete={onDelete} onAdd={onAdd}
                />
            ))}

            {isExpanded && isArray && value.map((val, index) => (
                <JsonNode
                    key={index} name={`#${index}`} value={val} path={[...path, index]}
                    onUpdate={onUpdate} onDelete={onDelete} onAdd={onAdd}
                />
            ))}
        </div>
    );
};

export default JsonNode;