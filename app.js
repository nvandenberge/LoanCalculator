document.getElementById('loan-form').addEventListener('submit', function(e){
// Show results
    document.getElementById('results').style.display = 'none';
// Hide Results
    document.getElementById('loading').style.display = 'block';
setTimeout(calculateResults, 1000);

    e.preventDefault();
});

function calculateResults(e) {
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
// Show results
        document.getElementById('results').style.display = 'block';
// Hide Loader
        document.getElementById('loading').style.display = 'none';

    } else {
        showError('Please check your numbers');
    }

}

//Show Error
function showError(error) {
// Show results
    document.getElementById('results').style.display = 'none';
// Hide Results
    document.getElementById('loading').style.display = 'none';
    const errorDiv = document.createElement('div'); //Creates a div
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    errorDiv.className = 'alert alert-danger'; //Add class to error
    errorDiv.appendChild(document.createTextNode(error)); //CreatesTextNode
    card.insertBefore(errorDiv, heading); //Insert error above heading

    setTimeout(clearError, 3000); //Clears the error after 3 seconds
}

function clearError() {
    document.querySelector('.alert').remove(); //Function to remove error
}

