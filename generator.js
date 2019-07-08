const { EOL } = require('os');
const prettier = require('prettier');
const fs = require('fs');

const getConfig = options => {
  const config = {};

  if (options.custom) {
    config.custom = {
      families: options.custom.split(',').map(f => f.trim())
    };
  }

  if (options.fontdeck) {
    config.fontdeck = { id: options.fontdeck };
  }

  if (options.monotype) {
    config.monotype = { projectId: options.monotype };
  }

  if (options.google) {
    config.google = {
      families: options.google.split(',').map(f => f.trim())
    };
  }

  if (options.typekit) {
    config.typekit = { id: options.typekit };
  }

  return config;
};

module.exports = (api, options) => {
  api.extendPackage({
    dependencies: {
      webfontloader: '^1.6.28'
    }
  });

  api.injectImports(api.entryFile, `import WebFont from 'webfontloader';`);

  api.onCreateComplete(() => {
    const lines = fs
      .readFileSync(api.entryFile, { encoding: 'utf-8' })
      .split(/\r?\n/g);

    const hasPlugin = lines.some(line => line.match(/WebFont\.load\(/));

    if (hasPlugin) {
      return;
    }

    const newVueLine = lines.findIndex(line => line.match(/new Vue\(/));

    const opts = prettier.resolveConfig.sync('./.prettierrc.js');

    const webFontLoad = prettier
      .format(`WebFont.load(${JSON.stringify(getConfig(options))})`, opts)
      .trim();

    lines.splice(newVueLine - 1, 0, '', webFontLoad);

    fs.writeFileSync(api.entryFile, lines.join(EOL), { encoding: 'utf-8' });
  });
};
