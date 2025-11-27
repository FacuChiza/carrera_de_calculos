document.addEventListener('DOMContentLoaded', function() {
    const numberDisplay = document.getElementById('number-display');
    const startButton = document.getElementById('start-button');
    const numberCounter = document.getElementById('number-counter');
    const levelCounter = document.getElementById('level-counter');
    const answerSection = document.getElementById('answer-section');
    const answerInput = document.getElementById('answer-input');
    const submitButton = document.getElementById('submit-button');
    const resultMessage = document.getElementById('result-message');
    
    let gameInterval;
    let isGameRunning = false;
    let currentNumberIndex = 0;
    let numbers = [];
    let currentSum = 0;
    let initialNumberValue = 0;
    let currentLevel = 1;
    let gameStartTime = 0; // Para tracking preciso del tiempo
    const TOTAL_NUMBERS = 15;
    const NEGATIVE_COUNT = 6;
    const POSITIVE_COUNT = 9;
    
         // Configuración de niveles
     const LEVELS = {
         1: { speed: 3000, name: "Fácil" },      // 3 segundos (más lento)
         2: { speed: 2500, name: "Intermedio" }  // 2.5 segundos
     };

    // Función para generar un número aleatorio entre -9 y 9 (excluyendo 0)
    // Nota: Esta función puede no usarse actualmente, pero se mantiene por compatibilidad
    function generateRandomNumber() {
        const random = Math.random();
        
        // 60% de probabilidad de números negativos
        if (random < 0.6) {
            // Números negativos del -9 al -1
            return -(Math.floor(Math.random() * 9) + 1);
        } else {
            // Números positivos del 1 al 9
            return Math.floor(Math.random() * 9) + 1;
        }
    }

    // Función para generar el número inicial (positivo de una cifra)
    function generateInitialNumber() {
        return Math.floor(Math.random() * 9) + 1; // Números del 1 al 9
    }

    // Función para generar todos los números del juego con distribución específica
    function generateGameNumbers() {
        numbers = [];
        
        // Crear arrays separados para números positivos y negativos
        let positiveNumbers = [];
        let negativeNumbers = [];
        
        // Generar 9 números positivos de una cifra (1-9) - permitir repeticiones para más facilidad
        for (let i = 0; i < POSITIVE_COUNT; i++) {
            positiveNumbers.push(Math.floor(Math.random() * 9) + 1); // Números del 1 al 9
        }
        
        // Generar 6 números negativos de una cifra (-1 a -9) - permitir repeticiones para más facilidad
        for (let i = 0; i < NEGATIVE_COUNT; i++) {
            negativeNumbers.push(-(Math.floor(Math.random() * 9) + 1)); // Números del -9 al -1
        }
        
        // Combinar y mezclar los números
        let allNumbers = [...positiveNumbers, ...negativeNumbers];
        
        // Mezclar aleatoriamente el array
        for (let i = allNumbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allNumbers[i], allNumbers[j]] = [allNumbers[j], allNumbers[i]];
        }
        
        // Asegurar que no haya números iguales seguidos
        for (let i = 0; i < allNumbers.length; i++) {
            if (i > 0 && allNumbers[i] === allNumbers[i - 1]) {
                // Si hay números iguales seguidos, intercambiar con otro número
                let swapIndex = (i + 1) % allNumbers.length;
                while (swapIndex !== i && (allNumbers[swapIndex] === allNumbers[i] || allNumbers[swapIndex] === allNumbers[i - 1])) {
                    swapIndex = (swapIndex + 1) % allNumbers.length;
                }
                if (swapIndex !== i) {
                    [allNumbers[i], allNumbers[swapIndex]] = [allNumbers[swapIndex], allNumbers[i]];
                }
            }
        }
        
        numbers = allNumbers;
    }

    // Función para verificar que el primer número no sea igual al número inicial
    function ensureFirstNumberDifferent() {
        if (numbers.length > 0 && Math.abs(numbers[0]) === initialNumberValue) {
            // Si el primer número es igual al inicial, buscar otro número para intercambiar
            for (let i = 1; i < numbers.length; i++) {
                if (Math.abs(numbers[i]) !== initialNumberValue) {
                    // Intercambiar el primer número con este
                    [numbers[0], numbers[i]] = [numbers[i], numbers[0]];
                    break;
                }
            }
        }
        
        // Verificar también que no haya números consecutivos iguales en toda la secuencia
        for (let i = 0; i < numbers.length - 1; i++) {
            if (Math.abs(numbers[i]) === Math.abs(numbers[i + 1])) {
                // Si hay números consecutivos iguales, buscar un número diferente para intercambiar
                for (let j = i + 2; j < numbers.length; j++) {
                    if (Math.abs(numbers[j]) !== Math.abs(numbers[i])) {
                        // Intercambiar el número problemático
                        [numbers[i + 1], numbers[j]] = [numbers[j], numbers[i + 1]];
                        break;
                    }
                }
            }
        }
    }

    // Función para formatear el número con signo
    function formatNumber(number) {
        if (number > 0) {
            return `+${number}`;
        } else {
            return number.toString();
        }
    }

    // Función para obtener el color según el número
    function getNumberColor(number) {
        if (number > 0) {
            return '#2E7D32'; // Verde para números positivos
        } else {
            return '#C62828'; // Rojo para números negativos
        }
    }

    // Función para actualizar el display del nivel
    function updateLevelDisplay() {
        levelCounter.textContent = `${currentLevel}`;
        
        // Cambiar el color del contador según el nivel
        const levelCounterElement = document.querySelector('.level-counter');
        if (currentLevel === 1) {
            levelCounterElement.style.background = 'linear-gradient(45deg, #4CAF50, #8BC34A)'; // Verde
        } else if (currentLevel === 2) {
            levelCounterElement.style.background = 'linear-gradient(45deg, #FF9800, #FFC107)'; // Naranja
        }
    }

    // Función para avanzar al siguiente nivel
    function levelUp() {
        if (currentLevel < 2) {
            currentLevel++;
            updateLevelDisplay();
            return true;
        }
        return false;
    }

    // Función para actualizar el número en pantalla
    function updateNumber() {
        if (currentNumberIndex < TOTAL_NUMBERS) {
            const currentNumber = numbers[currentNumberIndex];
            numberDisplay.textContent = formatNumber(currentNumber);
            numberDisplay.style.color = getNumberColor(currentNumber);
            numberCounter.textContent = currentNumberIndex + 1;
            
            // Actualizar la suma acumulativa
            currentSum += currentNumber;
            
            currentNumberIndex++;
            
            // Si es el último número, mostrar la sección de respuesta después del tiempo del nivel
            if (currentNumberIndex === TOTAL_NUMBERS) {
                // Usar setTimeout con el tiempo exacto del nivel para mantener consistencia
                const currentSpeed = LEVELS[currentLevel].speed;
                setTimeout(() => {
                    if (isGameRunning) { // Verificar que el juego aún esté corriendo
                        showAnswerSection();
                    }
                }, currentSpeed);
            }
        }
    }

    // Función para mostrar la sección de respuesta
    function showAnswerSection() {
        answerSection.style.display = 'block';
        answerInput.focus();
        startButton.disabled = true;
    }

    // Función para verificar la respuesta
    function checkAnswer() {
        const userAnswer = parseInt(answerInput.value);
        const finalResult = initialNumberValue + currentSum; // Sumar el número inicial
        
        // Validar que en el nivel 2 el resultado sea de un dígito (solo para debugging)
        if (currentLevel === 2 && (finalResult < -9 || finalResult > 9)) {
            console.warn('Advertencia: El resultado final del nivel 2 debería ser de un dígito, pero es:', finalResult);
        }
        
        const isCorrect = userAnswer === finalResult;
        
        let message = '';
        if (isCorrect) {
            if (currentLevel < 2) {
                const leveledUp = levelUp();
                if (leveledUp) {
                    message = `¡Correcto! Has avanzado al Nivel ${currentLevel}. Resultado: ${finalResult} (${initialNumberValue} + ${currentSum})`;
                    // Generar nuevo juego para el siguiente nivel
                    setTimeout(() => {
                        generateNewGame();
                        answerInput.value = '';
                    }, 3000);
                }
            } else {
                message = `¡Felicitaciones! Has completado todos los niveles. Resultado: ${finalResult} (${initialNumberValue} + ${currentSum})`;
            }
        } else {
            message = `Incorrecto. El resultado correcto es ${finalResult} (${initialNumberValue} + ${currentSum})`;
        }
        
        resultMessage.textContent = message;
        resultMessage.className = `result-message ${isCorrect ? 'correct' : 'incorrect'}`;
        resultMessage.style.display = 'block';
        
        // Ocultar la sección de respuesta
        answerSection.style.display = 'none';
        
        // Habilitar el botón para reiniciar
        startButton.disabled = false;
        
        if (isCorrect && currentLevel <= 2) {
            startButton.textContent = currentLevel === 2 ? 'NUEVO JUEGO' : 'CONTINUAR';
            startButton.style.backgroundColor = currentLevel === 2 ? '#4CAF50' : '#FF9800';
        } else {
            startButton.textContent = 'REINICIAR';
            startButton.style.backgroundColor = '#FF9800';
        }
    }

    // Función para ajustar números en el nivel 2 para garantizar resultado de un dígito
    function adjustNumbersForLevel2() {
        let sumOfNumbers = numbers.reduce((sum, num) => sum + num, 0);
        
        // Para que el resultado final sea de un dígito (-9 a 9) y el inicial esté entre 1 y 9,
        // necesitamos que: -9 <= inicial + suma <= 9
        // Para garantizar que siempre haya un inicial (1-9) que produzca resultado de un dígito,
        // necesitamos: -9 <= inicial + suma <= 9
        // Con inicial mínimo 1: 1 + suma >= -9, entonces suma >= -10
        // Con inicial máximo 9: 9 + suma <= 9, entonces suma <= 0
        // Por lo tanto, suma debe estar entre -10 y 0
        const targetSumMin = -10;
        const targetSumMax = 0;
        
        // Si la suma está fuera del rango, ajustarla
        if (sumOfNumbers < targetSumMin || sumOfNumbers > targetSumMax) {
            // Calcular cuánto necesitamos cambiar
            const targetSum = sumOfNumbers < targetSumMin ? 
                Math.floor(Math.random() * 3) - 10 : // Entre -10 y -8
                Math.floor(Math.random() * 3) - 2;   // Entre -2 y 0
            
            const difference = targetSum - sumOfNumbers;
            
            // Distribuir el ajuste entre los números
            let remainingDiff = difference;
            const shuffledIndices = [...Array(numbers.length).keys()].sort(() => Math.random() - 0.5);
            
            for (let idx of shuffledIndices) {
                if (remainingDiff === 0) break;
                
                const currentNum = numbers[idx];
                let adjustment = 0;
                
                if (remainingDiff > 0) {
                    // Necesitamos aumentar la suma
                    if (currentNum < 9) {
                        adjustment = Math.min(remainingDiff, 9 - currentNum);
                    } else if (currentNum < 0) {
                        adjustment = Math.min(remainingDiff, -currentNum - 1); // Hacer menos negativo (máx hasta -1)
                    }
                } else {
                    // Necesitamos disminuir la suma
                    if (currentNum > 1) {
                        adjustment = Math.max(remainingDiff, 1 - currentNum);
                    } else if (currentNum > -9) {
                        adjustment = Math.max(remainingDiff, -9 - currentNum); // Hacer más negativo (máx hasta -9)
                    }
                }
                
                numbers[idx] += adjustment;
                remainingDiff -= adjustment;
            }
            
            // Recalcular suma después de ajustes
            sumOfNumbers = numbers.reduce((sum, num) => sum + num, 0);
        }
        
        return sumOfNumbers;
    }

    // Función para generar nuevo juego (números iniciales y secuencia)
    function generateNewGame() {
        // Generar número inicial
        initialNumberValue = generateInitialNumber();
        
        // Generar nuevos números para el juego
        generateGameNumbers();
        
        // Si estamos en el nivel 2, asegurar que el resultado final sea de un dígito
        if (currentLevel === 2) {
            // Ajustar números para que la suma esté en rango válido
            let sumOfNumbers = adjustNumbersForLevel2();
            
            // Calcular el rango válido para el número inicial
            // Queremos que: -9 <= initialNumberValue + sumOfNumbers <= 9
            // Por lo tanto: -9 - sumOfNumbers <= initialNumberValue <= 9 - sumOfNumbers
            // Pero también: 1 <= initialNumberValue <= 9 (solo una cifra)
            const minInitial = Math.max(1, -9 - sumOfNumbers);
            const maxInitial = Math.min(9, 9 - sumOfNumbers);
            
            // Si hay un rango válido, elegir un valor aleatorio dentro de él
            if (minInitial <= maxInitial) {
                initialNumberValue = Math.floor(Math.random() * (maxInitial - minInitial + 1)) + minInitial;
            } else {
                // Si no hay rango válido, ajustar sumOfNumbers nuevamente
                sumOfNumbers = adjustNumbersForLevel2();
                const newMinInitial = Math.max(1, -9 - sumOfNumbers);
                const newMaxInitial = Math.min(9, 9 - sumOfNumbers);
                
                if (newMinInitial <= newMaxInitial) {
                    initialNumberValue = Math.floor(Math.random() * (newMaxInitial - newMinInitial + 1)) + newMinInitial;
                } else {
                    // Último recurso: forzar un resultado válido
                    const targetResult = Math.floor(Math.random() * 19) - 9; // Entre -9 y 9
                    initialNumberValue = Math.max(1, Math.min(9, targetResult - sumOfNumbers));
                }
            }
            
            // Validación final: asegurar que el resultado sea de un dígito
            const finalResult = initialNumberValue + sumOfNumbers;
            if (finalResult < -9 || finalResult > 9) {
                // Ajustar el número inicial para garantizar resultado de un dígito
                if (sumOfNumbers > 9) {
                    initialNumberValue = 9 - sumOfNumbers;
                } else if (sumOfNumbers < -9) {
                    initialNumberValue = -9 - sumOfNumbers;
                } else {
                    // Si la suma está en rango, ajustar para que resultado esté en -9 a 9
                    const targetResult = Math.floor(Math.random() * 19) - 9;
                    initialNumberValue = targetResult - sumOfNumbers;
                }
                initialNumberValue = Math.max(1, Math.min(9, initialNumberValue));
            }
        }
        
        // Mostrar el número inicial grande en el display principal
        numberDisplay.textContent = `+${initialNumberValue}`;
        numberDisplay.style.color = '#000'; // Color negro para el número inicial
        
        // Asegurar que el primer número no sea igual al número inicial
        ensureFirstNumberDifferent();
        
        // Mostrar 0 en el contador
        numberCounter.textContent = '0';
        
        // Asegurar que el juego no esté corriendo
        isGameRunning = false;
        startButton.textContent = 'START';
        startButton.style.backgroundColor = '#4CAF50';
    }

    // Función para iniciar el juego
    function startGame() {
        if (isGameRunning) return;
        
        // Limpiar cualquier intervalo existente para evitar duplicados
        if (gameInterval) {
            clearInterval(gameInterval);
            gameInterval = null;
        }
        
        // Reiniciar variables
        currentNumberIndex = 0;
        currentSum = 0;
        gameStartTime = Date.now(); // Registrar el tiempo de inicio
        
        isGameRunning = true;
        startButton.textContent = 'STOP';
        startButton.style.backgroundColor = '#f44336';
        
        // Ocultar elementos de resultado anterior
        resultMessage.style.display = 'none';
        answerSection.style.display = 'none';
        
        // Generar el primer número inmediatamente
        updateNumber();
        
        // Configurar el intervalo según el nivel actual con tiempo exacto
        const currentSpeed = LEVELS[currentLevel].speed;
        gameInterval = setInterval(() => {
            if (isGameRunning) { // Verificar que el juego aún esté corriendo
                updateNumber();
            }
        }, currentSpeed);
    }

    // Función para detener el juego
    function stopGame() {
        if (!isGameRunning) return;
        
        isGameRunning = false;
        startButton.textContent = 'START';
        startButton.style.backgroundColor = '#4CAF50';
        
        // Limpiar el intervalo de manera segura
        if (gameInterval) {
            clearInterval(gameInterval);
            gameInterval = null;
        }
        
        // Mostrar el número inicial cuando se detiene (no 0)
        numberDisplay.textContent = `+${initialNumberValue}`;
        numberDisplay.style.color = '#000';
        numberCounter.textContent = '0';
        
        // Ocultar secciones
        answerSection.style.display = 'none';
        resultMessage.style.display = 'none';
    }

    // Función para reiniciar el juego
    function resetGame() {
        // Detener el juego de manera segura
        stopGame();
        
        // Asegurar que no haya intervalos activos
        if (gameInterval) {
            clearInterval(gameInterval);
            gameInterval = null;
        }
        
        // Generar un nuevo juego con nuevo número inicial
        generateNewGame();
    }

    // Generar el primer juego al cargar la página
    updateLevelDisplay();
    generateNewGame();

    // Event listener para el botón start/stop/reset
    startButton.addEventListener('click', function() {
        // Prevenir múltiples clics rápidos que puedan causar problemas de timing
        if (startButton.disabled) return;
        
        if (isGameRunning) {
            stopGame();
        } else if (startButton.textContent === 'REINICIAR') {
            resetGame();
        } else if (startButton.textContent === 'CONTINUAR') {
            startGame();
        } else if (startButton.textContent === 'NUEVO JUEGO') {
            // Reiniciar todo al nivel 1
            currentLevel = 1;
            updateLevelDisplay();
            resetGame();
        } else {
            startGame();
        }
    });

    // Event listener para el botón de verificar respuesta
    submitButton.addEventListener('click', checkAnswer);

    // Event listener para la tecla Enter en el input
    answerInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });
});
