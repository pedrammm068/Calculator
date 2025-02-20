const buttons = document.querySelectorAll(".button-class")
const symbols = document.querySelectorAll(".btn-class")
const input = document.getElementById("input")
const prive = document.getElementById("prive")
const numis = JSON.parse(localStorage.getItem("numis")) || []
const state = {
    FirstValue: "0",
    FirstNumber: null,
    symbol: null,
    IsCalculated: false,
    Isloprive: "",
}


function updateState(value) {

    if (value === "del all") {
        state.FirstValue = "0"
        state.FirstNumber = null
        state.symbol = null
        state.IsCalculated = false
        state.Isloprive = ""
    } else if (value.includes("del")) {
        if (state.FirstValue.length > 1) {
            state.FirstValue = state.FirstValue.slice(0, -1)
        } else {
            state.FirstValue = "0"
        }
    }

    else if (["+", "-", "÷", "×"].includes(value)) {
        if (state.symbol !== null ?? state.FirstNumber !== null) {
            const res = calculate(
                state.FirstNumber,
                state.symbol,
                state.FirstValue)
            state.FirstValue = res.toString()
            state.IsCalculated = true
        }
        state.FirstNumber = state.FirstValue
        state.symbol = value
        state.Isloprive = `${state.FirstNumber} ${state.symbol}`
        state.FirstValue = "0"
    } else if (value === "=") {
        if (state.symbol ?? state.FirstNumber !== null) {
            const res = calculate(
                state.FirstNumber,
                state.symbol,
                state.FirstValue)
            state.FirstValue = res.toString()
            state.IsCalculated = true
                state.symbol = null
            state.FirstNumber = null
        }
    } else if (value === ".") {
        if (!state.FirstValue.includes(".")) {
            state.FirstValue += ".";


        }
    }
    else {
        if (state.FirstValue === "0" || state.IsCalculated) {
            state.FirstValue = value;
            state.IsCalculated = false;
        } else {
            state.FirstValue += value;
        }
        if (state.symbol !== null ?? state.FirstNumber !== null) {
            state.Isloprive = `${state.FirstNumber} ${state.symbol} ${state.FirstValue}`

        }
    }
    input.value = state.FirstValue
    prive.textContent = state.Isloprive
    state.Isloprive = ""
    localStorage.setItem("numis", JSON.stringify(state))

}
function calculate(FirstNumber, symbol, FirstValue) {
    const num1 = Number(FirstNumber)
    const num2 = Number(FirstValue)
    if (symbol === "+") {
        return num1 + num2
    }

    if (symbol === "-") {
        return num1 - num2
    }
    if (symbol === "×") {
        return num1 * num2
    }
    if (symbol === "÷") {
        if (num2 === 0) {
            return "خطا بر روی انجام تقسیم 0"
        }
        return num1 / num2
    }
    return 0
}


function handelnumber(evt) {
    console.log(evt.target.value)
}
















for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", (event) => {
        updateState(event.target.value)
    })
}
for (let i = 0; i < symbols.length; i++) {
    symbols[i].addEventListener("click", (event) => {
        updateState(event.target.value)
    })
}
