import _ from 'lodash';
import questionsJson from '../data/questions.json';

const questionFactory = (countryData, index, countriesData) => {
	const randomQuestion = getQuestionType(countryData);
	
	let auxQuestion = {
		type: randomQuestion.type,
		question: randomQuestion.question,
		question2: null,
		questionValue: null,
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

const createCapitalQuestion = (auxQuestion, countryData, index, countriesData) => {
	const questionValue = countryData.name.common || "";
	const answer = countryData.capital[0] || "";
	const otherCapitals = countriesData.filter((c, i) => i !== index);
	const incorrectOptions = _.sampleSize(
		otherCapitals.map(c => c.capital[0]).filter(Boolean), 3
	);
	const options = _.shuffle([answer, ...incorrectOptions]);
	
	return auxQuestion = { 
		...auxQuestion,
		options,
		questionValue,
		answer
	};
}

const createFlagQuestion = (auxQuestion, countryData, index, countriesData) => {
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

const createContinentQuestion = (auxQuestion, countryData, index, countriesData) => {
    const questionValue = countryData.name.common || "";
    const answer = countryData.continents[0] || "";
    const otherContinents = countriesData
			.filter((c, i) => i !== index)
			.map(c => c.continents[0])
			.filter(Boolean);
    const uniqueContinents = Array.from(new Set(otherContinents)).filter(cont => cont !== answer);
    const incorrectOptions = _.sampleSize(uniqueContinents, 3);
    const options = _.shuffle([answer, ...incorrectOptions]);

	return {
		...auxQuestion,
		options,
		questionValue,
		answer
	};
}

const createCurrencyQuestion = (auxQuestion, countryData, index, countriesData) => {
	const questionValue = countryData.name.common || "";
  const currencyCode = countryData.currencies ? Object.keys(countryData.currencies)[0] : null;
  const answer = currencyCode || "";
  const otherCurrencies = countriesData.filter((c, i) => {
    if (i === index) return false;
    const currCode = c.currencies ? Object.keys(c.currencies)[0] : null;
    return currCode && currCode !== answer;
  });

	//TODO: TESTEAR ESTO PORQUE CREO QUE ROMPE SEGURO xdd
  const incorrectOptions = _.sampleSize(
    otherCurrencies.map(c => {
      return c.currencies ? Object.keys(c.currencies)[0] : null;
    }).filter(Boolean), 3
  );
  const options = _.shuffle([answer, ...incorrectOptions]);

  return {
    ...auxQuestion,
    options,
		questionValue,
    answer
  };
}

const createBordersQuestion = (auxQuestion, countryData, index, countriesData) => {
	const questionValue = countryData.name.common || "";
	const borders = countryData.borders || [];
	let answer = null;

	if (borders.length > 0) {
		const borderCountry = countriesData.find(c => c.cca3 === borders[0]);
		let border;
		if (borderCountry===undefined)
			border = fetchByCode(borders[0])
		answer = borderCountry?.name?.common || border;
	}

	const nonBorderCountries = countriesData.filter(
		(c, i) => i !== index && (!borders.includes(c.cca3))
	);
	const incorrectOptions = _.sampleSize(
		nonBorderCountries.map(c => c.name?.common).filter(Boolean), 3
	);
	const options = _.shuffle([answer, ...incorrectOptions]);

	return {
		...auxQuestion,
		options,
		questionValue,
		answer
	};
}

const createIddQuestion = (auxQuestion, countryData, index, countriesData) => {
	const questionValue = countryData.name.common || "";
	const answer = countryData.idd?.root + (countryData.idd?.suffixes?.[0] || "");
	const otherCountries = countriesData.filter((c, i) => i !== index);
	const incorrectOptions = _.sampleSize(
		otherCountries
			.map(c => c.idd?.root && c.idd?.suffixes?.[0] ? c.idd.root + c.idd.suffixes[0] : null)
			.filter(Boolean), 3
	);
	const options = _.shuffle([answer, ...incorrectOptions]);

	return {
		...auxQuestion,
		options,
		questionValue,
		answer
	};
};

const fetchByCode = async (code) => {
	const API_URL = "https://restcountries.com/v3.1/alpha/{code}";

	try {
		const response = await fetch(API_URL.replace("{code}", code));
		const data = await response.json();
		return data[0].name.common;
	} catch (err) {
		console.log("err", err);
	}
}

const getQuestionType = (countryData) => {
	let randomQuestion = _.sample(questionsJson);

	// Prevent errors
	if (randomQuestion.type==="borders" && (!countryData.borders || countryData.borders.length === 0))
		randomQuestion = _.sample(questionsJson.filter(q => q.type !== "borders"));
	if (randomQuestion.type==="idd" && countryData.idd == '')
		randomQuestion = _.sample(questionsJson.filter(q => q.type !== "idd"));
	if (countryData.region === "Antarctic")
		randomQuestion = questionsJson.find(q => q.type === "idd");

	return randomQuestion;
}


const questionFactoryType = {
	capital: createCapitalQuestion,
  flag: createFlagQuestion,
  continent: createContinentQuestion,
  currency: createCurrencyQuestion,
  borders: createBordersQuestion,
  idd: createIddQuestion,
};


export default questionFactory;