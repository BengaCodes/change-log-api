setTimeout(() => {
  throw new Error('Oooops!')
}, 300)

process.on('uncaughtException')