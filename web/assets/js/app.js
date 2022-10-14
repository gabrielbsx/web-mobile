const firebaseConfig = {
  apiKey: 'AIzaSyAO94rUeqLlJFAqGLjHKL1YH66nKZIfEv8',
  authDomain: 'health-b778f.firebaseapp.com',
  projectId: 'health-b778f',
  storageBucket: 'health-b778f.appspot.com',
  messagingSenderId: '580812422008',
  appId: '1:580812422008:web:2d259fb2bd5b9564bee68d',
  measurementId: 'G-MP2C7X9YC4'
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();

const nameValidation = (name) => name.length > 1;
const genderValidation = (gender) => gender === 'masculino' || gender === 'feminino';
const passwordConfirmation = (password, passwordConfirm) => password === passwordConfirm;
const bornValidation = (born) => born < new Date();
const emailValidation = (email) => email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);

const setMessageError = (message) => {
  const errorDiv = document.querySelector('div.input-error');
  const errorMessage = document.createElement('small');
  errorMessage.textContent = message;
  errorMessage.classList.add('text-error');
  errorDiv.appendChild(errorMessage);
}

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

  const name = document.querySelector('input[name="nome"]').value;
  const gender = document.querySelector('input[name="sexo"]').value;
  const born = document.querySelector('input[name="nascimento"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="password"]').value;
  const passwordConfirm = document.querySelector('input[name="passwordConfirm"]').value;
  const errorDiv = document.querySelector('div.input-error');
  errorDiv.innerHTML = '';

  const user = {
    name,
    gender: gender.toLowerCase(),
    born: new Date(born),
    email,
  };

  if (!nameValidation(name)) {
    setMessageError('Nome inválido');
    return;
  }
  if (!genderValidation(user.gender)) {
    setMessageError('Sexo inválido');
    return;
  }
  if (!emailValidation(email)) {
    setMessageError('E-mail inválido');
    return;
  }
  if (password.length < 6) {
    setMessageError('Senha deve conter 6 caracteres');
    return;
  }
  if (!passwordConfirmation(password, passwordConfirm)) {
    setMessageError('Senha não confere');
    return;
  }
  if (!bornValidation(user.born)) {
    setMessageError('Data de nascimento inválida');
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(credential => {
      console.log(credential, credential.user.uid);
      credential.user.updateProfile({
        displayName: name,
        born: user.born,
        gender: user.gender,
      });
      // auth.currentUser.updateProfile({
      //   displayName: name,
      // });
      db.collection('users')
        .doc(credential.user.uid)
        .set({
          displayName: name,
          gender: user.gender,
          born: user.born,
        })
        .then((data) => {
          console.log(data);
        })
        .catch(error => {
          console.log('error');
        });
      alert('Conta criada com sucesso!');
    })
    .then(() => {
      // window.location.pathname = '/index.html';
    })
    .catch(error => {
      console.log(error);
      setMessageError('Houve algum erro ao efetuar o cadastro');
    });
}

const recoveryHandle = (event) => {
  event.preventDefault();
  
  const email = document.querySelector('input[name="email"]').value;
  const errorDiv = document.querySelector('div.input-error');
  errorDiv.innerHTML = '';

  auth.sendPasswordResetEmail(email)
    .then(() => {
      alert('Enviamos sua nova senha em seu e-mail!');
    })
    .catch(error => {
      setMessageError(error.message);
    })
}

const signInHandle = (event) => {
  event.preventDefault();

  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="password"]').value;

  auth.signInWithEmailAndPassword(email, password)
    .then(credential => {
      console.log(credential);
    })
    .catch(error => {
      setMessageError(error.message);
    })
}