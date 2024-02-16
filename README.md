## Apollo Client MockedProvider fails to mock aliased fields in GraphQL query

1) run install
  ```
  npm i
  ```
2) run test
  ```
  npm run test components/TestComponent/TestComponent.test.tsx
  ```
3) Notice that the tests are failing
  - This is because the values for `removals` and `substitutions` are empty objects.
  - They should contain the modifier values
  - You can see the console.log returning 
  ```
    {
    "getItem": {
        "id": "item_1",
        "variants": [
            {
                "id": "item_1",
                "removals": [
                    {} // should contain modifier fields
                ],
                "substitutions": [
                    {} // should contain modifier fields
                ]
            }
        ]
    }
}
  ```