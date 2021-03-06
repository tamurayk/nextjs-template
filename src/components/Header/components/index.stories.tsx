import React from 'react'
import { storiesOf } from '@storybook/react'
import Header from './'
import { useTheme } from '@material-ui/core'
import { menus } from '../constants'

storiesOf('components/Header', module)
  .add('default', () => {
    // tslint:disable-next-line: react-hooks-nesting
    const theme = useTheme()

    return (
      <div style={{
        width: '100%',
        height: '300px',
        backgroundColor: theme.palette.grey[300],
      }}>
        <Header
          menus={menus}
          currentPath="/"
          handleMenuSelect={(path) => console.log(`menuSelected: ${path}`)}
        />
      </div>
    )
  })
