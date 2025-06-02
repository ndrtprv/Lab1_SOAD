# Lab1_SOAD
Простий Node.js/Express.js вебсервіс, який надає SOAP шляхи для розрахунку податку.

# Особливості
- SOAP шляхи для розрахунку податку (окремо звичайний податок, окремо військовий збір, та сумарно).
- Обробка виняткових ситуацій (нечислові значення, від'ємні числа та невалідний рівень податкової ставки).

# Структура

```
Lab1_SOAD/
├── server.js        # Головний файл
├── myTaxService.js  # Реалізація сервісу розрахунку податку
├── .env             # Змінні оточення (за бажанням)
├── .gitignore       # Git ignore правила
├── wsdl/
│   ├── tax.wsdl     # Файл опису роботи сервісу (обробка запитів та відповідей, виняткових ситуацій)
└── README.md        # Документація
```

## Необхідні інструменти реалізації

- Node.js
- Express.js
- Git

## Установлення

1. Клонуйте репозиторій:

```bash
git clone <repository-url>
cd Lab1_SOAD
```

2. Завантажте залежності:

```bash
npm install
```

3. Створіть `.env` файл у головній директорії (за бажанням):

```bash
PORT=8000
```

## Запуск додатку

Режим розробника:

```bash
npm run dev
```

Звичайний запуск:

```bash
node server.js
```

## Доступні шляхи

### SOAP шляхи

Сервіс розрахунку податку

- Endpoint: `POST /wsdl`
- Content-Type: `text/xml`

Приклад запиту:

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tax="urn:MyTaxService">
   <soapenv:Header/>
   <soapenv:Body>
        <tax:CalculateTax>
            <income>100000</income>
            <taxRate>40</taxRate>
        </tax:CalculateTax>
   </soapenv:Body>
</soapenv:Envelope>
```

Приклад відповіді:

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Header/>
    <soap:Body>
        <ns1:CalculateTaxResponse xmlns:ns1="urn:MyTaxService">
            <taxAmount>40000.00</taxAmount>
            <militaryTaxAmount>1500.00</militaryTaxAmount>
            <totalTaxAmount>41500.00</totalTaxAmount>
        </ns1:CalculateTaxResponse>
    </soap:Body>
</soap:Envelope>
```

## Константи

Військовий збір = 1.5%

## Обробка виняткових ситуацій

Сервіс повертає SOAP faults у наступних випадках:

- Нечислові значення
- Від'ємні значення
- Завеликий або замалий податок

## Ліцензія

Creative Commons Zero v1.0 Universal