const parseEnv = () => {
    const prefix = 'RSS_';
    const envVariables = process.env;
  
    for (const key in envVariables) {
      if (key.startsWith(prefix)) {
        const value = envVariables[key];
        const formattedKey = key.replace(prefix, '');
        console.log(`${key}=${value}`);
      }
    }
  };
  
  parseEnv();