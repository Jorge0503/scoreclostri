/**
 * Lógica de la Calculadora del SCORE PROPIO de Mortalidad en C. Difficile.
 * Datos de Mortalidad Observada y Grupos de Riesgo (Fuentes 14 y 20).
 */

// =================================================================
// 1. DATOS Y VARIABLES GLOBALES (DEBEN ESTAR FUERA DE LA FUNCIÓN)
// =================================================================

const mortalityData = {
    '0': '0.3%',
    [cite_start]'1': '0.3%', // Agrupado 0-1 [cite: 14]
    '2': '0.6%',
    [cite_start]'3': '0.6%', // Agrupado 2-3 [cite: 14]
    '4': '1.8%',
    [cite_start]'5': '1.8%', // Agrupado 4-5 [cite: 14]
    '6': '2.5%',
    '7': '6.1%',
    '8': '7.3%',
    '9': '10.6%',
    '10': '14.3%',
    '11': '17.6%',
    '12': '23.0%',
    '13': '28.3%',
    '14': '33.7%',
    '15': '39.3%',
    [cite_start]'16+': '45.8%' // Agrupado 16 o más [cite: 7, 14]
};

const riskGroups = [
    [cite_start]{ maxScore: 6, name: 'Bajo Riesgo', mortality: '<5% (1.9%)', color: '#4CAF50' }, // Verde [cite: 20]
    [cite_start]{ maxScore: 10, name: 'Riesgo Medio', mortality: '5-20% (9.7%)', color: '#FF9800' }, // Naranja [cite: 20]
    [cite_start]{ maxScore: Infinity, name: 'Alto Riesgo', mortality: '>20% (25.5%)', color: '#F44336' } // Rojo [cite: 20]
];


// =================================================================
// 2. FUNCIÓN DE CÁLCULO
// =================================================================

function calculateScore() {
    let totalScore = 0;
    
    // 1. Sumar puntos de Checkboxes
    const checkboxes = document.querySelectorAll('#score-form input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        totalScore += parseInt(checkbox.getAttribute('data-points') || 0);
    });
    
    // 2. Sumar puntos de la Edad (Select)
    const ageSelect = document.getElementById('age-select');
    const ageMultiplier = parseInt(ageSelect.value || 0);
    const agePoints = ageMultiplier * parseInt(ageSelect.getAttribute('data-points') || 0);
    totalScore += agePoints;

    // 3. Mostrar Puntuación Total
    document.getElementById('total-score').textContent = totalScore;
    
    // 4. Determinar Mortalidad Observada
    let mortalityRate = '';
    
    if (totalScore >= 16) {
        mortalityRate = mortalityData['16+']; 
    } else if (totalScore >= 0) {
        [cite_start]// Manejar agrupaciones específicas [cite: 14]
        if (totalScore <= 1) mortalityRate = mortalityData['0']; 
        else if (totalScore <= 3 && totalScore >= 2) mortalityRate = mortalityData['2']; 
        else if (totalScore <= 5 && totalScore >= 4) mortalityRate = mortalityData['4']; 
        else {
             mortalityRate = mortalityData[String(totalScore)] || 'N/A';
        }
    }

    document.getElementById('mortality-rate').textContent = mortalityRate;
    
    // 5. Determinar Grupo de Riesgo y Estilo
    const riskGroupElement = document.getElementById('risk-group');
    const groupNameElement = document.getElementById('group-name');
    let groupFound = false;

    // Reiniciar color
    riskGroupElement.style.backgroundColor = '#ccc'; 

    riskGroups.forEach(group => {
        if (!groupFound && totalScore <= group.maxScore) {
            groupNameElement.textContent = `${group.name} (${group.mortality})`; 
            riskGroupElement.style.backgroundColor = group.color; 
            groupFound = true;
        }
    });

    // 6. Mostrar el Área de Resultados
    document.getElementById('results-area').classList.remove('hidden');
    
    // Desplazarse hacia los resultados
    document.getElementById('results-area').scrollIntoView({ behavior: 'smooth' });
}
