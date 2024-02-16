import React, { JSX, ReactElement, JSXElementConstructor } from 'react';
import {render, RenderOptions} from '@testing-library/react-native'
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { ApolloCache } from '@apollo/client';

type Options = RenderOptions & {
  mocks?: MockedResponse<Record<string, unknown>, Record<string, unknown>>[];
  cache?: ApolloCache<NonNullable<unknown>>;
};

const AllTheProviders = ({
  children,
  options: { mocks, cache } = {}
}: {
  children: React.ReactElement;
  options?: Options;
}) => {
  return (
    <MockedProvider mocks={mocks} cache={cache} addTypename={true}>
      {children}
    </MockedProvider>
  );
};

const customRender = (ui: React.ReactElement, options?: Options) =>
  render(ui, {
    wrapper: (
      props: JSX.IntrinsicAttributes & {
        children: ReactElement<unknown, string | JSXElementConstructor<unknown>>;
      }
    ) => <AllTheProviders {...props} options={options} />,
    ...options
  });

// re-export everything
export * from '@testing-library/react-native'

// override render method
export {customRender as render}