import React, { useState } from 'react';
import { FaFileImport, FaDownload, FaCode } from 'react-icons/fa';
import JsonNode from './components/JsonNode';

function App() {
  const [data, setData] = useState(null);
  const [fileName, setFileName] = useState("data.json");

  // 1. Cargar
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        setData(json);
      } catch (error) {
        console.error(error);
        alert("El archivo no es un JSON válido. Tsool requiere orden.");
      }
    };
    reader.readAsText(file);
  };

  // 2. Modificar
  const handleUpdate = (path, newValue) => {
    const newData = structuredClone(data);
    let current = newData;
    for (let i = 0; i < path.length - 1; i++) current = current[path[i]];
    current[path[path.length - 1]] = newValue;
    setData(newData);
  };

  // 3. Eliminar
  const handleDelete = (path) => {
    if (path.length === 0) { setData(null); return; }
    const newData = structuredClone(data);
    let current = newData;
    const lastKey = path[path.length - 1];
    for (let i = 0; i < path.length - 1; i++) current = current[path[i]];

    if (Array.isArray(current)) current.splice(lastKey, 1);
    else delete current[lastKey];

    setData(newData);
  };

  // 4. Agregar
  const handleAdd = (path, isArrayTarget) => {
    const newData = structuredClone(data);
    let current = newData;
    for (let i = 0; i < path.length; i++) current = current[path[i]];

    if (isArrayTarget) {
      current.push("Nuevo Valor");
    } else {
      const newKey = prompt("Nombre del nuevo campo (Key):", "nuevo_campo");
      if (newKey && !Object.prototype.hasOwnProperty.call(current, newKey)) {
        current[newKey] = "Nuevo Valor";
      } else if (Object.prototype.hasOwnProperty.call(current, newKey)) {
        alert("Esa llave ya existe.");
      }
    }
    setData(newData);
  };

  // 5. Exportar
  const handleExport = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = `Tsool_${fileName}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen p-6 font-sans">

      {/* Header */}
      <header className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-border pb-6">
        <div>
          {/* USO DE VARIABLE: text-primary */}
          <h1 className="text-4xl font-black tracking-tight text-text-main">
            Tsool <span className="text-primary">JSON</span>
          </h1>
          <p className="text-text-muted mt-1 text-sm">
            Editor visual para estructurar y modificar documentos JSON.
          </p>
        </div>

        <div className="flex gap-3">
          {/* REFACTORIZACIÓN: .btn-secondary */}
          <label className="btn-secondary">
            <FaFileImport className="text-primary" />
            <span>Importar</span>
            <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
          </label>

          {data && (
            /* REFACTORIZACIÓN: .btn-primary */
            <button onClick={handleExport} className="btn-primary">
              <FaDownload /> <span>Descargar</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 h-[75vh]">

        {/* Columna Izquierda */}
        <section className="panel">
          <div className="panel-header">
            <h2 className="font-bold text-text-main text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span> Editor Visual
            </h2>
            <span className="text-xs text-text-muted">Modo interactivo</span>
          </div>
          <div className="flex-1 overflow-auto p-4 custom-scrollbar">
            {data ? (
              <JsonNode
                name="root" value={data} path={[]}
                onUpdate={handleUpdate} onDelete={handleDelete} onAdd={handleAdd}
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-text-muted border-2 border-dashed border-border rounded-lg m-4">
                <FaFileImport size={40} className="mb-4 text-slate-200" />
                <p>Importa un archivo JSON para comenzar</p>
              </div>
            )}
          </div>
        </section>

        {/* Columna Derecha */}
        <section className="bg-[#1e293b] rounded-xl shadow-lg flex flex-col overflow-hidden text-slate-300 font-mono text-xs">
          <div className="p-3 border-b border-slate-700 bg-[#0f172a] flex items-center gap-2">
            <FaCode className="text-blue-400" />
            <h2 className="font-semibold text-slate-100">Vista Previa</h2>
          </div>
          <div className="flex-1 overflow-auto p-4 custom-scrollbar">
            <pre className="text-green-400">{JSON.stringify(data, null, 2)}</pre>
          </div>
        </section>

      </main>
    </div>
  );
}

export default App;