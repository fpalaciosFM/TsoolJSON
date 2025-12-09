import React, { useState, useEffect } from 'react';
import { FaFileImport, FaDownload, FaCode, FaMoon, FaSun } from 'react-icons/fa';
import JsonNode from './components/JsonNode';

function App() {
  const [data, setData] = useState(null);
  const [fileName, setFileName] = useState("data.json");

  // 1. Estado para el modo oscuro
  const [darkMode, setDarkMode] = useState(() => {
    // Verificar preferencia guardada o del sistema
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // 2. Efecto para aplicar la clase 'dark' al HTML
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  // --- FUNCIONES RESTAURADAS ---

  // 1. Cargar Archivo
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
        alert("El archivo no es un JSON válido.");
      }
    };
    reader.readAsText(file);
  };

  // 2. Modificar (Update)
  const handleUpdate = (path, newValue) => {
    const newData = structuredClone(data);
    let current = newData;
    for (let i = 0; i < path.length - 1; i++) current = current[path[i]];
    current[path[path.length - 1]] = newValue;
    setData(newData);
  };

  // 3. Eliminar (Delete)
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

  // 4. Agregar (Add)
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
    <div className="min-h-screen p-6 font-sans transition-colors duration-300">

      {/* Header */}
      <header className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-4 border-b pb-6" style={{ borderColor: 'var(--border-color)' }}>
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight" style={{ color: 'var(--text-main)' }}>
              Tsool <span style={{ color: 'var(--color-primary)' }}>JSON</span>
            </h1>
            <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
              Editor visual para estructurar y modificar documentos JSON.
            </p>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          {/* Botón Toggle Dark Mode */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-all hover:bg-black/5 dark:hover:bg-white/10 text-xl cursor-pointer"
            style={{ color: 'var(--text-main)' }}
            title="Cambiar tema"
          >
            {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-slate-600" />}
          </button>

          <div className="w-px h-8 bg-gray-300 dark:bg-gray-700 mx-1"></div>

          {/* Botón Importar */}
          <label className="btn-secondary">
            <FaFileImport style={{ color: 'var(--color-primary)' }} />
            <span>Importar</span>
            <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
          </label>

          {/* Botón Descargar */}
          {data && (
            <button onClick={handleExport} className="btn-primary">
              <FaDownload /> <span>Descargar</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 h-[75vh]">

        {/* Columna Izquierda: Editor */}
        <section className="panel">
          <div className="panel-header">
            <h2 className="font-bold text-sm flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }}></span> Editor Visual
            </h2>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Modo interactivo</span>
          </div>
          <div className="flex-1 overflow-auto p-4 custom-scrollbar">
            {data ? (
              <JsonNode
                name="root" value={data} path={[]}
                onUpdate={handleUpdate} onDelete={handleDelete} onAdd={handleAdd}
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center border-2 border-dashed rounded-lg m-4" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
                <FaFileImport size={40} className="mb-4 opacity-30" />
                <p>Importa un archivo JSON para comenzar</p>
              </div>
            )}
          </div>
        </section>

        {/* Columna Derecha: Vista Previa */}
        <section className="rounded-xl shadow-lg flex flex-col overflow-hidden text-xs font-mono bg-[#1e293b] text-slate-300">
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