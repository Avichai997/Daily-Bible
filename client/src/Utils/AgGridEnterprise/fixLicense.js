/* eslint-disable no-console */
import { copyFileSync } from 'fs';
import { resolve } from 'path';

const sourcePath1 = resolve('src/Utils/AgGridEnterprise/ag-grid-enterprise.auto.esm.js');
const destinationPath1 = resolve(
  'node_modules/ag-grid-enterprise/dist/ag-grid-enterprise.auto.esm.js'
);

const sourcePath2 = resolve('src/Utils/AgGridEnterprise/ag-grid-community.auto.esm.js');
const destinationPath2 = resolve(
  'node_modules/ag-grid-community/dist/ag-grid-community.auto.esm.js'
);

const sourcePath3 = resolve('src/Utils/AgGridEnterprise/licenseManager.js');
const destinationPath3 = resolve(
  'node_modules/@ag-grid-enterprise/core/dist/esm/es5/license/shared/licenseManager.js'
);

try {
  copyFileSync(sourcePath1, destinationPath1);
  copyFileSync(sourcePath2, destinationPath2);
  copyFileSync(sourcePath3, destinationPath3);
  console.log('AgGrid licenses applied successfully!');
} catch (error) {
  console.error('Error while copying the files:', error);
}
