// // utils/translator.js
// const { Translate } = require('@google-cloud/translate').v2;

// // Creates a client
// const translate = new Translate({ key: process.env.GOOGLE_TRANSLATE_API_KEY });

// export const translateText = async (text, target) => {
//   try {
//     const [translation] = await translate.translate(text, target);
//     return translation;
//   } catch (error) {
//     console.error("Translation error:", error);
//     return "Translation failed.";
//   }
// };