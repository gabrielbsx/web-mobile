import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
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

const setMessageSuccess = (message) => {
  const successDiv = document.querySelector("div.input-error");
  const successMessage = document.createElement("small");
  successMessage.textContent = message;
  successMessage.classList.add("text-success");
  successDiv.appendChild(successMessage);
};

const flushMessageError = () => {
  const errorDiv = document.querySelector("div.input-error");
  errorDiv.innerHTML = "";
};

const signUpHandle = (event) => {
  flushMessageError();
  event.preventDefault();

  const name = document.querySelector('input[name="nome"]').value;
  const genders = document.querySelectorAll('input[name="sexo"]');
  const born = document.querySelector('input[name="nascimento"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="password"]').value;
  const passwordConfirm = document.querySelector(
    'input[name="passwordConfirm"]'
  ).value;
  const errorDiv = document.querySelector("div.input-error");
  errorDiv.innerHTML = "";

  var gender;

  for (const _gender of genders) {
    if (_gender.checked) {
      gender = _gender.value;
    }
  }

  const user = {
    name,
    gender: gender?.toLowerCase(),
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
  if (!dateValidate(born)) {
    setMessageError("Data de nascimento inválida");
    return;
  }
  if (!bornValidation(user.born)) {
    setMessageError("Data de nascimento inválida");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((credential) => {
      updateProfile(credential.user, {
        displayName: name,
      });
      // db.collection("users")
      //   .doc(credential.user.uid)
      //   .set({
      //     displayName: name,
      //     gender: user.gender,
      //     born: user.born,
      //   })
      //   .then((data) => {
      //     console.log(data);
      //   })
      //   .catch((error) => {
      //     console.log("error");
      //   });
      alert("Conta criada com sucesso!");
    })
    .then(() => {
      window.location.pathname = "/vaccine.html";
    })
    .catch((error) => {
      console.log(error);
      setMessageError("Houve algum erro ao efetuar o cadastro");
    });
};

const recoveryHandle = (event) => {
  flushMessageError();
  event.preventDefault();

  const email = document.querySelector('input[name="email"]').value;
  const errorDiv = document.querySelector("div.input-error");
  errorDiv.innerHTML = "";

  sendPasswordResetEmail(auth, email)
    .then(() => {
      setMessageSuccess("Enviamos sua nova senha em seu e-mail!");
    })
    .catch((error) => {
      setMessageError(error.message);
    });
};

const signInHandle = (event) => {
  flushMessageError();
  event.preventDefault();

  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="password"]').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((credential) => {
      window.location.pathname = "/vaccine.html";
    })
    .catch((error) => {
      console.log(error);
      if (error) {
        setMessageError("E-mail e/ou senha inválidos.");
      }
    });
};

const addVaccineHandle = (event) => {
  event.preventDefault();
  window.location.pathname = "/add-vaccine.html";
};

const dateValidate = (date) => {
  try {
    const dateArray = date.split("-");
    const dateObject = new Date(dateArray[0], dateArray[1], dateArray[2]);
    return true;
  } catch (error) {
    return false;
  }
};

const imageValidate = (image) => {
  try {
    const imageArray = image.split(".");
    const extension = imageArray[imageArray.length - 1];
    const validExtensions = ["jpg", "jpeg", "png"];
    return validExtensions.includes(extension);
  } catch (error) {
    return false;
  }
};

const cardDom = (vaccine) => {
  const card = document.createElement("div");
  const article = document.createElement("article");
  const header = document.createElement("header");
  const h2 = document.createElement("h2");
  const main = document.createElement("main");
  const dose = document.createElement("div");
  const date = document.createElement("span");
  const image = document.createElement("div");
  const img = document.createElement("img");
  const footer = document.createElement("footer");

  card.classList.add("card");
  card.classList.add("card-vaccine-handle");
  card.setAttribute("data-id", vaccine.id);
  card.addEventListener("click", (event) =>
    onHandleEditVaccine(event, vaccine.id)
  );
  dose.classList.add("dose");
  image.classList.add("image");

  h2.innerText = vaccine.name;
  dose.innerText = vaccine.dose;
  date.innerText = vaccine.date.split("-").reverse().join("/");
  img.src = vaccine.proof;
  img.alt = vaccine.name;

  if (vaccine.nextDateVaccine && vaccine.dose !== "Dose única") {
    const nextDateVaccineText =
      "Próxima dose em: " +
      vaccine.nextDateVaccine.split("-").reverse().join("/");
    footer.innerText = nextDateVaccineText;
  }

  header.appendChild(h2);
  image.appendChild(img);
  main.appendChild(dose);
  main.appendChild(date);
  main.appendChild(image);
  article.appendChild(header);
  article.appendChild(main);
  article.appendChild(footer);
  card.appendChild(article);

  return card;
};

