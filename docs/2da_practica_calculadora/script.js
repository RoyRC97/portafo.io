
const calculadora = {
    // Propiedades para guardar información (el estado de la calculadora)
    displayValue: '0',      // El valor que se está mostrando en la pantalla.
    primerOperando: null,   // El primer número de una operación.
    esperandoSegundoOperando: false, // Un "switch" para saber si el próximo número es el segundo de la operación.
    operador: null,         // El operador (+, -, ×, ÷) que se seleccionó.


    operaciones: {
        '+': (primerOperando, segundoOperando) => primerOperando + segundoOperando,
        '-': (primerOperando, segundoOperando) => primerOperando - segundoOperando,
        '×': (primerOperando, segundoOperando) => primerOperando * segundoOperando,
        '÷': (primerOperando, segundoOperando) => primerOperando / segundoOperando,
        '=': (primerOperando, segundoOperando) => segundoOperando // Si se presiona '=', el resultado es el segundo número.
    },



    // Método para procesar la pulsación de un dígito.
    inputDigito: function(digito) {
        if (this.esperandoSegundoOperando) {
            this.displayValue = digito;
            this.esperandoSegundoOperando = false;
        } else {
            this.displayValue = this.displayValue === '0' ? digito : this.displayValue + digito;
        }
    },

    // Método para procesar el punto decimal.
    inputDecimal: function(punto) {
        // Si ya estamos esperando el segundo número, empezamos de "0."
        if (this.esperandoSegundoOperando) {
            this.displayValue = '0.';
            this.esperandoSegundoOperando = false;
            return;
        }
        // Si no hay un punto ya, lo añadimos.
        if (!this.displayValue.includes(punto)) {
            this.displayValue += punto;
        }
    },

    // Método para manejar los operadores (+, -, etc.)
    manejarOperador: function(proximoOperador) {
        const valorInput = parseFloat(this.displayValue);

        // Si ya hay un operador y estamos esperando el segundo número,
        // simplemente cambiamos el operador por el nuevo.
        if (this.operador && this.esperandoSegundoOperando) {
            this.operador = proximoOperador;
            return;
        }
        
        // Si es la primera vez que damos a un operador, guardamos el primer número.
        if (this.primerOperando === null) {
            this.primerOperando = valorInput;
        } else if (this.operador) {
            // Si ya teníamos un operador, calculamos el resultado.
            const resultado = this.operaciones[this.operador](this.primerOperando, valorInput);
            
            // Mostramos el resultado con un máximo de 7 decimales para evitar números muy largos.
            this.displayValue = `${parseFloat(resultado.toFixed(7))}`;
            this.primerOperando = resultado;
        }

        this.esperandoSegundoOperando = true;
        this.operador = proximoOperador;
    },

    // ac es para limpiar
    reset: function() {
        this.displayValue = '0';
        this.primerOperando = null;
        this.esperandoSegundoOperando = false;
        this.operador = null;
    },

    // borrar último digito
    borrarUltimoDigito: function() {
        if (this.displayValue.length > 1) {
            this.displayValue = this.displayValue.slice(0, -1);
        } else {
            this.displayValue = '0';
        }
    },

    // Método para actualizar la pantalla
    actualizarDisplay: function() {
        const display = document.getElementById('display');
        display.innerText = this.displayValue;
    }
};

// --- CONECTANDO EL OBJETO CON EL HTML ---

// Esta función se encarga de "escuchar" los clics en los botones
// y llamar al método correcto del objeto 'calculadora'.
function iniciarCalculadora() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const valor = event.target.innerText; // El texto del botón ('7', '+', 'AC')

            switch (valor) {
                case '+':
                case '-':
                case '×':
                case '÷':
                case '=':
                    calculadora.manejarOperador(valor);
                    break;
                case '.':
                    calculadora.inputDecimal(valor);
                    break;
                case 'AC':
                    calculadora.reset();
                    break;
                case '⌫':
                    calculadora.borrarUltimoDigito();
                    break;
                case '( )': // Sin función en esta versión
                case '%':   // Sin función en esta versión
                    break;
                default:
                    // Si es un número, llama a inputDigito
                    if (!isNaN(parseFloat(valor))) {
                        calculadora.inputDigito(valor);
                    }
            }
            // Después de cualquier acción, actualizamos la pantalla.
            calculadora.actualizarDisplay();
        });
    });
    // Al iniciar, nos aseguramos que la pantalla muestre el valor inicial.
    calculadora.actualizarDisplay();
}

// ¡Iniciamos todo!
iniciarCalculadora();