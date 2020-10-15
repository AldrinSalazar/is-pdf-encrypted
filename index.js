const allOccurrences = (source, search) => {
  const result = [];

  for (let i = 0; i < source.length; ++i) {
    if (source.substring(i, i + search.length) == search) {
      result.push(i);
    }
  }
  return result;
};

const handle = (file) => {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.onload = result => {
			const fileAsString = String.fromCharCode.apply(null, new Int8Array(result.target.result));
			let isEncrypted = false;
			const allTrailers = allOccurrences(fileAsString, "trailer");
		
			allTrailers.forEach(trailer => {
				const encryptKey = fileAsString.indexOf("Encrypt", trailer);
				if (encryptKey > 0) {
					isEncrypted = true;
				}
			});

			resolve(isEncrypted);
		};
		reader.readAsArrayBuffer(file);
	});
};

module.exports = (file) => handle(file);