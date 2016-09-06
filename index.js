#! /usr/bin/env node

const clear = require('clear');
const inquirer = require('inquirer');
const jsonfile = require('jsonfile');

const questions = [
  {
    name: 'name',
    type: 'input',
    message: 'Name:'
  },
  {
    name: 'description',
    type: 'input',
    message: 'Description:'
  },
  {
    name: 'version',
    type: 'input',
    message: 'Version:',
    default: '1.0.0'
  },
  {
    name: 'minimum_chrome_version',
    type: 'input',
    message: 'Minimum Chrome Version:',
    default: '49'
  },
  {
    name: 'background',
    type: 'confirm',
    message: 'Has background script?',
    default: false
  },
  {
    name: 'browser_action',
    type: 'confirm',
    message: 'Has browser action?',
    default: false
  },
  {
    name: 'page_action',
    type: 'confirm',
    message: 'Has page action?',
    default: false
  },
  {
    name: 'permissions',
    type: 'checkbox',
    choices: [
      'storage',
      'history',
      'cookies',
      'identity',
      'alarms',
      'tabs',
      'management',
      'topSites',
      'idle',
      'webRequest',
      'webNavigation',
      'bookmarks',
      'unlimitedStorage',
      'amigo',
      '<all_urls>'
    ],
    message: 'Permissions:'
  }
];

clear();

inquirer.prompt(questions).then(function(answers) {
  const json = {
    manifest_version: 2,
    name: answers.name,
    description: answers.description,
    version: answers.version,
    minimum_chrome_version: answers.minimum_chrome_version,
    permissions: answers.permissions
  };

  if (answers.background) {
    json.background = {
      persistent: false,
      scripts: [ 'background.js' ]
    };
  }

  if (answers.page_action) {
    json.page_action = {
      default_title: answers.name,
      default_popup: 'popup.html'
    };
  }

  if (answers.browser_action) {
    json.browser_action = {
      default_title: answers.name,
      default_popup: 'popup.html'
    };
  }

  jsonfile.writeFile('manifest.json', json, { spaces: 2 }, function(err) {
    if (err) {
      console.error('Error creating manifest.json', err);
    }
    console.info('Initialized Chrome extension');
  });
});