const onHandleAddVaccine = async (event) => {
  flushMessageError();
  event.preventDefault();
  const date = document.querySelector('input[name="datevaccine"]').value;
  const name = document.querySelector('input[name="vaccine"]').value;
  const doses = document.querySelectorAll('input[name="dose"]');
  const proof = document.querySelector('input[name="proof"]').files[0];
  let nextDateVaccine = document.querySelector(
    'input[name="nextdatevaccine"]'
  ).value;

  var doseChecked;

  for (const dose of doses) {
    if (dose.checked) {
      doseChecked = dose.value;
    }
  }

  if (!proof) {
    setMessageError("Imagem não encontrada");
    return;
  }

  if (!imageValidate(proof.name)) {
    setMessageError("Formato de imagem inválido");
    return;
  }

  if (!dateValidate(date) || !date) {
    setMessageError("Data de vacinação inválida");
    return;
  }

  if (doseChecked !== "Dose única") {
    if (!dateValidate(nextDateVaccine) || !nextDateVaccine) {
      setMessageError("Data da próxima dose inválida");
      return;
    }
  } else {
    nextDateVaccine = null;
  }

  if (!name) {
    setMessageError("Nome da vacina inválido");
    return;
  }

  if (!dose) {
    setMessageError("Dose inválida");
    return;
  }

  const fileReader = new FileReader();

  fileReader.readAsDataURL(proof);

  const proofImage = await new Promise((resolve) => {
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
  });

  if (!proofImage) {
    setMessageError("Comprovante inválido");
    return;
  }

  const vaccine = {
    userId: auth.currentUser.uid,
    name,
    date,
    dose: doseChecked,
    nextDateVaccine,
    proof: proofImage,
  };

  const vaccines = JSON.parse(localStorage.getItem("vaccines")) || [];
  vaccines.push(vaccine);
  localStorage.setItem("vaccines", JSON.stringify(vaccines));
  window.location.pathname = "/vaccine.html";
};

const onHandleEditVaccine = async (event, vaccineId) => {
  event.preventDefault();
  const pathname = "/edit-vaccine.html?id=" + (parseInt(vaccineId) + 1);
  window.location = pathname;
};

const onHandleEditVaccineInfo = async (event) => {
  event.preventDefault();
  const vaccineId = parseInt(window.location.search.split("=")[1]) - 1;
  const vaccines = JSON.parse(localStorage.getItem("vaccines")) || [];
  const vaccine = vaccines[vaccineId];
  const date = document.querySelector('input[name="datevaccine"]').value;
  const name = document.querySelector('input[name="vaccine"]').value;
  const doses = document.querySelectorAll('input[name="dose"]');
  const proof = document.querySelector('input[name="proof"]').files[0];
  let nextDateVaccine = document.querySelector(
    'input[name="nextdatevaccine"]'
  ).value;

  var doseChecked;

  for (const dose of doses) {
    if (dose.checked) {
      doseChecked = dose.value;
    }
  }

  if (!dateValidate(date) || !date) {
    setMessageError("Data de vacinação inválida");
    return;
  }

  if (doseChecked !== "Dose única") {
    if (!dateValidate(nextDateVaccine) || !nextDateVaccine) {
      setMessageError("Data da próxima dose inválida");
      return;
    }
  } else {
    nextDateVaccine = null;
  }

  if (!name) {
    setMessageError("Nome da vacina inválido");
    return;
  }

  if (!dose) {
    setMessageError("Dose inválida");
    return;
  }

  var proofImage;

  if (proof) {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(proof);

    proofImage = await new Promise((resolve) => {
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
    });
  }

  if (proofImage) {
    if (!imageValidate(proof.name)) {
      setMessageError("Formato de imagem inválido");
      return;
    }
  }

  if (!proofImage && !vaccine.proof) {
    setMessageError("Comprovante inválido");
    return;
  }

  const vaccineUpdated = {
    userId: auth.currentUser.uid,
    name,
    date,
    dose: doseChecked,
    nextDateVaccine,
    proof: proofImage || vaccine.proof,
  };

  vaccines[vaccineId] = vaccineUpdated;
  localStorage.setItem("vaccines", JSON.stringify(vaccines));
  window.location = "/vaccine.html";
};

const onHandleDeleteVaccine = async (event) => {
  event.preventDefault();
  document.querySelector(".modal")?.classList.remove("hidden");
};

const onHandleDeleteVaccineConfirm = async (event) => {
  event.preventDefault();
  const vaccineId = parseInt(window.location.search.split("=")[1]) - 1;
  const vaccines = JSON.parse(localStorage.getItem("vaccines")) || [];
  vaccines.splice(vaccineId, 1);
  localStorage.setItem("vaccines", JSON.stringify(vaccines));
  window.location = "/vaccine.html";
};

