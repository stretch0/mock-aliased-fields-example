import { CapsulesA, CapsulesAB, GET_CAPSULES_A_B, GET_CAPSULES_A } from "../MyComponent";
import { render, screen, waitFor } from "../../test-render";
import mockData from '../../mockData.json';

describe("MyComponent", () => {

  it('should mock response for just capsulesA', async () => {
    render(<CapsulesA />, {
      mocks: [
        {
          result: {
            data: mockData
          },
          request: {
            query: GET_CAPSULES_A,
            variables: {
              "limitA": 10
            }
          }
        }
      ]
    })

    
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull()
    })

    expect(screen.getAllByTestId("capsule")).toHaveLength(3)
  })

  it('should mock response for both capsulesA and capsulesB', async () => {
    render(<CapsulesAB />, {
      mocks: [
        {
          result: {
            data: mockData
          },
          request: {
            query: GET_CAPSULES_A_B,
            variables: {
              "limitA": 10,
              "limitB": 1
            }
          }
        }
      ]
    })

    
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull()
    })

    expect(screen.getAllByTestId("capsule")).toHaveLength(4)
  })
})