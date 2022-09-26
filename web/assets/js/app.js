const signInController = (event) => {
  // previnir a ação default do formulário, que é o envio dos dados no action com o method e um refresh na página
  event.preventDefault();

  // puxa os dados dos respectivos inputs
  const emailInput = document.querySelector('input[name="email"]');
  const passwordInput = document.querySelector('input[name="password"]');
  
  // destructuring data
  const { value: email } = emailInput;
  const { value: password } = passwordInput;
  
  // criando um objeto usuário com os respectivos dados
  const user = { email, password };



}

const signUpHandle = (event) => {
  event.preventDefault();
}