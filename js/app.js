var calculator = (function() {
    var value1 = 0;
    var value2 = 0;
    var temp = 0;
    var result = 0;
    var op = '';
    var operations = ['mas', 'menos', 'por', 'dividido'];
    
    var getNumber = function(number, display) {
        if (number === '0' && display.textContent === '0') {
            display.textContent = '0';
        } else {
            if (display.textContent === '0' || display.textContent === '') {
                display.textContent = number;
            } else {
                display.textContent += number;
            }
        }
    }

    var calculate = function(display) {
        switch(op) {
            case operations[0]:
                result = value1 + value2;
                break;
            case operations[1]:
                result = value1 - value2;
                break;
            case operations[2]:
                result = value1 * value2;
                break;
            case operations[3]:
                result = value1 / value2;
                break;
        }

        if (op !== '') {
            result = result.toString();

            if (result.length <= 7) {
                display.textContent = result;
            } else {
                display.textContent = result.substring(0, 8);
            }
        }
    }

    var onclick = function(e) {
        var target = e.target;
        target.style.transform = 'scale(0.9)';
        var display = document.getElementById('display');
        var key = target.id;
        var notEmpty = display.textContent !== '0' && display.textContent !== '';

        if (operations.includes(key)) {
            op = target.id;
            key = 'op';
        }

        switch(key) {
            case 'on':
                display.textContent = '0';
                value1 = 0;
                value2 = 0;
                temp = 0;
                result = 0;
                break;
            case 'sign':
                if (notEmpty && !display.textContent.includes('-')) {
                    display.textContent = '-' + display.textContent;
                }
                break;
            case 'raiz':
                break;
            case 'op':
                if (notEmpty) {
                    value1 = display.textContent.includes('.') ? parseFloat(display.textContent) : parseInt(display.textContent);
                    display.textContent = '';

                    if (temp !== 0) {
                        temp = 0;
                    }
                }
                break;
            case 'punto':
                display.textContent += '.';
                break;
            case 'igual':
                if (notEmpty) {
                    value2 = display.textContent.includes('.') ? parseFloat(display.textContent) : parseInt(display.textContent);

                    if (temp === 0) {
                        temp = value2;
                    } else {
                        value1 = value2;
                        value2 = temp;
                    }
                    
                    calculate(display);
                }
                break;
            default: 
                if (display.textContent.length <= 7) {
                    getNumber(key, display);
                }
                break;
        }

        setTimeout(function() {
            target.removeAttribute('style');
        }, 100);
    }

    return {
        init: function() {
            var keys = document.querySelectorAll('.tecla');

            for (var key of keys) {
                key.addEventListener('click', onclick);
            }
        }
    }
})();

calculator.init();