const onHandleSearch = async (event) => {
  event.preventDefault();
  const search = document.querySelector('input[name="search"]').value;
  const vaccines = JSON.parse(localStorage.getItem("vaccines")) || [];
  const vaccinesFiltered = vaccines.filter((vaccine) =>
    vaccine.name.toLowerCase().includes(search.toLowerCase())
  );
  const cards = document.querySelector(".cards");
  cards.innerHTML = "";
  vaccinesFiltered.forEach((vaccine, index) => {
    if (vaccine.userId === auth.currentUser?.uid) {
      const vaccineCard = cardDom(vaccine, index);
      cards.appendChild(vaccineCard);
    }
  });
};

document.addEventListener("DOMContentLoaded", function () {
  onAuthStateChanged(auth, (user) => {
    const guestPaths = [
      "/",
      "/index.html",
      "/signin.html",
      "/signup.html",
      "/recovery.html",
    ];
    const authPaths = [
      "/add-vaccine.html",
      "/edit-vaccine.html",
      "/vaccine.html",
    ];
    if (user && guestPaths.includes(window.location.pathname)) {
      window.location.pathname = "/vaccine.html";
      return;
    }
    if (!user && !guestPaths.includes(window.location.pathname)) {
      window.location.pathname = "/index.html";
      return;
    }
    if (window.location.pathname === "/vaccine.html") {
      const vaccines = JSON.parse(localStorage.getItem("vaccines")) || [];
      const cards = document.querySelector(".cards");
      for (const [id, vaccine] of vaccines.entries()) {
        if (!vaccine) {
          continue;
        }
        if (vaccine.userId === auth.currentUser.uid) {
          const card = cardDom({ ...vaccine, id });
          cards.appendChild(card);
        }
      }
    }
  });

  if (window.location.pathname === "/edit-vaccine.html") {
    const urlParams = new URLSearchParams(window.location.search);
    const vaccineId = parseInt(urlParams.get("id"));
    const vaccines = JSON.parse(localStorage.getItem("vaccines")) || [];
    const vaccine = vaccines[vaccineId - 1];

    console.log(vaccine);

    if (!vaccineId || !vaccine) {
      window.location = "/vaccine.html";
    }

    document.querySelector('input[name="datevaccine"]').value = vaccine.date;
    document.querySelector('input[name="vaccine"]').value = vaccine.name;
    document.querySelectorAll('input[name="dose"]').forEach((dose) => {
      if (dose.value === vaccine.dose) {
        dose.checked = true;
      }
    });
    document.querySelector('input[name="nextdatevaccine"]').value =
      vaccine.nextDateVaccine;

    const proofImage = document.createElement("img");
    proofImage.classList.add("image-preview");
    proofImage.src = vaccine.proof;
    proofImage.alt = vaccine.name;
    document.querySelector(".image-preview-div").appendChild(proofImage);
  }

  document
    .querySelector('button[href="#signin"]')
    ?.addEventListener("click", (event) => signInHandle(event));
  document
    .querySelector('button[href="#signup"]')
    ?.addEventListener("click", (event) => signUpHandle(event));
  document
    .querySelector('button[href="#forget"]')
    ?.addEventListener("click", (event) => recoveryHandle(event));
  document
    .querySelector('a[href="#logout"]')
    ?.addEventListener("click", () => signOut(auth));
  document
    .querySelector('button[href="#add-vaccine"]')
    ?.addEventListener("click", (event) => addVaccineHandle(event));
  document
    .querySelector('button[href="#addvaccine"]')
    ?.addEventListener("click", (event) => onHandleAddVaccine(event));
  document
    .querySelector('button[href="#editvaccine"]')
    ?.addEventListener("click", (event) => onHandleEditVaccineInfo(event));
  document
    .querySelector(".input-button-file")
    ?.addEventListener("change", (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const img = document.querySelector("img");
        img.src = reader.result;
        img.classList.add("image-preview");
        document.querySelector(".image-preview-div").innerHTML = "";
        document.querySelector(".image-preview-div").appendChild(img);
      };
    });
  document
    .querySelector('button[href="#deletevaccine"]')
    ?.addEventListener("click", (event) =>
      document.querySelector(".modal")?.classList.remove("hidden")
    );
  document
    .querySelector("#cancel")
    ?.addEventListener("click", (event) =>
      document.querySelector(".modal")?.classList.add("hidden")
    );
  document
    .querySelector("#deletevac")
    ?.addEventListener("click", (event) => onHandleDeleteVaccineConfirm(event));
  document
    .querySelector(".search-input")
    ?.addEventListener("keyup", (event) => onHandleSearch(event));
});
