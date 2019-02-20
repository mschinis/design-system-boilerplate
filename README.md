# Design System Boilerplate

## Requirements

1. node v8
2. npm 6+

## Technologies Used

1. SASS
2. Webpack

## Getting started

You can use this design system as the base of creating your own design system. 
To get started, follow the steps below to create your own revision.

1. Fork the respository
2. Clone it on your local machine
3. `cd design-system-boilerplate`
4. Update package.json `name` property (Referred to as `<project-name>` from here-on.)
5. `npm install`
6. `npm publish`

## Building the design system

Building the design system, is easy. All you need to do, is run `npm run build`.
This command will generate the following output at the top level of the project.

```
- dist
    - build
        - css
            - ... all built .css files
        - js
            - ... all built .js files
    - design-system
        - ... copy of src/css/*.scss files
```

Where the following directories include:

1. `dist/build`: All .css,.js files built. Directory structure will be identical to `src`
2. `dist/design-system`: This is a direct copy of the `src/css` folder. Used by all frontend apps to import what they need.
 

## Local development

The design system comes with the ability to automatically rebuild when a file is changed, which is particularly useful when you 
would like to make changes on the design system and see what it looks like on a frontend app.

To achieve the above, you will need to;

1. `npm link` In the design system project
2. `npm link <project-name>` In the frontend project you want to reload
3. `npm run dev` In the design system project

## Implementing the design system

In order to understand how to implement the design system on a new frontend app, you will need to understand
how sass finds and `@import`s sass files which are not relative to the current file.

SASS provides the [`includesPaths`](https://github.com/sass/node-sass#includepaths) option to merge multiple directories into
the import tree. For a more thorough explanation, [this](https://stackoverflow.com/questions/33585617/what-does-gulps-includepaths-do) is a great explanation.

To implement the design system on a new frontend app, add the following options to sass:
 
```js
    {
        includePaths: [ 'node_modules/<project-name>/dist' ]
    }
```

And in your main sass file:

```sass
@import "design-system" // To import the complete design-system
@import "design-system/generics" // To selectively import all files in a folder 
@import "design-system/generics/typography" // To selectively import a single file
```
