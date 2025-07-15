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

const createCapitalQuestion = (auxQuestion, countryData, index, countriesData) => {
	const answer = countryData.capital[0] || "";
	const otherCapitals = countriesData.filter((c, i) => i !== index);
	const incorrectOptions = _.sampleSize(
		otherCapitals.map(c => c.capital[0]).filter(Boolean), 3
	);
	const options = _.shuffle([answer, ...incorrectOptions]);
	
	return auxQuestion = { 
		...auxQuestion,
		options,
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
    answer
  };
}

// !!!!!!!!!!!!!!!!!!!!!!!!
// TODO: SI EL PAIS NO TIENE FRONTERAS, QUE RE SAQUE OTRA PREGUNTA NUEVA
// !!!!!!!!!!!!!!!!!!!!!!!!
const createBordersQuestion = (auxQuestion, countryData, index, countriesData) => {
	const borders = countryData.borders || [];
	let answer = null;

	if (borders.length > 0) {
		const borderCountry = countriesData.find(c => c.cca3 === borders[0]);
		answer = borderCountry?.name?.common || "";
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
		answer
	};
}

const createIddQuestion = (auxQuestion, countryData, index, countriesData) => {
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
		answer
	};
};


const questionFactoryType = {
	capital: createCapitalQuestion,
  flag: createFlagQuestion,
  continent: createContinentQuestion,
  currency: createCurrencyQuestion,
  borders: createBordersQuestion,
};


export default QuestionFactory;