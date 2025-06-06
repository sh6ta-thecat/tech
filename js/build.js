document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('pc-builder-form');
    const totalPriceElement = document.getElementById('total-price');
    const pcImage = document.getElementById('pc-image');
    const saveButton = document.getElementById('save-config');
    
    // Componentes y sus precios
    const components = {
        cpu: { element: document.getElementById('cpu-select'), price: 0 },
        gpu: { element: document.getElementById('gpu-select'), price: 0 },
        ram: { element: document.getElementById('ram-select'), price: 0 },
        storage: { element: document.getElementById('storage-select'), price: 0 },
        case: { element: document.getElementById('case-select'), price: 0 },
        rgb: { element: document.getElementById('rgb-select'), price: 0 }
    };
    
    // Cargar configuración guardada si existe
    loadSavedConfig();
    
    // Actualizar precios cuando cambia cualquier selección
    Object.values(components).forEach(component => {
        component.element.addEventListener('change', updateTotalPrice);
    });
    
    // Actualizar precio total y vista previa
    function updateTotalPrice() {
        let total = 0;
        
        // Calcular total
        Object.values(components).forEach(component => {
            component.price = parseInt(component.element.selectedOptions[0].dataset.price);
            total += component.price;
        });
        
        // Actualizar UI
        totalPriceElement.textContent = `$${total}`;
        updatePcPreview();
    }
    
    // Actualizar imagen de vista previa según gabinete y RGB
    function updatePcPreview() {
        const caseType = components.case.element.value;
        const hasRGB = components.rgb.element.value !== 'none';
        
        let imageName = 'pc-';
        imageName += caseType;
        imageName += hasRGB ? '-rgb' : '';
        imageName += '.png';
        
        pcImage.src = `assets/img/${imageName}`;
    }
    
    // Guardar configuración
    saveButton.addEventListener('click', function() {
        const config = {
            cpu: components.cpu.element.value,
            gpu: components.gpu.element.value,
            ram: components.ram.element.value,
            storage: components.storage.element.value,
            case: components.case.element.value,
            rgb: components.rgb.element.value,
            total: parseInt(totalPriceElement.textContent.replace('$', ''))
        };
        
        localStorage.setItem('techstylePcConfig', JSON.stringify(config));
        alert('Configuración guardada. Puedes continuar más tarde desde donde quedaste.');
    });
    
    // Cargar configuración guardada
    function loadSavedConfig() {
        const savedConfig = localStorage.getItem('techstylePcConfig');
        if (savedConfig) {
            const config = JSON.parse(savedConfig);
            
            // Seleccionar las opciones guardadas
            Object.keys(config).forEach(key => {
                if (components[key]) {
                    const element = components[key].element;
                    for (let i = 0; i < element.options.length; i++) {
                        if (element.options[i].value === config[key]) {
                            element.selectedIndex = i;
                            break;
                        }
                    }
                }
            });
            
            // Actualizar precio y vista previa
            updateTotalPrice();
        }
    }
    
    // Inicializar precio
    updateTotalPrice();
});