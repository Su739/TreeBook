'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Articles', [
      {
        title: 'demo',
        depth: 0,
        parent: 2,
        superior: 0,
        content: '\n# Live demo\n\nChanges are automatically rendered as you type.\n\n* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)\n* Renders actual, "native" React DOM elements\n* Allows you to escape or skip HTML (try toggling the checkboxes above)\n* If you escape or skip the HTML, no `dangerouslySetInnerHTML` is used! Yay!\n\n## HTML block below\n\n<blockquote>\n  This blockquote will change based on the HTML settings above.\n</blockquote>\n\n## How about some code?\n```js\nvar React = require("react");\nvar Markdown = require("react-markdown");\n\nReact.render(\n  <Markdown source="# Your markdown here" />,\n  document.getElementById("content")\n);\n```\n\nPretty neat, eh?\n\n## Tables?\n\n| Feature | Support |\n| ------ | ----------- |\n| tables | ✔ |\n| alignment | ✔ |\n| wewt | ✔ |\n\n## More info?\n\nRead usage information and more on [GitHub](//github.com/rexxars/react-markdown)\n\n---------------\n\nA component by [VaffelNinja](http://vaffel.ninja) / Espen Hovlandsdal\n',
        order: 1,
        public: true,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now())
      },
      {
        title: 'demo2',
        depth: 0,
        parent: 2,
        content: '\n# Live demo\n\nChanges are automatically rendered as you type.\n\n* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)\n* Renders actual, "native" React DOM elements\n* Allows you to escape or skip HTML (try toggling the checkboxes above)\n* If you escape or skip the HTML, no `dangerouslySetInnerHTML` is used! Yay!\n\n## HTML block below\n\n<blockquote>\n  This blockquote will change based on the HTML settings above.\n</blockquote>\n\n## How about some code?\n```js\nvar React = require("react");\nvar Markdown = require("react-markdown");\n\nReact.render(\n  <Markdown source="# Your markdown here" />,\n  document.getElementById("content")\n);\n```\n\nPretty neat, eh?\n\n## Tables?\n\n| Feature | Support |\n| ------ | ----------- |\n| tables | ✔ |\n| alignment | ✔ |\n| wewt | ✔ |\n\n## More info?\n\nRead usage information and more on [GitHub](//github.com/rexxars/react-markdown)\n\n---------------\n\nA component by [VaffelNinja](http://vaffel.ninja) / Espen Hovlandsdal\n',
        order: 2,
        public: false,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now())
      },
      {
        title: 'demo3',
        depth: 1,
        parent: 2,
        superior: 1,
        content: '\n# Live demo\n\nChanges are automatically rendered as you type.\n\n* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)\n* Renders actual, "native" React DOM elements\n* Allows you to escape or skip HTML (try toggling the checkboxes above)\n* If you escape or skip the HTML, no `dangerouslySetInnerHTML` is used! Yay!\n\n## HTML block below\n\n<blockquote>\n  This blockquote will change based on the HTML settings above.\n</blockquote>\n\n## How about some code?\n```js\nvar React = require("react");\nvar Markdown = require("react-markdown");\n\nReact.render(\n  <Markdown source="# Your markdown here" />,\n  document.getElementById("content")\n);\n```\n\nPretty neat, eh?\n\n## Tables?\n\n| Feature | Support |\n| ------ | ----------- |\n| tables | ✔ |\n| alignment | ✔ |\n| wewt | ✔ |\n\n## More info?\n\nRead usage information and more on [GitHub](//github.com/rexxars/react-markdown)\n\n---------------\n\nA component by [VaffelNinja](http://vaffel.ninja) / Espen Hovlandsdal\n',
        order: 1,
        public: false,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now())
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Articles', null, {});
  }
};
