import { render, screen, waitFor } from './test-render';
import TestComponent from './index';
import { GET_ITEM } from './';
import React from 'react';

describe('TestComponent', () => {
  it('Should render removals and substitutions names', async () => {

    const variables = {
      "removalFilter": {
        "type": "removal"
      },
      "substitutionsFilter": {
        "type": "substitution"
      }
    }

    render(<TestComponent />, {
      mocks: [
        {
          request: {
            query: GET_ITEM,
    
            variables
          },
          result: {
            data: {
              getItem: {
                id: 'item_1',
                variants: [
                  {
                    id: 'item_1',
                    removals: [
                      {
                        id: 'removal_1',
                        name: 'Removable Ingredient 1',
                        type: "removal",
                        price: '0'
                      }
                    ],
                    substitutions: [
                      {
                        id: 'substitution_mod_1',
                        name: 'Sub Ingredient 1',
                        type: "substitution",
                        price: '0'
                      }
                    ]
                  }
                ]
              }
            }
          }
        }
      ]
    })

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull()
    })

    screen.debug()

    expect(screen.getByText('Removable Ingredient 1')).toBeDefined();
    expect(screen.getByText('Sub Ingredient 1')).toBeDefined();
  })
})
  