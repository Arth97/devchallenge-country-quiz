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
	const answer = Object.values(countryData.languages)[0] || "";
	const otherLangs = countriesData.filter((c, i) => i !== index);
	const incorrectOptions = _.sampleSize(
			otherLangs.map(c => Object.values(c.languages)[0]).filter(Boolean), 3
	);

	const options = _.shuffle([answer, ...incorrectOptions]);
	return {
			...auxQuestion,
			options,
			answer
	};
}

const createContinentQuestion = (auxQuestion, countryData, index, countriesData) => {
	const answer = countryData.continents[0] || "";
	const otherContinents = countriesData.filter((c, i) => i !== index);
	const incorrectOptions = _.sampleSize(
			otherContinents.map(c => c.continents[0]).filter(Boolean), 3
	);

	const options = _.shuffle([answer, ...incorrectOptions]);
	return {
			...auxQuestion,
			options,
			answer
	};
}

const createCurrencyQuestion = (auxQuestion, countryData, index, countriesData) => {
	const currencyObj = countryData.currencies ? Object.values(countryData.currencies)[0] : null;
	const answer = currencyObj?.name || "";
	const otherCurrencies = countriesData.filter((c, i) => i !== index);
	const incorrectOptions = _.sampleSize(
			otherCurrencies.map(c => {
					const curr = c.currencies ? Object.values(c.currencies)[0] : null;
					return curr?.name;
			}).filter(Boolean), 3
	);

	const options = _.shuffle([answer, ...incorrectOptions]);
	return {
			...auxQuestion,
			options,
			answer
	};
}

const createCarSideQuestion = (auxQuestion, countryData, index, countriesData) => {
	const answer = countryData.car?.side || "";
	const otherSides = countriesData.filter((c, i) => i !== index);
	const incorrectOptions = _.sampleSize(
			otherSides.map(c => c.car?.side).filter(Boolean), 3
	);

	const options = _.shuffle([answer, ...incorrectOptions]);
	return {
			...auxQuestion,
			options,
			answer
	};
}

const createLandlockedQuestion = (auxQuestion, countryData, index, countriesData) => {
	const answer = countryData.landlocked ? "Yes" : "No";
	const otherLandlocked = countriesData.filter((c, i) => i !== index);
	const incorrectOptions = _.sampleSize(
			otherLandlocked.map(c => c.landlocked ? "Yes" : "No").filter(Boolean), 3
	);

	const options = _.shuffle([answer, ...incorrectOptions]);
	return {
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