# Install
`npm install`

`npm install -g ng1`

# Development
`gulp`

# Build
`gulp build` - this one will create `dist/` folder with minified source


# Generators

`ng1 component --name yourComponent`

`ng1 constant --name yourConstant`

`ng1 factory --name yourFactory`

`ng1 route --name yourRoute`

`ng1 service --name YourService`

Generators will create new files/folders in appropriate place. They will also handle imports.
If you opt to not install `ng1` globally, you can run `npm run ng1` instead (so for example `npm run ng1 service --name YourService`).
