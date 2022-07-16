import { tokenize } from 'string-punctuation-tokenizer';
import collect from 'collect.js';
import { v4 as uuid } from 'uuid';

let pdfjs = null;

const setupPdfjs = async () => {
  if (pdfjs != null) {
    return true;
  }

  pdfjs = await import('pdfjs-dist/build/pdf');
  pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.worker.js';
};

export const search = async (files, keywords) => {
  if (!pdfjs) {
    await setupPdfjs();
  }

  return new Promise((resolve, reject) => {
    try {
      const promises = files.map(async (file) => await searchKeywordsOnFile(keywords, file));

      Promise.all(promises).then((results) => {
        resolve(results);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const getTypedArray = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function () {
      const typedArray = new Uint8Array(this.result);

      resolve(typedArray);
    };

    reader.onerror = reject;

    reader.readAsArrayBuffer(file);
  });
};

export const getKeywordsFromText = (text) => {
  return text
    .split(',')
    .map((keyword) => {
      return keyword.toLowerCase().trim();
    })
    .filter((keyword) => keyword != null || keyword !== '');
};

export const getTokensFromText = (text) => {
  return tokenize({ text }).map((token) => token.toLowerCase());
};

export const mapKeywordsWithCounter = (keywords, tokens) => {
  return collect(keywords)
    .mapWithKeys((keyword) => [keyword, getKeywordOccurrences(keyword, tokens)])
    .all();
};

const getKeywordOccurrences = (keyword, tokens) => {
  return collect(tokens).intersect([keyword]).count();
};

const searchKeywordsOnFile = async (keywords, file) => {
  const fileContent = await readPdfContent(await file.fileHandle.getFile());

  const fileContentText = await getPdfText(fileContent);

  const tokens = getTokensFromText(fileContentText);

  return {
    uuid: uuid(),
    file: file,
    keywords: mapKeywordsWithCounter(keywords, tokens),
  };
};

const readPdfContent = (file) => {
  return new Promise((resolve, reject) => {
    setupPdfjs().then(() => {
      getTypedArray(file).then((typedArray) => {
        pdfjs.getDocument(typedArray).promise.then((pdf) => {
          resolve(pdf);
        });
      });
    });
  });
};

const getPdfText = (pdf) => {
  const countPromises = [];

  for (let currentPage = 1; currentPage <= pdf._pdfInfo.numPages; currentPage++) {
    countPromises.push(
      pdf.getPage(currentPage).then(function (page) {
        return page.getTextContent().then(function (text) {
          return text.items.map((item) => item.str).join('');
        });
      }),
    );
  }

  return Promise.all(countPromises).then(function (texts) {
    return texts.join('');
  });
};
