import _ from 'lodash';
import questionsJson from '../data/questions.json';

const QuestionFactory = (countryData, index, countriesData) => {
	const randomQuestion = _.sample(questionsJson);

	let auxQuestion = {
		type: randomQuestion.type,
		question: randomQuestion.question,
		question2: null,
		flag: null,
		options: null,
		answer: null
	};

	if (randomQuestion.type === "flag") {
		const flag = countryData.flags?.svg || countryData.flags?.png || "";
		auxQuestion = { ...auxQuestion, flag, };
	} else {
		const question2 = randomQuestion.question2 || "";
		auxQuestion = { ...auxQuestion, question2, };
	}

	const creator = questionFactoryType[randomQuestion.type];
	return creator(auxQuestion, countryData, index, countriesData);
}

const createCountryQuestion = (auxQuestion, countryData, index, countriesData) => {
	const answer = countryData.name?.common || "";
	const otherCountries = countriesData.filter((c, i) => i !== index);
	const incorrectOptions = _.sampleSize(
		otherCountries.map(c => c.name?.common).filter(Boolean), 3
	);

	const options = _.shuffle([answer, ...incorrectOptions]);

	return auxQuestion = { 
		...auxQuestion,
		options,
		answer
	};
}

const createCapitalQuestion = (auxQuestion, countryData, index, countriesData) => {
	const answer = countryData.capital[0] || "";
	const otherCapitals = countriesData.filter((c, i) => i !== index);
	const incorrectOptions = _.sampleSize(
		otherCapitals.map(c => c.capital[0]).filter(Boolean), 3
	);

	const options = _.shuffle([answer, ...incorrectOptions]);
	auxQuestion = { 
		...auxQuestion,
		options,
		answer
	};
}

const createLanguageQuestion = (auxQuestion, countryData, index, countriesData) => {
	const answer = Object.values(countryData.languages);
	const otherLangs = countriesData.filter((c, i) => i !== index);
	const incorrectOptions = _.sampleSize(
		otherLangs.map(c => c.capital[0]).filter(Boolean), 3
	);

	const options = _.shuffle([answer, ...incorrectOptions]);
	auxQuestion = { 
		...auxQuestion,
		options,
		answer
	};
}

const createContinentQuestion = (auxQuestion, countryData, index, countriesData) => {
	const answer = countryData.capital[0] || "";
	const otherCapitals = countriesData.filter((c, i) => i !== index);
	const incorrectOptions = _.sampleSize(
		otherCapitals.map(c => c.capital[0]).filter(Boolean), 3
	);

	const options = _.shuffle([answer, ...incorrectOptions]);
	auxQuestion = { 
		...auxQuestion,
		options,
		answer
	};
}

const createCurrencyQuestion = (auxQuestion, countryData, index, countriesData) => {
	const answer = countryData.capital[0] || "";
	const otherCapitals = countriesData.filter((c, i) => i !== index);
	const incorrectOptions = _.sampleSize(
		otherCapitals.map(c => c.capital[0]).filter(Boolean), 3
	);

	const options = _.shuffle([answer, ...incorrectOptions]);
	auxQuestion = { 
		...auxQuestion,
		options,
		answer
	};
}

const createCarSideQuestion = (auxQuestion, countryData, index, countriesData) => {
	const answer = countryData.capital[0] || "";
	const otherCapitals = countriesData.filter((c, i) => i !== index);
	const incorrectOptions = _.sampleSize(
		otherCapitals.map(c => c.capital[0]).filter(Boolean), 3
	);

	const options = _.shuffle([answer, ...incorrectOptions]);
	auxQuestion = { 
		...auxQuestion,
		options,
		answer
	};
}

const createLandlockedQuestion = (auxQuestion, countryData, index, countriesData) => {
	const answer = countryData.capital[0] || "";
	const otherCapitals = countriesData.filter((c, i) => i !== index);
	const incorrectOptions = _.sampleSize(
		otherCapitals.map(c => c.capital[0]).filter(Boolean), 3
	);

	const options = _.shuffle([answer, ...incorrectOptions]);
	auxQuestion = { 
		...auxQuestion,
		options,
		answer
	};
}

const questionFactoryType = {
  flag: createCountryQuestion,
  borders: createCountryQuestion,
  capital: createCapitalQuestion,
  language: createLanguageQuestion,
  continent: createContinentQuestion,
  currency: createCurrencyQuestion,
  car_side: createCarSideQuestion,
  landlocked: createLandlockedQuestion,
};


export default QuestionFactory;