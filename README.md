# Custom Components Library

A reusable UI component library built with **React**, **TypeScript**, **SCSS**, **Webpack**, and tested with **Jest**. Interactive documentation is available via **Storybook**.

## 🔗 Task

See the full project task description [here (Google Drive)](https://drive.google.com/file/d/1C148FRnWfXVoRDslDWcYac3bEhebdIAV/view)

## Usage
Run ```npm i @shalick/custom-components-lib``` to  install the library in your project<br/>
Then inmport library components into you source file <br/>
```javascript
import {Button, Checkbox, Modal, Select, Switch, TextField} from '@shalick/custom-components-lib';
```

## 📦 Overview

- 📘 Built with **React** and **TypeScript**
- 🎨 Styled using **SCSS Modules**
- 🧪 Unit tested with **Jest**
- 📚 Component documentation with **Storybook**
- ⚡ Bundled with **Webpack** for production-ready builds


---

## ⚙️ Requirements

- [Node.js](https://nodejs.org/) version **v18+** recommended

## 📥 Installation

Install project dependencies using:

```sh
npm install
```

## 🚀 Development Server

Start the development server:

```sh
npm start
```

## 🛠 Build for Production

Create a production-ready build:

```sh
npm run build:prod
```

## 🧪 Run Tests

To execute unit tests:

```sh
npm test
```

## 📖 Storybook

To launch the Storybook UI (for interactive component previews):

```sh
npm run storybook
```

To build the static Storybook:
```sh
npm run build-storybook
```

## 📁 Project Structure (Overview)

```sh
src/
  components/
    Button/
    Checkbox/
    Switch/
  styles/
  index.ts
```
Each component is:

Written in TypeScript (.tsx)

Styled with modular SCSS

Exported via index.ts for centralized import