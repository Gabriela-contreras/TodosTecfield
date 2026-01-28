const SelectFilter = ({ filter, onFilterChange }) => {
    return (
        <div className="p-3">
            <select 
                name="filtertasks" 
                id="filtertasks" 
                value={filter}
                className="w-full h-9 px-3 py-1 rounded-md border text-sm sm:text-base shadow-xs transition-[color,box-shadow] outline-none bg-secondary" 
                onChange={(e) => onFilterChange(e.target.value)}
            >
                <option value="all" className="text-foreground bg-secondary">Todas</option>
                <option value="pendiente" className="text-foreground bg-secondary">Pendientes</option>
                <option value="completada" className="text-foreground bg-secondary">Completadas</option>
            </select>
        </div>
    )
}

export default SelectFilter