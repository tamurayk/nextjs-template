import React from 'react'
import { AppContext } from 'next/app'
import { NextComponentType, NextPageContext } from 'next'
import { isServer } from '~/utils/device'

export const withMobx = (makeStore: MakeStore) => {
  const initStore = (initialState?: any) => {
    const storeKey = '__NEXT_MOBX_STORE__'
    const createStore = () => {
      return makeStore(initialState)
    }

    if (isServer) return createStore()

    // Memoize store if client
    if (!(storeKey in window)) {
      (window as any)[storeKey] = createStore()
    }

    return (window as any)[storeKey]
  }

  return (App: NextComponentType | any) =>
    class WrappedApp extends React.Component<WrappedAppProps> {
      public static displayName = `withMobx(${App.displayName || App.name || 'App'})`

      public constructor(props: WrappedAppProps) {
        super(props)
        const { initialState } = props
        this.store = initStore(initialState)
      }

      protected store: any
      public render() {
        const { initialProps, initialState, ...props } = this.props
        return (
          <App {...props} {...initialProps} store={this.store} />
        )
      }
    }
}

export type NextJSContext<Store = any> = NextPageContext & {
  store: Store
  isServer: boolean
}

export type NextJSAppContext = AppContext & {
  ctx: NextJSContext;
}

export type WrappedAppProps = {
  initialState: any
  initialProps: any
}

export type MakeStore = (initialState: any) => any
