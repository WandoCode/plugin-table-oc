# The table-oc plugin

This project conains the code for plugin that help to build quickly a cutomisable Table React component.
It has been coded in the scope of the OpenClassrooms cursus.

## Description

This plugin allows you to quikcliy setup a react component to displays datas as a table.
This table is customisable:

- custom header's name
- infinite scroll or pagination
- column sorting
- number of items by page
- direct search among datas
- etc

# Start

## Prerequisite

- nodeJS: >v16.14.2

## Installation

1. Run `npm install plugin-table-oc` into your project folder.
2. Import `TableIndex` into you React Application

## Use

Import and use directly:

```
import TableIndex from 'plugin-table-oc'
function App() {
    const headers = {
        id: 'id',
        name : 'Name',
        zipCode: 'ZIP'
    }

    const datas = [
        {
            id: 0,
            name: 'Jean',
            zipCode: '78521',
        },
        {...},
        ...
    ]

    return (
        <main className="App">
            <TableIndex headers={headers} datas={datas} />
        </main>

```

## Props

### Obligatory

#### `headers`

`headers` is an object that make the connection between data keys and columns header value. Only the keys present into the header object will be shown in the table.

The following example means that data's ids will be set in the column named 'id', the data's names in the 'Name' column and the data's zipCodes in the 'ZIP' column.

```
const headers = {
        id: 'id',
        name : 'Name',
        zipCode: 'ZIP'
    }
```

#### `datas`

`datas` contains is an array of object.
Datas's objects can only contains strings.
Each object have an unique id named `id`

## Optionnal

### `scroll`

Default is `false`. It means that the datas's table will be paginated.

Is set to `true`, the table will show all the datas on scroll.

### `itemsByPageArr`

It's only available if `scroll = false`.

It defines the possible number of items displayed in the table. The user can change the number by chosing among one contained in the given array.

Default is `[5, 20, 50]`.

An other array of integer can ben set.

### `defaultItemsByPage`

It defines the default number of items shown in one page of the table.
If `scroll = true`, it's also the number of items added to the table when datas are added into it.

### `sort`

It defines if the user can sort the table by clicking the column's header.
Default is `true`.

### `defaultSort`

It defines the default sorting of the table at the 1st loading of the table.

The name of a column can be passed trough that prop to change the sorted column.

If `defaultSort = ''`, no default sort.

### `search`

Default is `true`.

When activate, an input field will appear to make search possible.

It search in all the table.

### `showId`

Default is `false`.

If set to true, the object id will be visible in the table.
The id field have to be set into `headers` object to be diplayed.

# Scripts

## `npm start`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## `npm run start:dev`

Launch the app like `npm start` would but populate also the app with mock datas.

## `npm run build`

Builds the app for production to the `dist` folder.\

It use webpack v5 to bundle the application.
