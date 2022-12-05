import {addDoc, collection, runTransaction} from 'firebase/firestore';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {auth, db, storage} from '../services/firebase';

export default class AddVaccineController {
  name;
  dose;
  proof;
  pathProof;
  nextDateDose;
  date;
  latitude;
  longitude;

  requiredFields = [];
  fieldsTranslate = [];

  constructor() {
    this.requiredFields = ['name', 'dose', 'proof', 'date', 'nextDateDose'];
    this.fieldsTranslate = {
      name: 'Nome',
      dose: 'Dose',
      proof: 'Comprovante',
      date: 'Data',
      nextDateDose: 'Próxima dose',
    };
  }

  setName(name) {
    this.name = name;
  }

  setDose(dose) {
    this.dose = dose;
  }

  setProof(proof) {
    this.proof = proof;
  }

  setPathProof(pathProof) {
    this.pathProof = pathProof;
  }

  setNextDateDose(nextDateDose) {
    this.nextDateDose = nextDateDose;
  }

  setLatitude(latitude) {
    this.latitude = latitude;
  }

  setLongitude(longitude) {
    this.longitude = longitude;
  }

  setDate(date) {
    this.date = date;
  }

  async add() {
    if (this.dose === 'Dose única') {
      this.nextDateDose = null;
      this.requiredFields.splice(
        this.requiredFields.indexOf('nextDateDose'),
        1,
      );
    } else if (!this.requiredFields.includes('nextDateDose')) {
      this.requiredFields.push('nextDateDose');
    }

    for (const field of this.requiredFields) {
      if (!this[field]) {
        throw new Error(`O campo ${this.fieldsTranslate[field]} é obrigatório`);
      }
    }

    const userAuthenticate = auth.currentUser;

    if (!userAuthenticate) {
      throw new Error('Usuário não autenticado');
    }

    const image = await fetch(this.proof);
    const blob = await image.blob();
    const pathWithFileName = `vaccines/${this.proof.split('/').pop()}`;

    try {
      const uploadedImage = await uploadBytes(
        ref(storage, pathWithFileName),
        blob,
      );

      const url = await getDownloadURL(uploadedImage.ref);

      const vaccine = {
        name: this.name,
        dose: this.dose,
        proof: url,
        pathProof: pathWithFileName,
        nextDateDose: this.nextDateDose,
        date: this.date,
        userId: userAuthenticate.uid,
        latitude: this.latitude,
        longitude: this.longitude,
      };
      const vaccineAdded = await addDoc(collection(db, 'vaccines'), vaccine);
      return vaccineAdded;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
