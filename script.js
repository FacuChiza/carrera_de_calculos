document.addEventListener('DOMContentLoaded', function() {
    const numberDisplay = document.getElementById('number-display');
    const startButton = document.getElementById('start-button');
    const numberCounter = document.getElementById('number-counter');
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
    const TOTAL_NUMBERS = 15;
    const NEGATIVE_COUNT = 6;
    const POSITIVE_COUNT = 9;

    // Función para generar un número aleatorio entre -9 y 9 (excluyendo 0)
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

    // Función para generar el número inicial (positivo)
    function generateInitialNumber() {
        return Math.floor(Math.random() * 9) + 1; // Números del 1 al 9
    }

    // Función para generar todos los números del juego con distribución específica
    function generateGameNumbers() {
        numbers = [];
        
        // Crear arrays separados para números positivos y negativos
        let positiveNumbers = [];
        let negativeNumbers = [];
        
        // Generar 9 números positivos únicos
        while (positiveNumbers.length < POSITIVE_COUNT) {
            const num = Math.floor(Math.random() * 9) + 1;
            if (!positiveNumbers.includes(num)) {
                positiveNumbers.push(num);
            }
        }
        
        // Generar 6 números negativos únicos
        while (negativeNumbers.length < NEGATIVE_COUNT) {
            const num = -(Math.floor(Math.random() * 9) + 1);
            if (!negativeNumbers.includes(num)) {
                negativeNumbers.push(num);
            }
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
            
            // Si es el último número, mostrar el signo + o - antes del número
            if (currentNumberIndex === TOTAL_NUMBERS) {
                setTimeout(() => {
                    showAnswerSection();
                }, 1500); // Cambiado a 1.5 segundos
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
        const isCorrect = userAnswer === finalResult;
        
        resultMessage.textContent = isCorrect ? 
            `¡Correcto! El resultado es ${finalResult} (${initialNumberValue} + ${currentSum})` : 
            `Incorrecto. El resultado correcto es ${finalResult} (${initialNumberValue} + ${currentSum})`;
        
        resultMessage.className = `result-message ${isCorrect ? 'correct' : 'incorrect'}`;
        resultMessage.style.display = 'block';
        
        // Ocultar la sección de respuesta
        answerSection.style.display = 'none';
        
        // Habilitar el botón para reiniciar
        startButton.disabled = false;
        startButton.textContent = 'REINICIAR';
        startButton.style.backgroundColor = '#FF9800';
    }

    // Función para generar nuevo juego (números iniciales y secuencia)
    function generateNewGame() {
        // Generar número inicial
        initialNumberValue = generateInitialNumber();
        
        // Mostrar el número inicial grande en el display principal
        numberDisplay.textContent = `+${initialNumberValue}`;
        numberDisplay.style.color = '#000'; // Color negro para el número inicial
        
        // Generar nuevos números para el juego
        generateGameNumbers();
        
        // Mostrar 0 en el contador
        numberCounter.textContent = '0';
    }

    // Función para iniciar el juego
    function startGame() {
        if (isGameRunning) return;
        
        // Reiniciar variables
        currentNumberIndex = 0;
        currentSum = 0;
        
        isGameRunning = true;
        startButton.textContent = 'STOP';
        startButton.style.backgroundColor = '#f44336';
        
        // Ocultar elementos de resultado anterior
        resultMessage.style.display = 'none';
        answerSection.style.display = 'none';
        
        // Generar el primer número inmediatamente
        updateNumber();
        
        // Configurar el intervalo para cambiar números cada 1.5 segundos
        gameInterval = setInterval(updateNumber, 1500);
    }

    // Función para detener el juego
    function stopGame() {
        if (!isGameRunning) return;
        
        isGameRunning = false;
        startButton.textContent = 'START';
        startButton.style.backgroundColor = '#4CAF50';
        
        // Limpiar el intervalo
        clearInterval(gameInterval);
        
        // Mostrar 0 cuando se detiene
        numberDisplay.textContent = '0';
        numberDisplay.style.color = '#000';
        numberCounter.textContent = '0';
        
        // Ocultar secciones
        answerSection.style.display = 'none';
        resultMessage.style.display = 'none';
    }

    // Función para reiniciar el juego
    function resetGame() {
        stopGame();
        generateNewGame();
    }

    // Generar el primer juego al cargar la página
    generateNewGame();

    // Event listener para el botón start/stop/reset
    startButton.addEventListener('click', function() {
        if (isGameRunning) {
            stopGame();
        } else if (startButton.textContent === 'REINICIAR') {
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
