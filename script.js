document.addEventListener('DOMContentLoaded', () => {
    // 1. تحديد العناصر
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');
    const convertBtn = document.getElementById('convert-btn');
    const swapBtn = document.getElementById('swap-btn');
    const resultDisplay = document.getElementById('result');
    const rateDisplay = document.getElementById('rate-display');

    // 2. أسعار الصرف الثابتة الموسعة (للتوضيح فقط - القاعدة هي الدولار الأمريكي USD)
    // قيمة العملة: كم تساوي وحدة واحدة من هذه العملة بالدولار الأمريكي.
    const exchangeRates = {
        'USD': 1.00,  // دولار أمريكي (القاعدة)
        'EUR': 0.92,  // يورو
        'SAR': 3.75,  // ريال سعودي
        'EGP': 47.70, // جنيه مصري
        'AED': 3.67,  // درهم إماراتي
        'QAR': 3.64,  // ريال قطري
        'KWD': 0.31,  // دينار كويتي (كم دينار يساوي 1 دولار)
        'GBP': 0.79,  // جنيه إسترليني
        'JPY': 148.00,// ين ياباني
        'TRY': 32.50, // ليرة تركية
        'JOD': 0.71,  // دينار أردني
        'OMR': 0.38,  // ريال عماني
        'MAD': 10.10, // درهم مغربي
        'AUD': 1.50   // دولار أسترالي
    };

    // 3. دالة التحويل الرئيسية
    function convertCurrency() {
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        // التحقق من صلاحية المدخل
        if (isNaN(amount) || amount <= 0) {
            resultDisplay.textContent = 'أدخل مبلغًا صحيحًا';
            rateDisplay.textContent = '';
            return;
        }

        // 1. تحويل المبلغ من عملة المصدر إلى العملة الأساسية (USD)
        // يتم ذلك بقسمة المبلغ على قيمة العملة مقابل الدولار
        const amountInUSD = amount / exchangeRates[fromCurrency];

        // 2. تحويل المبلغ من العملة الأساسية (USD) إلى عملة الوجهة
        const convertedAmount = amountInUSD * exchangeRates[toCurrency];

        // 3. حساب سعر الصرف الحالي (للإظهار)
        const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];

        // 4. عرض النتيجة
        resultDisplay.textContent = convertedAmount.toFixed(2); // تقريب إلى رقمين عشريين
        rateDisplay.textContent = `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;
    }

    // 4. دالة تبديل العملات
    function swapCurrencies() {
        const temp = fromCurrencySelect.value;
        fromCurrencySelect.value = toCurrencySelect.value;
        toCurrencySelect.value = temp;
        // أعد التحويل مباشرة بعد التبديل
        convertCurrency();
    }

    // 5. ربط الأحداث
    convertBtn.addEventListener('click', convertCurrency);
    swapBtn.addEventListener('click', swapCurrencies);
    
    // ربط المدخلات بالتغيير التلقائي
    amountInput.addEventListener('input', convertCurrency);
    fromCurrencySelect.addEventListener('change', convertCurrency);
    toCurrencySelect.addEventListener('change', convertCurrency);


    // تنفيذ التحويل عند تحميل الصفحة لأول مرة
    convertCurrency();
});

