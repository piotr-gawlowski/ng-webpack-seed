# Install
`npm install`

# Development
`gulp serve`

# Build
`gulp build` - this one will create `dist/` folder with minified source


# Genertors
You have 3 generators.

`gulp service --name yourService`

`gulp component --name yourComponent`

`gulp route --name yourRoute`

Generators will create new files/folders in appropriate place. They will also handle imports.
####Fixme
Currently components/routes cannot handle kebab-case or camelCase as element selectors.
If you're using generators use simple names *(dialog, timeline, breadcrumb)* - I will fix it someday


# Including 3rd-party libraries
If you have problem with imports not all node_modules handle es6 imports nicely.
Try syntax:

`import * as _ from 'lodash'`

or

`import moment from moment`
