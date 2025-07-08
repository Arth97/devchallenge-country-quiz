import _ from 'lodash';
import questionsJson from '../data/questions.json';

const QuestionFactory = () => {

	const createQuestion = (countryData, index, countriesData) => {
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

		// {

		// 	const otherCountries = countriesData.filter((c, i) => i !== index);
		// 	const incorrectOptions = _.sampleSize(
		// 		otherCountries.map(c => c.name?.common).filter(Boolean), 3
		// 	);

		// 	const options = _.shuffle([answer, ...incorrectOptions]);

		// }
	}
}

const createCountryQuestion = () => {

}

const createCapitalQuestion, = () => {

}

const createLanguageQuestion, = () => {

}

const createContinentQuestion, = () => {

}

const createCurrencyQuestion, = () => {

}

const createCarSideQuestion, = () => {

}

const createLandlockedQuestion, = () => {

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