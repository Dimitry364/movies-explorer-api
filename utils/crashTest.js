const crashTest = () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадет');
  }, 0);
};

module.exports = { crashTest };
