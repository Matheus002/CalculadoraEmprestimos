//Colocar um listener no botao de calcular
document.getElementById('loan-form').addEventListener('submit', function(e){
  //Esconder Resultados
  document.getElementById('results').style.display = 'none';

   //Mostrar Gif de carregamento
   document.getElementById('loading').style.display = 'block';

   setTimeout(calculateResults, 2000);


  e.preventDefault();
});

//Função que calcula os resultados
function calculateResults(){
  console.log('O botão está funcionando...');
  //Variáveis da Interface
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalyPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');


  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  //Calcular pagamento mensal
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalyPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    //Mostrar resultados na tela
    document.getElementById('results').style.display = 'block';

    //Esconder gif de carregamento
    document.getElementById('loading').style.display = 'none';


  }else{
    showError('Por favor, cheque seus números');
  }

  //e.preventDefault();
}

//Mostrar erro
function showError(error){

  //Esconder resultados
  document.getElementById('results').style.display = 'none';

  //Esconder gif de carregamento
  document.getElementById('loading').style.display = 'none';


  //Cria ma div para mostrar o erro
  const erroDiv = document.createElement('div');

  //Pegar elementos
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  //Adiciona a classe
  erroDiv.className = 'alert alert-danger';

  //cria o node do texto e cria o apendice para a div
  erroDiv.appendChild(document.createTextNode(error));

  //Inserir error depois do reader
  card.insertBefore(erroDiv, heading);

  //Limpar erro depois de 3 segundos
  setTimeout(clearError, 3000);
}


//Limpar erro
function clearError(){
  document.querySelector('.alert').remove();
}