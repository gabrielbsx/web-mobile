import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

import { app, auth } from "../../assets/js/config.js";

const nameValidation = (name) => name.length > 1;
const genderValidation = (gender) =>
  gender === "masculino" || gender === "feminino";
const passwordConfirmation = (password, passwordConfirm) =>
  password === passwordConfirm;
const bornValidation = (born) => born < new Date();
const emailValidation = (email) =>
  email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);

const setMessageError = (message) => {
  const errorDiv = document.querySelector("div.input-error");
  const errorMessage = document.createElement("small");
  errorMessage.textContent = message;
  errorMessage.classList.add("text-error");
  errorDiv.appendChild(errorMessage);
};

document.addEventListener("DOMContentLoaded", () => {
  onAuthStateChanged(auth, (user) => {
    const paths = ['index.html'];
    switch (window.location.pathname) {
      case '/index.html':
        window.location.pathname = "/vaccine.html";    
    }
  });
});

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

  console.log(user);
};

const signUpHandle = (event) => {
  event.preventDefault();

  const name = document.querySelector('input[name="nome"]').value;
  const gender = document.querySelector('input[name="sexo"]').value;
  const born = document.querySelector('input[name="nascimento"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="password"]').value;
  const passwordConfirm = document.querySelector(
    'input[name="passwordConfirm"]'
  ).value;
  const errorDiv = document.querySelector("div.input-error");
  errorDiv.innerHTML = "";

  const user = {
    name,
    gender: gender.toLowerCase(),
    born: new Date(born),
    email,
  };

  if (!nameValidation(name)) {
    setMessageError("Nome inválido");
    return;
  }
  if (!genderValidation(user.gender)) {
    setMessageError("Sexo inválido");
    return;
  }
  if (!emailValidation(email)) {
    setMessageError("E-mail inválido");
    return;
  }
  if (password.length < 6) {
    setMessageError("Senha deve conter 6 caracteres");
    return;
  }
  if (!passwordConfirmation(password, passwordConfirm)) {
    setMessageError("Senha não confere");
    return;
  }
  if (!bornValidation(user.born)) {
    setMessageError("Data de nascimento inválida");
    return;
  }

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((credential) => {
      console.log(credential, credential.user.uid);
      credential.user.updateProfile({
        displayName: name,
        born: user.born,
        gender: user.gender,
      });
      // auth.currentUser.updateProfile({
      //   displayName: name,
      // });
      db.collection("users")
        .doc(credential.user.uid)
        .set({
          displayName: name,
          gender: user.gender,
          born: user.born,
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log("error");
        });
      alert("Conta criada com sucesso!");
    })
    .then(() => {
      // window.location.pathname = '/index.html';
    })
    .catch((error) => {
      console.log(error);
      setMessageError("Houve algum erro ao efetuar o cadastro");
    });
};

const recoveryHandle = (event) => {
  event.preventDefault();

  const email = document.querySelector('input[name="email"]').value;
  const errorDiv = document.querySelector("div.input-error");
  errorDiv.innerHTML = "";

  auth
    .sendPasswordResetEmail(email)
    .then(() => {
      alert("Enviamos sua nova senha em seu e-mail!");
    })
    .catch((error) => {
      setMessageError(error.message);
    });
};

export const signInHandle = (event) => {
  event.preventDefault();

  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="password"]').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((credential) => {
      window.location.pathname = "/vaccine.html";
    })
    .catch((error) => {
      setMessageError("E-mail e/ou senha inválidos.");
    });
};

document.querySelector(".form-button").addEventListener("click", (event) => {
  signInHandle(event);
});
