const myTaxService = {
    MyTaxService: {
        TaxPort: {
            CalculateTax(args, callback) {
                const { income, taxRate } = args;

                // Спробуємо перетворити значення
                const parsedIncome = parseFloat(income);
                const parsedTaxRate = parseFloat(taxRate);

                // Військовий збір - він буде незмінним
                const militaryTaxRate = 1.5;

                // Перевіримо, чи є введені дані числами
                const isNumber = !isNaN(parsedIncome) && !isNaN(parsedTaxRate);

                // Якщо хоча б одне із значень не є числом
                if (!isNumber) {
                    return callback({
                        Fault: {
                            faultcode: 'Client',
                            faultstring: "Невалідні дані. Всі значення мають бути числами."
                        }
                    });
                }

                // Перевіримо, чи є введені числа невід'ємними
                const isValidValue = parsedIncome >= 0 && parsedTaxRate >= 0;

                // Якщо хоча б одне з них від'ємне
                if (!isValidValue) {
                    return callback({
                        Fault: {
                            faultcode: 'Client',
                            faultstring: "Невалідні дані. Всі значення мають бути невід'ємними."
                        }
                    });
                }

                // Перевіримо, чи є податкова ставка завеликою або замалою
                const isReasonable = parsedTaxRate >= 5 && parsedTaxRate <= 40

                // Якщо податкова ставка завелика або замала
                if (!isReasonable) {
                    return callback({
                        Fault: {
                            faultcode: 'Client',
                            faultstring: "Податкова ставка або замала, або завелика."
                        }
                    });
                }

                // Порахуємо, скільки звичайного податку треба сплатити
                const taxAmount = (parseFloat(income) * parseFloat(taxRate)) / 100;
                // Порахуємо, скільки військового збору треба сплатити
                const militaryTaxAmount = (parseFloat(income) * parseFloat(militaryTaxRate)) / 100;
                // Порахуємо загальну суму до сплати
                const totalTaxAmount = taxAmount + militaryTaxAmount;

                // Повертаємо результат користувачеві
                return callback(null, {
                    taxAmount: taxAmount.toFixed(2),
                    militaryTaxAmount: militaryTaxAmount.toFixed(2),
                    totalTaxAmount: totalTaxAmount.toFixed(2)
                });
            }
        }
    }
};

module.exports = myTaxService;