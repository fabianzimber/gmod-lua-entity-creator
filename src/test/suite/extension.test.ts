import * as assert from 'assert';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { createEntity, promptForEntitySettings } from '../../extension';

suite('Extension Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.');
  suite('createEntity', () => {
    test('Creates correct entity files and folders', async () => {
  	  	const tempDir = fs.mkdtempSync(path.join(__dirname, 'temp-'));
  	  	const settings = {
  	  	  className: 'TestEntity',
  	  	  printName: 'Test Print Name',
  	  	  category: 'TestCategory',
  	  	  type: 'Prop',
  	  	  show3DName: false,
  	  	  threeDNameText: 'Test 3D Name',
  	  	  threeDNameFont: 'DermaLarge',
  	  	  modelPath: '',
  	  	};
	  
  	  	await createEntity(tempDir, settings);
	  
  	  	const entityFolderPath = path.join(tempDir, settings.className);
  	  	const clInitPath = path.join(entityFolderPath, 'cl_init.lua');
  	  	const initPath = path.join(entityFolderPath, 'init.lua');
  	  	const sharedPath = path.join(entityFolderPath, 'shared.lua');
	  
  	  	assert.strictEqual(fs.existsSync(entityFolderPath), true);
  	  	assert.strictEqual(fs.existsSync(clInitPath), true);
  	  	assert.strictEqual(fs.existsSync(initPath), true);
  	  	assert.strictEqual(fs.existsSync(sharedPath), true);
	  
  	  	// Clean up temporary files and folders after the test
  	  	fs.rmSync(entityFolderPath, { recursive: true, force: true });
  	});
  });

});
