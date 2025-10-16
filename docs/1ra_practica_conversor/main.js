const valorInput = document.getElementById('valorInput');
const selectDe = document.getElementById('selectDe');
const selectA = document.getElementById('selectA');
const resultadoInput = document.getElementById('resultadoInput');
const convertirBtn = document.getElementById('convertirBtn');
const radios = document.getElementsByName('tipo');

var conversor = {
    name: "Conversor",
    version: "1.0.0",
    autor: "Tu Nombre",
    num1: 0,
    num2: 0,

    mxadl: function () {
        console.log("Iniciando Conversor");
    },

    opciones: {
        divisas: ["Dólar", "Euro", "Peso"],
        unidades: ["Centímetros", "Metros"],
        binario: ["Decimal", "Binario"]
    },

    reglas: {
        divisas: {
            "Dólar": { "Euro": 0.93, "Peso": 18.5, "Dólar": 1 },
            "Euro": { "Dólar": 1.07, "Peso": 20, "Euro": 1 },
            "Peso": { "Dólar": 0.054, "Euro": 0.05, "Peso": 1 }
        },
        unidades: {
            "Centímetros": { "Metros": v => v / 100, "Centímetros": v => v },
            "Metros": { "Centímetros": v => v * 100, "Metros": v => v }
        },
        binario: {
            "Decimal": { "Binario": v => v.toString(2), "Decimal": v => v },
            "Binario": { "Decimal": v => parseInt(v, 2), "Binario": v => v }
        }
    },

    convertir: function (tipo, de, a, valor) {
        if (tipo === "divisas") {
            return valor * this.reglas.divisas[de][a];
        }
        if (tipo === "unidades") {
            return this.reglas.unidades[de][a](valor);
        }
        if (tipo === "binario") {
            return this.reglas.binario[de][a](valor);
        }
        return valor;
    }
};


// --- Inicializar selects dinámicamente ---
function actualizarSelects() {
    const tipo = [...radios].find(r => r.checked).value;
    selectDe.innerHTML = '';
    selectA.innerHTML = '';

    conversor.opciones[tipo].forEach(op => {
        const option1 = document.createElement('option');
        option1.value = op;
        option1.textContent = op;

        const option2 = document.createElement('option');
        option2.value = op;
        option2.textContent = op;

        selectDe.appendChild(option1);
        selectA.appendChild(option2);
    });

    if (selectA.options.length > 1) selectA.selectedIndex = 1;
}

actualizarSelects();
radios.forEach(r => r.addEventListener('change', actualizarSelects));


// --- Evento convertir ---
convertirBtn.addEventListener('click', () => {
    const valor = valorInput.value;
    const tipo = [...radios].find(r => r.checked).value;
    const de = selectDe.value;
    const a = selectA.value;

    if (!valor) {
        resultadoInput.value = "Ingresa un número válido";
        return;
    }

    let res = conversor.convertir(tipo, de, a, valor);
    resultadoInput.value = res;
});

